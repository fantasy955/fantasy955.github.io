python .\public\assets\blogs\genlist.py
xcopy .\public\assets\blogs\* .\dist\assets\blogs\ /S /Y
git add ./dist/assets/blogs
git commit -m "blogs: update blogs"
git push origin dev