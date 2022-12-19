## token生成

[(103条消息) 利用JWT生成Token的原理及公钥和私钥加密和解密的原则_伍华锋的博客-CSDN博客_jwt issuedat](https://blog.csdn.net/weixin_42030357/article/details/95629924)

[如何生成token(JWT的Token) - CHENSISI - 博客园 (cnblogs.com)](https://www.cnblogs.com/chensisi/p/13372310.html)

## 令牌与刷新令牌

[(103条消息) oauth2.0授权协议中刷新令牌refresh token的工作原理及生命周期分析_const伐伐的博客-CSDN博客_refreshtoken](https://blog.csdn.net/u013905744/article/details/111246789?spm=1001.2101.3001.6661.1&depth_1-utm_relevant_index=1)

[OAuth2 使用刷新令牌记住我 (zditect.com)](https://zditect.com/main-advanced/java/spring-security-oauth2-remember-me.html#:~:text=我们可以看到服务器响应包含访问令牌和刷新令牌。 访问令牌将用于需要身份验证的后续 API,调用，而 刷新令牌的目的是获取新的有效访问令牌 或只是撤销之前的访问令牌。)

如果**access token超时时间很长**，比如14天，由于第三方软件获取受保护资源都要带着access token，这样access token的攻击面就比较大。

如果access token超时时间很短，比如1个小时，那其超时之后就需要用户再次授权，这样的频繁授权导致用户体验不好。

引入refresh token，就解决了【access token设置时间比较常，容易泄露造成安全问题，设置时间比较短，又需要频繁让用户授权】的矛盾。

访问令牌将用于**需要身份验证的后续 API 调用**，而**刷新令牌的目的是获取新的有效访问令牌**或只是撤销之前的访问令牌。

[为什么要使用refresh token？为何会更安全？ - 简书 (jianshu.com)](https://www.jianshu.com/p/f73eec9d1096)

在程序与服务器通信时，一般只传递access token，攻击者一般截取到的也是access token，但这个token有效期短，造成的损失比较小；

黑客当然也可以想办法偷到两个token，此时就可以完全冒充了，只是难度增加了。

## jsonwebtoken

[(103条消息) 如何使用jwt 完成注销(退出登录)功能_风狗的博客-CSDN博客_jwt注销token](https://blog.csdn.net/weixin_39813433/article/details/122287823)

[JSON Web Token 入门教程 - 阮一峰的网络日志 (ruanyifeng.com)](https://ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

### JWT 的几个特点

（1）JWT 默认是不加密，但也是可以加密的。生成原始 Token 以后，可以用密钥再加密一次。

（2）JWT 不加密的情况下，不能将秘密数据写入 JWT。

（3）JWT 不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数。

（4）JWT 的最大缺点是，由于服务器不保存 session 状态，因此无法在使用过程中废止某个 token，或者更改 token 的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。

（5）JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT 的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证。

（6）为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输。