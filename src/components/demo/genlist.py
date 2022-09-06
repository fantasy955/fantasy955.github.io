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
    for category in os.listdir(os.getcwd()):
        if os.path.isdir(category):
            target = os.path.join(os.getcwd(), category, 'list.json')
            if os.path.exists(target):
                with open(target, mode='r', encoding='utf-8') as f:
                    json_dict = json.load(f)
                    f.close()
            else:
                json_dict = {
                    'demos': [],
                }
            existFiles = [item["path"] for item in json_dict["demos"]]
            print(existFiles)
            components = os.listdir(os.path.join(os.getcwd(), category))
            
            for component in components:
                if component == "list.json" or component in existFiles:
                    continue
                json_dict['demos'].append({
                    "name": "",
                    "description": "",
                    "path": component
                })
            json_str = json.dumps(json_dict, ensure_ascii=False) 
            with open(target, 'w+', encoding='utf-8') as f:
                json.dump(json_dict, f, ensure_ascii=False)
                f.close()