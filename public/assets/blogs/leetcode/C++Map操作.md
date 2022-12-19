### map遍历

unordered_map<string, int> mp;
    mp["张三"] = 20;
    mp["李四"] = 18;
    mp["王五"] = 30;

```c++
// 方式一、迭代器
cout << "方式一、迭代器" << endl;
for (auto it = mp.begin(); it != mp.end(); it++) {
    cout << it -> first << " " << it -> second << endl;
}

// 方式二、range for C++ 11版本及以上
cout << "\n方法二、 range for" << endl;
for (auto it : mp) {
    cout << it.first << " " << it.second << endl;
}

// 方法三、 C++ 17版本及以上
cout << "\n方法三" << endl;
for (auto [key, val] : mp) {
    cout << key  << " " << val << endl;
}
```
#### 补充
C++ 提供map与unordered_map两种关联容器，可以将key与value关联起来。

map与unordered_map区别：map有序，unordered_map无序；

底层实现原理：

map： map内部实现了一个红黑树，该结构具有自动排序的功能，因此map内部的所有元素都是有序的，红黑树的每一个节点都代表着map的一个元素，因此，对于map进行的查找，删除，添加等一系列的操作都相当于是对红黑树进行这样的操作，故红黑树的效率决定了map的效率。

unordered_map: unordered_map内部实现了一个哈希表，因此其元素的排列顺序是杂乱的，无序的。

查询效率 unordered_map 查询复杂度O(1), map查询复杂度O(logn)

运行效率方面：unordered_map最高，而map效率较低但 提供了稳定效率和有序的序列。

占用内存方面：map内存占用略低，unordered_map内存占用略高,而且是线性成比例的。
