import diskPhysical
import random

def writeBlock(block_no, write_data):
	diskPhysical.writePhysicalBlock(block_no, write_data)

def readBlock(block_no):
	diskPhysical.readPhysicalBlock(block_no)

def createDisk(id, num_blocks):
	if (diskPhysical.virtualDiskSize - diskPhysical.usedBlocks < num_blocks) or diskPhysical.diskMap.has_key(id):
		raise Exception("Error : Either no space or disk id already there")
	else:
		createPatch(id, num_blocks)

def createPatch(id, num_blocks):
	if not diskPhysical.diskMap.has_key(id):
		diskPhysical.diskMap[id] = diskPhysical.Disk(id, num_blocks)
	
	disk = diskPhysical.diskMap[id]
	l = [(n,i) for n,i in enumerate(diskPhysical.unoccupied) if i.num >= num_blocks]
	
	if (len(l)==0):
		p = diskPhysical.Patch(diskPhysical.unoccupied[-1].blockNo, diskPhysical.unoccupied[-1].num)
		(disk.patches).append(p)
		diskPhysical.unoccupied.pop()
		diskPhysical.usedBlocks += p.num 
		createPatch(id,num_blocks-p.num)
	else:
		index = (l[0])[0]
		patchBlockNo = (l[0])[1].blockNo
		patchNum = (l[0])[1].num
		(disk.patches).append(diskPhysical.Patch(patchBlockNo,num_blocks))
		if (patchNum == num_blocks):
			diskPhysical.unoccupied.pop(index)
		else:
			currentvalue = patchNum - num_blocks
			while index > 0 and diskPhysical.unoccupied[index-1].num > currentvalue:
				diskPhysical.unoccupied[index].blockNo = diskPhysical.unoccupied[index-1].blockNo
				diskPhysical.unoccupied[index].num = diskPhysical.unoccupied[index-1].num
				index -= 1
			diskPhysical.unoccupied[index].blockNo = patchBlockNo + num_blocks
			diskPhysical.unoccupied[index].num = currentvalue
		diskPhysical.usedBlocks += num_blocks

def getVirtualDiskNo(diskPatches, block_no):
	total_blocks = 0
	i = 0
	while (diskPatches[i].num + total_blocks < block_no+1):
		total_blocks += diskPatches[i].num
		i += 1
	return diskPatches[i].blockNo + block_no - total_blocks

