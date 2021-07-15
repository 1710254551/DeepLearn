### 一,在[npm](https://www.npmjs.com/)注册

### 二,在填写的邮箱中验证邮箱

​		验证之后才能继续发布

### 三,在命令行登录

​	npm adduser

​	tip: 密码输入时会隐藏并且光标不会移动  正常输入回车即可

### 四,使用npm源

​	npm源:`https://registry.npmjs.org/`

​	建议安装nrm ```npm i nrm -g```

​	nrm ls 查看所有源

​	nrm add <name> <rul> 添加源

​	nrm use <name> 使用源

​	发布包时 切换npm源 ```nrm use npm ```

### 五,创建包

​	创建一个文件夹 <name>-test-pkg  在命令行里```npm init -y```初始化一个package.json

​	创建一个 README.md 文件 添加一定的说明

​	创建一个 index.js入口文件,与package.json中的 main 字段对应 

### 六,发布包

​	建议使用```npm publish --access public``` 公共发布

​	如果出现发布包重名,可实行```npm init --scope=@<username> -y```

​	username为你npm账户的username,这会给包添加作用域.

### 七,更新包

​	**npm采用[语义化版本](https://docs.npmjs.com/about-semantic-versioning)，共三位，以’.’隔开，从左至右依次代表：主版本（major）、次要版本（minor）、补丁版本（patch）。**



​	变更版本号的命令：`npm version <major | minor | patch>`

​		执行对应位置的指令,会默认在版本的对应位置+1

​	更新版本和内容之后进行发布`npm publish --access public`

​	查看包的所有版本

```
	npm view <packageName> versions
```

​	本地更新包`npm up <packageName>`

### 八,废弃,删除旧版本

​	一,废弃

​	废弃指定版本

​	`npm deprecate <pkg>[@<version>] <message>`

​	这会安装时出现警示,但不影响使用

​	废弃原因：

- 版本：鼓励用户更新最新版本
- 包：此包内容已经过时，没有了维护的价值

​	二,删除

​	npm不鼓励任何形式的删除，主要因为我们发布的包可能已经被其他人引用，如果我们删除了此包，其他人在重新安装含有我们包的依赖的工程时，出现找不到包问题。

​	基于此，npm做了相关的删除限制：

- `删除的版本24小时后方可重发!`
- `只有发布72小时之内的包可以删除!`



​	为了保持npm库的纯净,单纯为了学习发布操作的朋友们,请在72小时内删除发布的学习包.

​	删除操作`npm unpublish <pkg> --force`

​	

