import diskPhysical
from snapShot2 import *

def SnapshotTest():
	createDisk(1, 100)
	createDisk(2, 80)
	createDisk(3, 50)
	writeDiskBlock(2, 10, "Ten")

	# Write in disk 1
	for i in xrange(0, 10):
		writeDiskBlock(1, i, "1 ka " + str(i))

	# Write in disk 3
	for i in xrange(5, 15):
		writeDiskBlock(3, i, "3 ka " + str(i))

	print "Reading 1 ka 5", readDiskBlock(1, 5)

	# Checkpoints for disk 1 & 3
	check1_1 = checkPoint(1)
	check3_1 = checkPoint(3)

	# Write in disk 3
	for i in xrange(11, 20):
		writeDiskBlock(3, i, "After check1 : 3 ka " + str(i))

	# Read from disk 3
	for i in xrange(5,20):
		print "Reading 3 ka " + str(i), readDiskBlock(3, i)

	# Checkpoint for disk 3
	check3_2 = checkPoint(3)

	print "Deleting 1 :"
	deleteDisk(1)

	print "Rolling back 3 .............."
	rollBack(3, check3_1)

	print diskPhysical.printPatchList(diskPhysical.unoccupied)
	# Read from disk 3
	for i in xrange(5, 15):
		print "Reading 3 ka " + str(i), readDiskBlock(3, i)

SnapshotTest()