def readDiskBlock(id, block_no):
	if not diskPhysical.diskMap.has_key(id):
		raise Exception("Error : Disk does not exist")

	disk = diskPhysical.diskMap[id]
	if disk.numBlocks < block_no+1:
		raise Exception("Error : Invalid block number")
	
	# random no in 1 to 100.
	print "Reading disk block..."
	if random.randint(1, 100) < 50:
		# assuming replica always exists : ERROR?
		print "Read error!"
		if (len(diskPhysical.unoccupied)==0):
			raise Exception("Error : Replica cannot be made")
		else:
			newReplicaBlockNo = diskPhysical.unoccupied[0].blockNo
			if (diskPhysical.unoccupied[0].num == 1):
				diskPhysical.unoccupied.pop(0)
			else:
				diskPhysical.unoccupied[0].num -= 1
				diskPhysical.unoccupied[0].blockNo += 1
			diskPhysical.usedBlocks += 1

			patches_new = []
			virt_original = getVirtualDiskNo(disk.patches, block_no)
			virt_replica = diskPhysical.getBlockReplica(virt_original)
			virt_new_replica = newReplicaBlockNo

			diskPhysical.setBlockReplica(virt_replica, virt_new_replica)
			diskPhysical.setBlockReplica(virt_new_replica, virt_replica)
			ans = diskPhysical.readPhysicalBlock(virt_replica)
			writeBlock(virt_new_replica, ans)
			
			newOriginal = diskPhysical.Patch(virt_replica, 1)
			newReplica = diskPhysical.Patch(virt_new_replica,1)
			for p in disk.patches:
				if ((virt_replica < p.blockNo or virt_replica >= (p.blockNo + p.num)) and (virt_original < p.blockNo or virt_original >= (p.blockNo + p.num))):
					patches_new.append(p)

				elif ((virt_original < p.blockNo or virt_original > (p.blockNo+p.num)) and p.blockNo <= virt_replica and virt_replica < p.blockNo+p.num):
					# only replica in this patch.
					if virt_replica > p.blockNo:
						left_patch = diskPhysical.Patch(p.blockNo, virt_replica - p.blockNo)
						patches_new.append(left_patch)
					patches_new.append(newReplica)
					if virt_replica < (p.blockNo + p.num - 1):
						right_patch = diskPhysical.Patch(virt_replica+1, p.num - (virt_replica - p.blockNo + 1))
						patches_new.append(right_patch)

				elif ((virt_replica > p.blockNo+p.num or virt_replica < p.blockNo) and p.blockNo <= virt_original and virt_original < p.blockNo+p.num):
					# only original in this patch.
					if virt_original > p.blockNo:
						left_patch = diskPhysical.Patch(p.blockNo, virt_original - p.blockNo)
						patches_new.append(left_patch)
					patches_new.append(newOriginal)
					if virt_original < (p.blockNo + p.num - 1):
						right_patch = diskPhysical.Patch(virt_original+1, p.num - (virt_original - p.blockNo + 1))
						patches_new.append(right_patch)

				else:
					if virt_original > p.blockNo:
						left_patch = diskPhysical.Patch(p.blockNo, virt_original - p.blockNo)
						patches_new.append(left_patch)
					patches_new.append(newOriginal)
					if virt_original < virt_replica-1:
						mid_patch = diskPhysical.Patch(virt_original+1, virt_replica - virt_original - 1)
						patches_new.append(mid_patch)
					patches_new.append(newReplica)
					if virt_replica < (p.blockNo + p.num - 1):
						right_patch = diskPhysical.Patch(virt_replica+1, p.num - (virt_replica - p.blockNo + 1))
						patches_new.append(right_patch)

			disk.patches = diskPhysical.mergePatches(patches_new)
			print "New patches : "
			for i in disk.patches:
				print str(i.blockNo) + " " + str(i.num)
	else:
		print "Old patches : "
		for i in disk.patches:
			print str(i.blockNo) + " " + str(i.num)
		ans = diskPhysical.readPhysicalBlock(getVirtualDiskNo(disk.patches, block_no))
	return ans	

def writeDiskBlock(id, block_no, write_data):
	if not diskPhysical.diskMap.has_key(id):
		raise Exception("Error : Disk does not exist")

	disk = diskPhysical.diskMap[id]
	if disk.numBlocks < block_no+1:
		raise Exception("Error : Invalid block number")

	print "Finding disk block..."
	virtual_block_no = getVirtualDiskNo(disk.patches, block_no)
	diskPhysical.writePhysicalBlock(virtual_block_no, write_data)
	delta = disk.numBlocks/2
	block_replica_disk = (block_no + delta) if block_no < delta else (block_no - delta)
	virtual_replica_block_no = getVirtualDiskNo(disk.patches, block_replica_disk)
	curr_replica = diskPhysical.getBlockReplica(virtual_block_no)
	if curr_replica == -1 || curr_replica != virtual_replica_block_no:
		diskPhysical.setBlockReplica(virtual_block_no, virtual_replica_block_no)
		diskPhysical.setBlockReplica(virtual_replica_block_no, virtual_block_no)

	print "Virtual replica block no : ", str(diskPhysical.getBlockReplica(virtual_block_no))
	diskPhysical.writePhysicalBlock(diskPhysical.getBlockReplica(virtual_block_no), write_data)
	print "Written disk block..."

def deleteDisk(id):
	if not diskPhysical.diskMap.has_key(id):
		raise Exception("Error : Invalid disk id")

	disk = diskPhysical.diskMap[id]
	unoccupied = diskPhysical.unoccupied + disk.patches
	unoccupied_sorted_index = sorted(unoccupied, key=lambda x: x.blockNo)
	unoccupied_new = diskPhysical.mergePatches(unoccupied_sorted_index)
	diskPhysical.unoccupied = sorted(unoccupied_new, key=lambda x: x.num)
	diskPhysical.usedBlocks -= disk.numBlocks
	diskPhysical.diskMap.pop(id)
	print "Deleted disk..."
