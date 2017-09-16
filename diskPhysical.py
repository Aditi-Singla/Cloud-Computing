class Block:
	blockData = ''
	replica = -1
	# replica no is in continuous virtual disk space.

class Disk:
	id = 0
	numBlocks = 0
	commandList = []
	checkPointMap = []
	patches = []

	def __init__(self,idname,n):
		self.id = idname
		self.numBlocks = n
		self.patches = []
		self.commandList = [("createDisk", idname, n)]
		self.checkPointMap = []

class Patch:
	blockNo = 0
	num = 0

	def __init__(self,block,n):
		self.blockNo = block
		self.num = n

	def __init__(self,p):
		self.blockNo = p.blockNo
		self.num = p.num


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
	# print virtualToPhy[block_no]
	return disks[virtualToPhy[block_no][0]][virtualToPhy[block_no][1]].blockData

def getBlockReplica(block_no):
	return disks[virtualToPhy[block_no][0]][virtualToPhy[block_no][1]].replica

def setBlockReplica(block_no, replica_block_no_virt):
	disks[virtualToPhy[block_no][0]][virtualToPhy[block_no][1]].replica = replica_block_no_virt

def printDisks():
	for i in disks:
		for j in i:
			print "Data : " + j.blockData + ", Replica : " + str(j.replica)

def printPatchList(plist):
	for p in plist:
		print "Block no : " + str(p.blockNo) + ", num : " + str(p.num)

def mergePatches(patches_list):
	patches_new = []
	current_patch = patches_list[0]
	for i in xrange(1,len(patches_list)):
		p = patches_list[i]
		if p.blockNo == (current_patch.blockNo + current_patch.num):
			current_patch.num += p.num
		else:
			patches_new.append(current_patch)
			current_patch = p
	patches_new.append(current_patch)
	patches_list = patches_new
	return patches_new