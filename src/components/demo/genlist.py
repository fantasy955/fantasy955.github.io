from ast import parse
from audioop import reverse
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
            existFileCount = {item["path"]: [0, i] for i, item in enumerate(json_dict["demos"])}
            components = os.listdir(os.path.join(os.getcwd(), category))
            
            for component in components:
                if component.startswith('_'):
                    continue
                if component in existFiles:
                    existFileCount[component][0] = 1
                    continue
                if component == "list.json":
                    continue
                if os.path.isdir(os.path.join(os.getcwd, component)):
                    continue
                json_dict['demos'].append({
                    "name": "",
                    "description": "",
                    "path": component
                })

            if len(existFileCount) > 0:
                reversed_keys = [key for key in existFileCount.keys()]
                reversed_keys.reverse()
                for k in reversed_keys:
                    value = existFileCount[k]
                    if value[0] == 0:
                        target_item = json_dict['demos'][value[1]]
                        json_dict['demos'].remove(target_item)
            json_str = json.dumps(json_dict, ensure_ascii=False) 
            with open(target, 'w+', encoding='utf-8') as f:
                json.dump(json_dict, f, ensure_ascii=False)
                f.close()