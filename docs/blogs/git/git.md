工作区，暂存区，本地仓库，远程仓库
![An image](/git.png)

## 常见git指令

```
// 代码提交到暂存区
git add .
// 代码提交到本地仓库
git commit -m 'xxx'
// 上边两步合集
git commit -am 'xxx'
// 创建分支
git branch xxx
// 删除分支
git branch -d xxx
// 删除分支，工作区，暂存区的东西不要了
git branch -D xxx
// 切换分支
git checkout xxx
// 切换+创建分支
git checkout -b xxx
// 代码强制回滚，本地代码回到某个版本
git reset --hard xxxx
// 代码提交记录
git log
// 代码存到暂存区
git stash
// 代码从暂存区整出来
git stash pop
// 本地代码合并
git merge
```
