from ast import parse
from genericpath import isdir
import os
import json
from functools import cmp_to_key
import time
import math
import argparse

os.chdir(r"E:\Users\lenovo\fantasy995.github.io\src\components\demo")
parser = argparse.ArgumentParser(description='generate list.json for each category')
if __name__ == '__main__':
    for item in os.listdir(os.getcwd()):
        if os.path.isdir(item):
            target = os.path.join(os.getcwd(), item, 'list.json')
            if os.path.exists(target):
                os.remove(target)
            components = os.listdir(os.path.join(os.getcwd(), item))
            json_dict = {
                'demos': [],
            }
            for component in components:
                json_dict['demos'].append({
                    "path": component
                })
            json_str = json.dumps(json_dict, ensure_ascii=False) 
            with open(target, 'w+', encoding='utf-8') as f:
                json.dump(json_dict, f, ensure_ascii=False)