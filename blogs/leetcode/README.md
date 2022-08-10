# 栈、队列

## 头文件、创建对象

#include<stack>

\#include<queue>

stack<int> stk;

queue<int> q;

## 栈操作

s.empty()               如果栈为空返回true，否则返回false
s.size()                返回栈中元素的个数
s.pop()                 删除栈顶元素但不返回其值
s.top()                 返回栈顶的元素，但不删除该元素
s.push()                在栈顶压入新元素

## 队列操作

q.empty()               如果队列为空返回true，否则返回false
q.size()                返回队列中元素的个数
q.pop()                删除队列首元素但不返回其值
q.front()              返回队首元素的值，但不删除该元素
q.push()                在队尾压入新元素
q.back()                返回队列尾元素的值，但不删除该元素



# vector

vector<int> vec;

在最后插入 vec.push_back();

返回最后一个元素 vec.back();

返回第一个元素 vec.front();

删除最后一个元素 vec.pop_back();

a.erase(a.begin()+1,a.begin()+3);  删除a中第1个（从第0个算起）到第2个元素，也就是说删除的元素从a.begin()+1算起（包括它）一直到a.begin()+         3（不包括它）




# int2string

int i = 10;

string s = to_string(i);



# string2int

string s = "123";

int i = atoi(s.c_str());



# 字符串比较

string s = "abc";

string b = "123";

s.compare(b); 0-相同 非零值-不同



# 动态数组

- #include<malloc.h>

int* flag = (int*)malloc((L + 1) * sizeof(int));

- int *p= new int\[10\];



# 字典

#include<unordered_set>

#include<unordered_map>

### 初始化

```
unordered_map<int, string> myMap=[[5, "张大"] ,[6, "李五"]];
```

## 插入

```
myMap[2] = "李四";

myMap.insert(pair<int, string>(3, "陈二"));//使用insert和pair插入
```

## 判断键存在

map.find(key) == map.end()

# unordered_set<int> set

## 判断存在 

set.count(temp) == 1

## 遍历

for(auto iter = mp.begin(); iter != mp.end(); iter++){
	  if(iter->second > nums.size()/2)   // second 方法得到的是map 中的value
	       {
	           ans = iter->first; // 得到 map中的key
	           break;
	       }
	   }
	   

# map

## 从小到大排序

map<int, int, less<int>> key_map;

