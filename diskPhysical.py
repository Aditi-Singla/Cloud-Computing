class Block:
	blockData = ''
	replica = -1
	# replica no is in continuous virtual disk space.

class Disk:
	id = 0
	numBlocks = 0
	patches = []

	def __init__(self,idname,n):
		self.id = idname
		self.numBlocks = n
		self.patches = []

class Patch:
	blockNo = 0
	num = 0

	def __init__(self,block,n):
		self.blockNo = block
		self.num = n


sizeA = 200
sizeB = 300
virtualDiskSize = sizeA + sizeB
diskA = [Block() for i in xrange(sizeA)]
diskB = [Block() for i in xrange(sizeB)]
disks = [diskA, diskB]
usedBlocks = 0
diskMap = {}
p = Patch(0,virtualDiskSize)
unoccupied = [p]
virtualToPhy = {}

total_blocks = 0
for i in xrange(0,len(disks)):
	for j in xrange(0,len(disks[i])):
		virtualToPhy[total_blocks + j] = (i, j)
	total_blocks += len(disks[i])

def initialize():
	sizeA = 200
	sizeB = 300
	virtualDiskSize = sizeA + sizeB
	diskA = [Block() for i in xrange(sizeA)]
	diskB = [Block() for i in xrange(sizeB)]
	disks = [diskA, diskB]
	usedBlocks = 0
	diskMap = {}
	p = Patch(0,virtualDiskSize)
	unoccupied = [p]
	virtualToPhy = {}

def writePhysicalBlock(block_no, write_data):
	disks[virtualToPhy[block_no][0]][virtualToPhy[block_no][1]].blockData = write_data

def readPhysicalBlock(block_no):
	print virtualToPhy[block_no]
	return disks[virtualToPhy[block_no][0]][virtualToPhy[block_no][1]].blockData

def getBlockReplica(block_no):
	return disks[virtualToPhy[block_no][0]][virtualToPhy[block_no][1]].replica

def setBlockReplica(block_no, replica_block_no_virt):
	disks[virtualToPhy[block_no][0]][virtualToPhy[block_no][1]].replica = replica_block_no_virt

def printDisks():
	for i in disks:
		for j in i:
			print "Data : " + j.blockData + ", Replica : " + str(j.replica)