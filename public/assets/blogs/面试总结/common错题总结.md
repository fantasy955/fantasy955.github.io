## 算法相关

- promise调度器；
- 可以立即指向的节流函数；

## 基础知识

- `typeof null`的结果为`object`，一般用null表示一个未赋值的对象；

- 函数内的`arguments`为实参，对`arguments`直接赋值可以修改形参；

- 不同进制的数组在转换成字符串时（与字符串相加），会转换为10进制；

- linux权限控制，`chmod`用于修改文件的访问权限，`chown`用于更改文件的所有者和组组信息。chmod中u表示文件所有者，g表示与文件所有者同组的用户，o表示其他用户，a表示所有用户，如果不指定用户，则用`chmod abc xxx_file`快速指定三类用户的权限，a b c可选值为1 2 4的组合1表示执行（x)，2表示写入（w），4表示读取（r）。

- 表单的默认编码格式为`application/x-www-form-urlencoded`，在发送前对所有字符进行编码；

- css使用服务端字体，使用`@font-face`；

  

## 操作dom

- 创建：createDocumentFragment()   //创建一个DOM片段
- createElement()  //创建一个具体的元素
- createTextNode()  //创建一个文本节点

- 添加：appendChild()

- 移出：removeChild()

- 替换：replaceChild()

- 插入：insertBefore()

- 复制：cloneNode(true)

- 查找：etElementsByTagName()   //通过标签名称

- getElementsByClassName()   //通过标签名称

- getElementsByName()   //通过元素的Name属性的值

- getElementById()   //通过元素Id，唯一性

