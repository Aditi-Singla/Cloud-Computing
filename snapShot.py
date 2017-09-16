import diskPhysical
import random



def checkPoint(disk_id):
	disk = diskPhysical.diskMap[disk_id]
	disk.checkPointMap.append(len(disk.commandList))
	return len(disk.checkPointMap)-1

def rollBack(disk_id, checkpoint_id):
	# save checkpoint tk command List
	# delete disk from diskMap
	# create new disk, exec all cmds