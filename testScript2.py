import diskPhysical
from diskVirtualReplica import *

def ReplicationTest():
	createDisk(1, 50)
	# Disk.CallCmd("createDisk", 2, {'size':50})
	createDisk(2, 50)
	# Disk.CallCmd("createDisk", 3, {'size':150})
	createDisk(3, 150)
	# Disk.CallCmd("createDisk", 4, {'size':100})
	createDisk(4, 100)
	for i in xrange(0, 30):
		writeDiskBlock(3, i, "3 ka " + str(i))

	# read karo :
	for i in xrange(0, 30):
		print "Reading 3 ka " + str(i), readDiskBlock(3, i)
		if (i%3 == 0):
			diskPhysical.printDisks()

	deleteDisk(2)
	createDisk(5,100)
	
	for i in xrange(0, 30):
		writeDiskBlock(5, i, "5 ka " + str(i))

	# read karo :
	print ("-------------------------------------------------------")
	for i in xrange(0, 30):
		print "Reading 5 ka " + str(i), readDiskBlock(5, i)
		if (i%3 == 0):
			diskPhysical.printDisks()


	createDisk(6,70)
	
	for i in xrange(0, 20):
		writeDiskBlock(6, i, "6 ka " + str(i))

	# read karo :
	print ("-------------------------------------------------------")
	for i in xrange(0, 20):
		print "Reading 6 ka " + str(i), readDiskBlock(6, i)
		if (i%3 == 0):
			diskPhysical.printDisks()

ReplicationTest()