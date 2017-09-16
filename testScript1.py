import diskPhysical
from diskVirtual import *

def BasicTest():
    diskPhysical.initialize()
    createDisk(1, 100)
    createDisk(2, 200)
    writeDiskBlock(1, 5, "Five")
    writeDiskBlock(2, 10, "Ten")
    diskPhysical.printDisks()
    print "Reading disk 2 : ", readDiskBlock(2, 10)
    print "Reading disk 1 : ", readDiskBlock(1, 5)
    print "Writing to disk 1 : ", writeDiskBlock(1, 5, "Six")
    print "Reading disk 1 : ", readDiskBlock(1,5)
    print "Deleting disk 2 : ", deleteDisk(2)
    diskPhysical.printDisks()
    print "Deleting disk 1 : ", deleteDisk(1)
    diskPhysical.printDisks()

def FragmentationTest1():
    diskPhysical.initialize()
    createDisk(1, 50)
    createDisk(2, 50)
    createDisk(3, 160)
    createDisk(4, 100)
    writeDiskBlock(3, 5, "3 ka Five")
    diskPhysical.printDisks()
    print "Deleting 3 :"
    deleteDisk(3)
    createDisk(5, 200)
    writeDiskBlock(5, 10, "5 ka Ten")
    writeDiskBlock(5, 190, "5 ka 190")
    diskPhysical.printDisks()

def FragmentationTest2():
    diskPhysical.initialize()
    createDisk(1, 50)
    createDisk(2, 50)
    createDisk(3, 150)
    createDisk(4, 50)
    writeDiskBlock(3, 5, "3 ka Five")
    diskPhysical.printDisks()
    print "Deleting 3 :"
    deleteDisk(3)
    createDisk(5, 200)
    writeDiskBlock(5, 5, "5 ka Five")
    diskPhysical.printDisks()

print "---------- BASIC TEST : -------------"
BasicTest()
# print "---------- FRAG TEST 1 : -------------"
# FragmentationTest1()
# print "---------- FRAG TEST 2 : -------------"
# FragmentationTest2()