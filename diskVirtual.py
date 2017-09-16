import diskPhysical

def writeBlock(block_no, write_data):
	diskPhysical.writePhysicalBlock(block_no, write_data)

def readBlock(block_no):
	diskPhysical.readPhysicalBlock(block_no)

def createDisk(id, num_blocks):
	if (diskPhysical.virtualDiskSize - diskPhysical.usedBlocks < num_blocks) or diskPhysical.diskMap.has_key(id):
		return "Error : Either not enough space or disk id already there"
	else:
		createPatch(id, num_blocks)

def createPatch(id, num_blocks):
	if not diskPhysical.diskMap.has_key(id):
		diskPhysical.diskMap[id] = diskPhysical.Disk(id, num_blocks)
	disk = diskPhysical.diskMap[id]
	l = [(n,i) for n,i in enumerate(diskPhysical.unoccupied) if i.num >= num_blocks]
	if (len(l)==0):
		p = diskPhysical.unoccupied[-1]
		(disk.patches).append(p)
		diskPhysical.unoccupied.pop()
		diskPhysical.usedBlocks += p.num 
		createPatch(id,num_blocks-p.num)
	else:
		index = (l[0])[0]
		patchBlockNo = l[0][1].blockNo
		patchNum = l[0][1].num
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
	unoccupied_new = diskPhysical.mergePatches(unoccupied_sorted_index)
	diskPhysical.unoccupied = sorted(unoccupied_new, key=lambda x: x.num)
	diskPhysical.usedBlocks -= disk.numBlocks
	diskPhysical.diskMap.pop(id)
	print "Deleted disk!"
