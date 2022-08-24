### 判断两个vector内容是否相同

```c++
return vec1 == vec2
```

### 自定义排序

```
#include<vector>
#include<algorithm>
using namespace std;
vector<vector<int>> myVec({{3,1}, {4,2}, {5,3}});
sort(myVec.begin(), myVec.end(), [](const auto& a, const auto& b){
	return a[0] > a[1];  // hight to low
});
```

