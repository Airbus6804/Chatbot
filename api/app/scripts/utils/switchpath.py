import sys
import os

def switch_path(log: bool): 
    newpath= os.path.abspath("/usr/app/src")
    sys.path.append(newpath)
    if(log): print(newpath)


