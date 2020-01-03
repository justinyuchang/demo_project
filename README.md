# Smashello

完成屬於自己的Trello，
以簡潔、即時、高互動性為主要價值！

# Members

* https://github.com/shunfenglee
* https://github.com/ck100pro
* https://github.com/justinyuchang
* https://github.com/shufan951

# Requirements

* Ruby 2.6.3
* Rails 6.0.1
* Postgresql 12

# Installation

```
$ git clone git@github.com:justinyuchang/demo_project.git  
$ cd demo_project
$ bundle install   
$ rails db:migrate
$ foreman start
```

# User stories
## 使用者註冊
- 使用者可以註冊、登入 (使用 Devise gem)
- 可使用google登入
- 登入後才可看到其他頁面

## Board CRUD
- 看板列表頁列出當前看板
- 可同一頁新增、刪除
- 新增後直接進入看板
- 可看到其他看板協作邀請

## Profile
- 可在navbar點入個人頁面進行修改

## Board
- 可修改狀態（團隊或私人）
- 可邀請其他使用者加入
- 會顯示當前協作成員
- 可新增list

## List
- 新增後可在共同協作者畫面即時更新

## Card
- 顯示到期日
- 可指定任務人員

# Model關聯圖
![image](https://github.com/justinyuchang/Smashello/blob/master/reference/model%E9%97%9C%E8%81%AF%E5%9C%96.001.jpeg)

