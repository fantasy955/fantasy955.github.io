# 用户管理

##　MongoDB 查看所有用户账号信息

```
>  use admin
switched to db admin
> db.auth('admin','123456')
1
> db.system.users.find().pretty()
```

## 创建用户

- 登录

```
./mongo -u username -p password  127.0.0.1:27017/dbname
```

- 创建超管

```
use admin
db.createUser( {user: "admin",pwd: "123456",roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})
*超管创建成功，开启auth认证，并重启
```

- 角色说明

```
**数据库用户角色**
read: 只读数据权限
readWrite:读写数据权限
**数据库管理角色**
dbAdmin: 在当前db中执行管理操作的权限
dbOwner: 在当前db中执行任意操作
userADmin: 在当前db中管理user的权限
**备份和还原角色**
backup
restore
**跨库角色**
readAnyDatabase: 在所有数据库上都有读取数据的权限
readWriteAnyDatabase: 在所有数据库上都有读写数据的权限
userAdminAnyDatabase: 在所有数据库上都有管理user的权限
dbAdminAnyDatabase: 管理所有数据库的权限
**集群管理**
clusterAdmin: 管理机器的最高权限
clusterManager: 管理和监控集群的权限
clusterMonitor: 监控集群的权限
hostManager: 管理Server
**超级权限**
root: 超级用户
```

- 使用admin建立其他用户

```
use db-1;
db.createUser(
  {
    user: "username-1",
    pwd: "password-1",
    roles: [ { role: "dbOwner", db: "db-1" } ]
  }
)
```

- 修改用户信息

```
db.updateUser("username",
  { 
  	pwd: "",  
    roles: ["",""]  
  }  
)
```

- 修改用户密码

```
db.changeUserPassword('username','new-password');
```

