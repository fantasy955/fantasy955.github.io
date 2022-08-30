input框动态显示

![image-20220830132419721](assets/image-20220830132419721.png)

当todo.isEdit为真时，显示input框

![image-20220830132445446](assets/image-20220830132445446.png)

handleEdit没有执行结束时，不会更新界面；

因此input框还没有显示，无法获取焦点。

整个dom更新完毕才执行：

![image-20220830132632572](assets/image-20220830132632572.png)

![image-20220830132705153](assets/image-20220830132705153.png)