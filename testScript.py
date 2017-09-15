import diskVirtual

def Test1():
    # Disk = VirtualDisk(200, 300)
    # Disk.CallCmd("createDisk", 1, {'size':100})
    createDisk(1, 100)
    # Disk.CallCmd("createDisk", 2, {'size':200})
    createDisk(2, 200)
    # Disk.CallCmd("writeToDisk", 1, {'blockNo':5, 'data':'Five'})
    writeDiskBlock(1, 5, "Five")
    # Disk.CallCmd("writeToDisk", 2, {'blockNo':10, 'data':'Ten'})
    writeDiskBlock(2, 10, "Ten")
    # printState(Disk)
    print disks
    # Disk.CallCmd("readFromDisk", 2, {'blockNo':5})
    # print 'Read', Disk.CallCmd("readFromDisk", 2, {'blockNo':10})
    print "Reading disk 2 : ", readDiskBlock(2, 10)
    # print 'Read', Disk.CallCmd("readFromDisk", 1, {'blockNo':5})
    print "Reading disk 1 : ", readDiskBlock(1, 5)
    #Disk.CallCmd("writeToDisk", 1, {'blockNo':5, 'data':'Six'})
    print "Writing to disk 1 : ", writeDiskBlock(1, 5, "Six")
    #print 'Read', Disk.CallCmd("readFromDisk", 1, {'blockNo':5})
    print "Reading disk 1 : ", readDiskBlock(1,5)
    #Disk.CallCmd('deleteDisk', 2, {})
    print "Deleting disk 2 : ", deleteDisk(2)
    # Disk.CallCmd("readFromDisk", 1, {'blockNo':10})
    # Disk.CallCmd("", 2, {'size':200})
    #printState(Disk)
    print disks
    #Disk.CallCmd('deleteDisk', 1, {})
    print "Deleting disk 1 : ", deleteDisk(1)
    #printState(Disk)
    print disks


Test1()
# def Test2():
#     Disk = VirtualDisk(200, 300)
#     Disk.CallCmd("createDisk", 1, {'size':100})
#     Disk.CallCmd("createDisk", 2, {'size':200})
#     Disk.CallCmd("writeToDisk", 1, {'blockNo':5, 'data':'Five'})
#     Disk.CallCmd("writeToDisk", 2, {'blockNo':10, 'data':'Ten'})

#     printState(Disk)
#     # Disk.CallCmd("readFromDisk", 2, {'blockNo':5})
#     print 'Read', Disk.CallCmd("readFromDisk", 2, {'blockNo':10})
#     print 'Read', Disk.CallCmd("readFromDisk", 1, {'blockNo':5})

#     snap = Disk.CallCmd("snapShot", 1, {})
#     Disk.CallCmd("writeToDisk", 1, {'blockNo':5, 'data':'Six'})
#     print 'Read', Disk.CallCmd("readFromDisk", 1, {'blockNo':5})

#     snap2 = Disk.CallCmd("snapShot", 2, {})
#     Disk.CallCmd("writeToDisk", 2, {'blockNo':11, 'data':'Eleven'})
#     printState(Disk)

#     print 'Rolling Back 2'
#     Disk.CallCmd('rollBack', 2, {'snapShotNo':snap2})
#     printState(Disk)
#     print 'Rolling Back 1'
#     Disk.CallCmd('rollBack', 1, {'snapShotNo':snap})
#     printState(Disk)

#     Disk.CallCmd('deleteDisk', 2, {})
#     # Disk.CallCmd("readFromDisk", 1, {'blockNo':10})
#     # Disk.CallCmd("", 2, {'size':200})
#     Disk.CallCmd('deleteDisk', 1, {})
#     printState(Disk)