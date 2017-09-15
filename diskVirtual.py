class Block:
	blockInfo = ''
	replica = 0

class Disk:
	id = 0
	numBlocks = 0
	blocks = []

	def __init__(self,idname,n):
		self.id = idname
		self.numBlocks = n
		self.blocks = []

class patch:
	blockNo = 0
	num = 0

	def __init__(self,block,n):
		self.blockNo = block
		self.num = n

virtualDiskSize = 500
diskA = [Block for i in xrange(200)]
diskB = [Block for i in xrange(300)]
virtualDisk = [Block for i in xrange(500)]
usedBlocks = 0
diskMap = {}
p = patch(0,500)
unoccupied = [p]


def getDiskBlocks():
	return []

def writeBlock(block_no, write_data):
	writePhysicalBlock(block_no, write_data)

def readBlock(block_no):
	readPhysicalBlock(block_no)

def createDisk(id, num_blocks):
	if (virtualDiskSize - usedBlocks < num_blocks):
		raise "error"
	else:		
		disk = diskMap[id] if (diskMap.has_key(id)) else Disk(id, num_blocks)

		l = [(n,i) for n,i in enumerate(unoccupied) if i.num >= num_blocks]
		if (len(l)==0):
			p = unoccupied[-1]
			(disk.blocks).append(patch(p.blockNo,p.num))
			unoccupied.pop()
			usedBlocks = usedBlocks + p.num 
			createDisk(id,num_blocks-p.num)
		else:
			index = (l[0])[0]
			obj = (l[0])[1]
			(disk.blocks).append(patch(obj.blockNo,num_blocks))
			if (obj.block_no == num_blocks):	
				unoccupied.pop(index)
			else:
				currentvalue = obj.num - num_blocks
				while index > 0 and unoccupied[index-1].num > currentvalue:
					unoccupied[index] = unoccupied[index-1]
					index = index-1
				unoccupied[index].blockNo = obj.blockNo + num_blocks
				unoccupied[index].num = currentvalue	

			usedBlocks = usedBlocks + num_blocks	

def readDiskBlock(id, block_no):
	print "Reading disk block..."

def writeDiskBlock(id, block_no, write_data):
	print "Writing disk block..."

def deleteDisk(id):
	print "Deleting disk..."