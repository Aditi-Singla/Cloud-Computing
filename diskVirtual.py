import diskPhysical

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

def readDiskBlock(id, block_no):
	disk = diskMap[id]
	if disk.numBlocks < block_no+1:
		raise "Error : Invalid block number"
	print "Reading disk block..."
	total_blocks = 0
	i = 0
	while (disk.patches[i].num + total_blocks < block_no+1):
		total_blocks += disk.patches[i].num
		i += 1
	# path no known.
	return readPhysicalBlock(disk.patches[i].blockNo + block_no - total_blocks)

def writeDiskBlock(id, block_no, write_data):
	disk = diskMap[id]
	if disk.numBlocks < block_no+1:
		raise "Error : Invalid block number"
	print "Finding disk block..."
	total_blocks = 0
	i = 0
	while (disk.patches[i].num + total_blocks < block_no+1):
		total_blocks += disk.patches[i].num
		i += 1
	writePhysicalBlock(disk.patches[i].blockNo + block_no - total_blocks, write_data)
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
