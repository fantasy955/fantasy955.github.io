# 应用

[前端基础进阶（十五）：透彻掌握Promise的使用，读这篇就够了 - 简书 (jianshu.com)](https://www.jianshu.com/p/fe5f173276bd)

Promise执行完成后必须return或者执行resolve和reject返回，否则会一直pending，不会执行then方法。

# resolve与 reject，catch

[(70条消息) Promise初步详解（resolve，reject，catch）__夜渐凉的博客-CSDN博客_promise reject](https://blog.csdn.net/weixin_41888813/article/details/82882375?spm=1001.2101.3001.6650.1&depth_1-utm_relevant_index=2)

调用reject方法后，Promise状态变为rejected，即操作失败状态，此时执行then方法里面onrejected操作
