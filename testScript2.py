import diskPhysical
from diskVirtualReplica import *

def ReplicationTest():
	createDisk(1, 50)
	createDisk(2, 50)
	createDisk(3, 150)
	createDisk(4, 100)
	
	# Write in disk 3
	for i in xrange(0, 30):
		writeDiskBlock(3, i, "3 ka " + str(i))

	# Read from disk 3
	for i in xrange(0, 30):
		print "Reading 3 ka " + str(i), readDiskBlock(3, i)
		if (i%3 == 0):
			diskPhysical.printDisks()

	deleteDisk(2)
	print diskPhysical.printPatchList(diskPhysical.unoccupied)

	print ("-------------------------------------------------------")
	createDisk(5,100)
	
	# Write in disk 5
	for i in xrange(0, 30):
		writeDiskBlock(5, i, "5 ka " + str(i))

	# Read from disk 5
	for i in xrange(0, 30):
		print "Reading 5 ka " + str(i), readDiskBlock(5, i)
		if (i%3 == 0):
			diskPhysical.printDisks()
			print diskPhysical.printPatchList(diskPhysical.unoccupied)

	print diskPhysical.printPatchList(diskPhysical.unoccupied)

	print ("-------------------------------------------------------")
	createDisk(6,55)

	# Write in disk 6
	for i in xrange(0, 20):
		writeDiskBlock(6, i, "6 ka " + str(i))

	# Read from disk 6
	for i in xrange(0, 20):
		print "Reading 6 ka " + str(i), readDiskBlock(6, i)
		if (i%3 == 0):
			diskPhysical.printDisks()

	print diskPhysical.printPatchList(diskPhysical.unoccupied)

ReplicationTest()