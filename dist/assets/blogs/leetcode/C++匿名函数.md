转自 [(71条消息) C++匿名函数_晚睡的人没对象的博客-CSDN博客_c++ 匿名函数](https://blog.csdn.net/Ezra521/article/details/113694743)

```c++
#include<iostream>
using namespace std;
int main(){
	// 注：
	/**
		[=]表示值传递方式捕捉所有父作用域的变量包, 括this
		[&s]表示引用传递捕捉变量s
		[&]表示引用传递方式捕捉所有父作用域的变量, 包括this
		[this]表示值传递方式捕捉当前的this指针
		可以连用如:[=,&a,&b]表示以引用传递的方式捕捉变量a和b，以值传递方式捕捉其它所有变量
		注意:捕捉列表不允许变量重复传递比如[&,&a]
	*/
	// 匿名函数 - ->返回值类型 - lambda表达式
	auto fun = [](int a)->int{ // 定义匿名函数 并引用
        cout << a << endl;
        return 1;
	};
	int num = fun(10);// 调用
	cout << num << endl;// 测试返回值
	return 0; 
}

```

