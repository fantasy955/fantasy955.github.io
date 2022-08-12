from genericpath import isdir
import os
import json
from functools import cmp_to_key
import time

menu_config = './custom/menu.json'



if __name__ == '__main__':
    with open(menu_config,'r') as load_f:
        load_dict = json.load(load_f)

    for category in load_dict['categories']:
        blog_dir = category['path']
        target = blog_dir + '/' + 'list.json'
        if os.path.exists(target):
            os.remove(target)
        files = os.listdir(blog_dir)
        json_dict = {'files': [
            {'name': file,
            'modtime': os.path.getmtime(blog_dir + '/' + file)} for file in files
        ]}
        json_dict['files'].sort(key=cmp_to_key(lambda x,y : y['modtime']-x['modtime']), reverse=False)
        for i, item in enumerate(json_dict['files']):
            struct_time = time.localtime(item['modtime'])
            json_dict['files'][i]['year'] = struct_time.tm_year
            json_dict['files'][i]['mon'] = struct_time.tm_mon
            json_dict['files'][i]['day'] = struct_time.tm_mday
            json_dict['files'][i]['hour'] = struct_time.tm_hour
            json_dict['files'][i]['min'] = struct_time.tm_min
            json_dict['files'][i]['sec'] = struct_time.tm_sec
            json_dict['files'][i]['relapath'] = blog_dir + '/' + item['name']
        print(json_dict['files'])
        json_str = json.dumps(json_dict, ensure_ascii=False) 
        with open(target, 'w+', encoding='utf-8') as f:
            json.dump(json_dict, f, ensure_ascii=False)