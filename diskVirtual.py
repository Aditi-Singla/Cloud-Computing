import diskPhysical

def writeBlock(block_no, write_data):
	diskPhysical.writePhysicalBlock(block_no, write_data)

def readBlock(block_no):
	diskPhysical.readPhysicalBlock(block_no)

def createDisk(id, num_blocks):
	if (diskPhysical.virtualDiskSize - diskPhysical.usedBlocks < num_blocks) or diskPhysical.diskMap.has_key(id):
		return "Error : Either no space or disk id already there"
	else:
		createPatch(id, num_blocks)

def createPatch(id, num_blocks):
	if not diskPhysical.diskMap.has_key(id):
		diskPhysical.diskMap[id] = diskPhysical.Disk(id, num_blocks)
	disk = diskPhysical.diskMap[id]
	# disk = diskMap[id] if (diskMap.has_key(id)) else Disk(id, num_blocks)
	l = [(n,i) for n,i in enumerate(diskPhysical.unoccupied) if i.num >= num_blocks]
	if (len(l)==0):
		p = diskPhysical.unoccupied[-1]
		(disk.patches).append(p)
		diskPhysical.unoccupied.pop()
		diskPhysical.usedBlocks += p.num 
		createPatch(id,num_blocks-p.num)
	else:
		index = (l[0])[0]
		obj = (l[0])[1]
		(disk.patches).append(diskPhysical.Patch(obj.blockNo,num_blocks))
		if (obj.num == num_blocks):
			diskPhysical.unoccupied.pop(index)
		else:
			currentvalue = obj.num - num_blocks
			while index > 0 and diskPhysical.unoccupied[index-1].num > currentvalue:
				diskPhysical.unoccupied[index] = diskPhysical.unoccupied[index-1]
				index -= 1
			diskPhysical.unoccupied[index].blockNo = obj.blockNo + num_blocks
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
	disk = diskPhysical.diskMap[id]
	if disk.numBlocks < block_no+1:
		raise "Error : Invalid block number"
	print "Reading disk block..."
	# path no known.
	print "Virtual disk no : ", getVirtualDiskNo(disk.patches, block_no)
	return diskPhysical.readPhysicalBlock(getVirtualDiskNo(disk.patches, block_no))

def writeDiskBlock(id, block_no, write_data):
	disk = diskPhysical.diskMap[id]
	if disk.numBlocks < block_no+1:
		raise "Error : Invalid block number"
	print "Finding disk block..."
	print "Virtual disk no : ", getVirtualDiskNo(disk.patches, block_no)
	diskPhysical.writePhysicalBlock(getVirtualDiskNo(disk.patches, block_no), write_data)
	print "Written disk block..."

def deleteDisk(id):
	if not diskPhysical.diskMap.has_key(id):
		raise "Error : Invalid disk id"
	disk = diskPhysical.diskMap[id]
	unoccupied = diskPhysical.unoccupied + disk.patches
	unoccupied_sorted_index = sorted(unoccupied, key=lambda x: x.blockNo)
	unoccupied_new = []
	current_patch = unoccupied_sorted_index[0]
	for i in xrange(1,len(unoccupied_sorted_index)):
		p = unoccupied_sorted_index[i]
		if p.blockNo == current_patch.blockNo + current_patch.num:
			current_patch.num += p.num
		else:
			unoccupied_new.append(current_patch)
			current_patch = p
	diskPhysical.unoccupied.append(current_patch)
	diskPhysical.unoccupied = unoccupied_new
	diskPhysical.unoccupied = sorted(unoccupied, key=lambda x: x.num)
	diskPhysical.usedBlocks -= disk.numBlocks
	diskPhysical.diskMap.pop(id)
	print "Deleting disk..."
