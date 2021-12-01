## 常用操作 [参考](https://blog.csdn.net/halaoda/article/details/78661334)

- git clone [库地址]()
- git checkout -b {分支名}  创建新分支并切换
- git pull origin {远程分支名} 拉取远程分支
- git commit -m {描述} 暂时提交版本到本地仓库
- git push origin  {远程分支名} 推送到远程分支
- git merge {分支名}  合并本地指定分支,建议merge之前,目标分支拉取到最新
- git reset Head^  回到上一提交版本
- git reset --hard {版本号|HEAD}  回到指定版本|
- git add -A  暂存所有更改
- git push origin --delete {name}  删除远程分支
- git checkout -b {local} origin/{remote}  创建一个新分支并关联远程分支
- git branch -D {name}  删除本地分支

### git stash

​	当正在开发的功能写到一半,突然有bug要修复或其它事情,又不想提交时.可以使用git stash暂时将未保存的更改存到堆栈中.之后可以随时复原.

	- git stash  一般用法, 需要存一次时可用.
	- git stash save {name}  将存储的内容,添加记号,便于指定复原
	- git stash list  查看stash中的内容
	- git stash apply [stash@{n}]   复原内容,默认第一位,或指定n位 第几位看list
	- git stash drop [name]  移除指定内容
	- git stash clear  清空
	- git stash show [stash@{n}]  查看最新保存的内容和当前目录的差异
	- git stash branch  从最新的内容创建分支

### git merge

​	一般流程,将目标分支合并到目的分支

	- git checkout {目标分支}
	- git pull 
	- git checkout {目的分支}
	- git merge {目标分支}
	- git push -u origin {目的分支}

