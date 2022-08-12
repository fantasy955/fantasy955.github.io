from genericpath import isdir
import os
import json
from functools import cmp_to_key
import time
import math

menu_config = './custom/menu.json'
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
            'pages': [],
            'totalPage': 0
        }
        addFile = 0
        for fileName in files:
            if fileName.endswith('.md'):
                currentPage = math.floor(addFile / max_file_items) + 1
                if addFile % max_file_items == 0:
                    json_dict['totalPage'] += 1
                    json_dict['pages'].append({
                        'page': currentPage,
                        'files': []
                    })
                lastModifiedTimeStamp =  os.path.getmtime(blog_dir + '/' + fileName)
                struct_time = time.localtime(lastModifiedTimeStamp)
                fileInfo = {}
                fileInfo['name'] = fileName
                fileInfo['relapath'] =  blog_dir + '/' + fileName
                fileInfo['updatetime'] = {}
                fileInfo['updatetime']['year'] = struct_time.tm_year
                fileInfo['updatetime']['mon'] = struct_time.tm_mon
                fileInfo['updatetime']['day'] = struct_time.tm_mday
                fileInfo['updatetime']['hour'] = struct_time.tm_hour
                fileInfo['updatetime']['min'] = struct_time.tm_min
                fileInfo['updatetime']['sec'] = struct_time.tm_sec
                json_dict['pages'][currentPage-1]['files'].append(fileInfo)
                addFile += 1

        json_str = json.dumps(json_dict, ensure_ascii=False) 
        with open(target, 'w+', encoding='utf-8') as f:
            json.dump(json_dict, f, ensure_ascii=False)