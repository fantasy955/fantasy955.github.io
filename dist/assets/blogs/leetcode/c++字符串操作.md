# 字符串截取

```c++
string str = "abcdef";
// 指定下标i后k个元素,第i个字符会保留
// string.substr(i, k)
string str_0 = str.substr(1,2); // bc

// 指定下标后所有字符
string str_1 = str.substr(1); // bcdef

// 从右查找某个字符的下标
int indexRight = str.rfind('e'); // 4
// 从左查找
int indexLeft = str.find('b') // 1
```

