function fun(n, o){
	console.log(n, o);
	return {
		fun: function(m){
			return fun(m, n);   // 该函数n的值恒定，m的值动态；即n是闭包的
		},
	};
}
const a = fun(0);  // n的值恒为0
a.fun(1);   // 1 0
a.fun(2);   // 2 0
a.fun(3);   // 3 0