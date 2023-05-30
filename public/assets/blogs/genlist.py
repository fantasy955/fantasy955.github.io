from ast import parse
from genericpath import isdir
import os
import json
from functools import cmp_to_key
import time
import math
import argparse

os.chdir(r"E:\Users\lenovo\fantasy955.github.io\public")
parser = argparse.ArgumentParser(description='generate list.json for each category')
parser.add_argument('--menu', default=r"E:\Users\lenovo\fantasy955.github.io\src\pages\blog\menu.json")

args = parser.parse_args()

menu_config = args.menu

max_file_items = 5


if __name__ == '__main__':
    with open(menu_config,'r') as load_f:
        load_dict = json.load(load_f)

    for category in load_dict['categories']:
        blog_dir = category['path']
        target = blog_dir + '/' + 'list.json'
        if os.path.exists(target):
            os.remove(target)
        files = os.listdir(blog_dir)
        json_dict = {
            'files': [],
            'pages': [],
            'totalPage': 0
        }
        addFile = 0
        filesWithTime = [{
            'name': file,
            'modtime': os.path.getmtime(blog_dir + '/' + file)
            } for file in files]
        filesWithTime.sort(key=cmp_to_key(lambda x,y : y['modtime']-x['modtime']), reverse=False)
        for kv in filesWithTime:
            fileName = kv['name']
            lastModifiedTimeStamp = kv['modtime']
            if fileName.endswith('.md'):
                currentPage = math.floor(addFile / max_file_items) + 1
                if addFile % max_file_items == 0:
                    json_dict['totalPage'] += 1
                    json_dict['pages'].append({
                        'page': currentPage,
                        'files': []
                    })
                struct_time = time.localtime(lastModifiedTimeStamp)
                fileInfo = {}
                fileInfo['name'] = fileName
                fileInfo['title'] = fileName.replace('.md', '')
                fileInfo['relapath'] =  blog_dir + '/' + fileName
                fileInfo['updatetime'] = {}
                fileInfo['updatetime']['year'] = struct_time.tm_year
                fileInfo['updatetime']['mon'] = struct_time.tm_mon
                fileInfo['updatetime']['day'] = struct_time.tm_mday
                fileInfo['updatetime']['hour'] = struct_time.tm_hour
                fileInfo['updatetime']['min'] = struct_time.tm_min
                fileInfo['updatetime']['sec'] = struct_time.tm_sec
                json_dict['pages'][int(currentPage-1)]['files'].append(fileInfo)
                json_dict['files'].append(fileInfo)
                addFile += 1

        json_str = json.dumps(json_dict, ensure_ascii=False) 
        with open(target, 'w+', encoding='utf-8') as f:
            json.dump(json_dict, f, ensure_ascii=False, indent=1)