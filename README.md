后端接口线上地址根路径：http://api.wwnight.cn

### POST /

功能：上传图片

提交参数：

- 参数类型：`Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`

返回数据：

- 成功
  - 返回格式：`http://api.wwnight.cn/img/*.jpeg`

### POST /auth/register

功能：用户注册

提交参数

-  参数类型：`Content-Type: application/x-www-form-urlencoded;charset=utf-8`
- 参数字段
  - `username`：用户名，长短未做限制，前端限制
  - `password`：密码，长度未做限制，前端限制
  - `avatar`：头像链接

返回数据

- 失败
  - 返回格式`{"status":"fail", "msg":"错误原因"}`

- 成功

  - 返回格式

    {

    ​	"status": "ok",
    ​        "msg": "创建成功",
    ​        "data": {
    ​        	"_id": "5c6e04d69d6a2362281b7c6f",
    ​        	"username": "emm",
    ​        	"avatar": "http://api.wwnight.cn/img/*.jpeg",
    ​        	"createAt": "2019-02-21T01:54:30.527Z",
    ​        	"__v": 0
    ​         }

     }

### POST /auth/login

功能：用户登陆

提交参数

- 参数类型：`Content-Type: application/x-www-form-urlencoded;charset=utf-8`
- 参数字段
  - `username`：用户名，长度前端限制
  - `password`：密码，长度前端限制

返回数据

- 失败

  - 返回格式` {"status": "fail", "msg": "用户名或密码错误"}`或`{ "status": "fail", "msg": "用户不存在"}`

- 成功

  - 返回格式

    {
     	"status": "ok",
            "msg": "登录成功",
            "data": {
            	"_id": "5c6e04d69d6a2362281b7c6f",
            	"username": "emm",
            	"avatar": "http://api.wwnight.cn/img/*.jpeg",
            	"createAt": "2019-02-21T01:54:30.527Z",
            	"__v": 0
            }
    }

### GET /auth

功能：判断用户是否登陆

提交参数：无

返回数据

- 已经登陆的情况

  {
      "status": "ok",
      "isLogin": true,
      "data": {
          "_id": "5c6e04d69d6a2362281b7c6f",
          "username": "emm",
          "avatar": "http://api.wwnight.cn/img/*.jpeg",
          "createAt": "2019-02-21T01:54:30.527Z",
          "__v": 0
      }
  }

- 没有登陆的情况

  {
      "status": "ok",
      "isLogin": false
  }

### GET /auth/logout

功能：注销登录

提交参数：无

返回数据：

- 失败
  - 返回格式`{"status": "fail", "msg": "当前用户尚未登录"}`
- 成功
  - 返回格式`{"status": "ok", "msg": "注销成功"}`

### GET /notes

功能：获取自己的note列表

提交参数：无

返回数据：

- 失败
  - 返回格式`{"status": 1, "errorMsg": "请先登录"}`

- 成功

  - 返回格式

    [
        {
            "grade": 1,
            "complete": false,
            "_id": "5c6e1137492269f139970d69",
            "username": "emm",
            "content": "hhh",
            "createAt": "2019-02-21T02:47:19.649Z",
            "__v": 0
        }
    ]

### POST /notes/add

功能：添加便利贴

提交参数：

- 参数类型：`Content-Type: application/x-www-form-urlencoded; charset=utf-8`
- 参数字段
  - `content`：便利贴内容
  - `grade`：事件重要等级，类型为整数`number`，根据自己所定的规则分配等级，不传默认为0

返回数据

- 失败

  - 返回格式
    - `{"status": 1, "errorMsg": "请先登录"}`
    - `{"status": 2, "errorMsg": "内容不能为空"}`
    - `{"status": 4, "errorMsg": "请输入正确的数据格式"}`

- 成功

  {
      "status": 0,
      "msg": "创建成功",
      "data": {
          "grade": 0,
          "complete": false,
          "_id": "5c6e1c9851250cf1cb858c95",
          "username": "emm",
          "content": "你好",
          "createAt": "2019-02-21T03:35:52.871Z",
          "__v": 0
      }
  }

### POST /notes/edit

功能：修改贴纸

提交参数：

- 参数类型：`Content-Type: application/x-www-form-urlencoded; charset=utf-8`
- 参数字段
  - `noteId`：便利贴Id
  - `content`：便利贴内容
  - `complete`：是否完成
  - `grade`：重要等级

返回数据

- 失败

  - 返回格式`{"status": 1, "errorMsg": "请先登录"}`

- 成功

  - 返回格式

    {
        "status": 0,
        "msg": "修改成功",
        "data": {
            "grade": 1,
            "complete": false,
            "_id": "5c6e1137492269f139970d69",
            "username": "emm",
            "content": "hhh",
            "createAt": "2019-02-21T02:47:19.649Z",
            "__v": 1
        }
    }

### POST notes/delete

功能：删除便利贴

提交参数

- 参数类型：`Content-Type: application/x-www-form-urlencoded; charset=utf-8`
- 参数字段
  - `noteId`：便利贴Id

返回数据

- 失败
  - 返回格式`{"status": 1, "errorMsg": "请先登录"}`
- 成功
  - 返回格式`{"status": 0, "errorMsg": "删除成功"}`