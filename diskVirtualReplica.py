import diskPhysical
import random

def writeBlock(block_no, write_data):
	writePhysicalBlock(block_no, write_data)

def readBlock(block_no):
	readPhysicalBlock(block_no)

def createDisk(id, num_blocks):
	if (virtualDiskSize - usedBlocks < num_blocks) or diskMap.has_key(id):
		return "Error : Either no space or disk id already there"
	else:
		createPatch(id, num_blocks)

def createPatch(id, num_blocks):
	if not diskMap.has_key(id):
		diskMap[id] = Disk(id, num_blocks)
	disk = diskMap[id]
	# disk = diskMap[id] if (diskMap.has_key(id)) else Disk(id, num_blocks)
	l = [(n,i) for n,i in enumerate(unoccupied) if i.num >= num_blocks]
	if (len(l)==0):
		p = unoccupied[-1]
		(disk.patches).append(p)
		unoccupied.pop()
		usedBlocks = usedBlocks + p.num 
		createDisk(id,num_blocks-p.num)
	else:
		index = (l[0])[0]
		obj = (l[0])[1]
		(disk.patches).append(Patch(obj.blockNo,num_blocks))
		if (obj.num == num_blocks):
			unoccupied.pop(index)
		else:
			currentvalue = obj.num - num_blocks
			while index > 0 and unoccupied[index-1].num > currentvalue:
				unoccupied[index] = unoccupied[index-1]
				index -= 1
			unoccupied[index].blockNo = obj.blockNo + num_blocks
			unoccupied[index].num = currentvalue	
		usedBlocks += num_blocks

def getVirtualDiskNo(diskPatches, block_no):
	total_blocks = 0
	i = 0
	while (diskPatches[i].num + total_blocks < block_no+1):
		total_blocks += diskPatches[i].num
		i += 1
	return diskPatches[i].blockNo + block_no - total_blocks

def readDiskBlock(id, block_no):
	if not diskMap.has_key(id):
		raise "Error : Disk does not exist"
	disk = diskMap[id]
	if disk.numBlocks < block_no+1:
		raise "Error : Invalid block number"
	# random no in 1 to 100.
	print "Reading disk block..."
	if random.randint(1, 100) < 10:
		# assuming replica always exists : ERROR?
		if (len(unoccupied)==0):
			raise "Error : Replica cannot be made"
		else:
			newReplicaBlockNo = unoccupied[0].blockNo
			if (unoccupied[0].num == 1):
				unoccupied.pop(0)
			else:
				unoccupied[0].num -= 1
				unoccupied[0].blockNo += 1
			usedBlocks += 1
			patches_new = []
			virt_original = getVirtualDiskNo(disk.patches, block_no)
			virt_replica = getBlockReplica(virt_original)
			virt_new_replica = newReplicaBlockNo
			newOriginal = Patch(virt_replica, 1)
			newReplica = Patch(virt_new_replica,1)

			for p in disk.patches:
				if ((virt_replica < p.blockNo and virt_original < p.blockNo) or (virt_original > (p.blockNo+p.num) and virt_replica > (p.blockNo+p.num))):
					patches_new.append(p)

				elif ((virt_original < p.blockNo or virt_original > (p.blockNo+p.num)) and p.blockNo <= virt_replica and virt_replica < p.blockNo+p.num):
					# only replica in this patch.
					if virt_replica > p.blockNo:
						left_patch = Patch(p.blockNo, virt_replica - p.blockNo)
						patches_new.append(left_patch)
					patches_new.append(newReplica)
					if virt_replica < (p.blockNo + p.num - 1):
						right_patch = Patch(virt_replica+1, p.num - (virt_replica - p.blockNo + 1))
						patches_new.append(right_patch)

				elif ((virt_replica > p.blockNo+p.num or virt_replica < p.blockNo) and p.blockNo <= virt_original and virt_original < p.blockNo+p.num):
					# only original in this patch.
					if virt_original > p.blockNo:
						left_patch = Patch(p.blockNo, virt_original - p.blockNo)
						patches_new.append(left_patch)
					patches_new.append(newOriginal)
					if virt_original < (p.blockNo + p.num - 1):
						right_patch = Patch(virt_original+1, p.num - (virt_original - p.blockNo + 1))
						patches_new.append(right_patch)

				else:
					if virt_original > p.blockNo:
						left_patch = Patch(p.blockNo, virt_original - p.blockNo)
						patches_new.append(left_patch)
					patches_new.append(newOriginal)
					if virt_original < virt_replica-1:
						mid_patch = Patch(virt_original+1, virt_replica - virt_original - 1)
						patches_new.append(mid_patch)
					patches_new.append(newReplica)
					if virt_replica < (p.blockNo + p.num - 1):
						right_patch = Patch(virt_replica+1, p.num - (virt_replica - p.blockNo + 1))
						patches_new.append(right_patch)

			disk.patches = patches_new		
	else:
		ans = readPhysicalBlock(getVirtualDiskNo(disk.patches, block_no))
	return ans	

def writeDiskBlock(id, block_no, write_data):
	if not diskMap.has_key(id):
		raise "Error : Disk does not exist"
	disk = diskMap[id]
	if disk.numBlocks < block_no+1:
		raise "Error : Invalid block number"
	print "Finding disk block..."
	virtual_block_no = getVirtualDiskNo(disk.patches, block_no)
	writePhysicalBlock(virtual_block_no, write_data)
	if getBlockReplica(virtual_block_no) == -1:
		delta = disk.numBlocks/2
		block_replica_disk = (block_no + delta) if block_no < delta else (block_no - delta)
		virtual_replica_block_no = getVirtualDiskNo(disk.patches, block_replica_disk)
		setBlockReplica(virtual_block_no, virtual_replica_block_no)
		setBlockReplica(virtual_replica_block_no, virtual_block_no)
	writePhysicalBlock(getBlockReplica(virtual_block_no))
	print "Written disk block..."

def deleteDisk(id):
	if not diskMap.has_key(id):
		raise "Error : Invalid disk id"
	disk = diskMap[id]
	unoccupied += disk.patches
	unoccupied_sorted_index = sorted(unoccupied, key = blockNo)
	unoccupied_new = []
	current_patch = unoccupied_sorted_index[0]
	for i in xrange(1,len(unoccupied_sorted_index)):
		p = unoccupied_sorted_index[i]
		if p.blockNo == current_patch.blockNo + current_patch.num:
			current_patch.num += p.num
		else:
			unoccupied_new.append(current_patch)
			current_patch = p
	unoccupied.append(current_patch)
	unoccupied = unoccupied_new
	unoccupied = sorted(unoccupied, key=num)
	usedBlocks -= disk.numBlocks
	diskMap.pop(id)
	print "Deleting disk..."
