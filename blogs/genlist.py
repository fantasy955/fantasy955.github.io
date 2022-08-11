from genericpath import isdir
import os
import json
menu_config = './custom/menu.json'

if __name__ == '__main__':
    with open(menu_config,'r') as load_f:
        load_dict = json.load(load_f)

    for category in load_dict['categories']:
        blog_dir = category['path']
        files = os.listdir(blog_dir)
        print(files)
        target = blog_dir + '/' + 'list.json'
        if os.path.exists(target):
            os.remove(target)
        json_dict = {'files': files}
        json_str = json.dumps(json_dict, ensure_ascii=False) 
        with open(target, 'w', encoding='utf-8') as f:
            json.dump(json_dict, f, ensure_ascii=False)