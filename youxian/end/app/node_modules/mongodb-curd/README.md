### Mongo-CURD

> 封装了mongodb增删改查相关方法

1. 引入

```js
var Mongo = require('Mongodb-curd');
```
---

> 名词解释

- `batabaseName` 数据库名
- `collcationName` 集合名

---

### 增
```js
Mongo.insert(batabaseName,collcationName,data,function(result){
    if(!result){
       res.send({
           code:0,
           mes:"error"
        })
    }else{
        res.send({
           code:1,
           mes:"success",
           data:result
        })
    }
})
```
insert方法相关说明：

- `data` 插入单条数据data值为一个对象，插入多条数据data值为数组
- `callback` 接受一个参数result，result为成功之后的返回结果

--- 

### 删
```js
Mongo.remove(batabaseName,collcationName,data,function(result){
    if(!result){
       res.send({
           code:0,
           mes:"error"
        })
    }else{
        res.send({
           code:1,
           mes:"success",
           data:result
        })
    }
})
```
remove方法相关说明：

- `data` 要删除数据的描述对象

如果根据_id查询直接写{_id:"12323323"} 值直接是一个普通字符串

- `callback` 接受一个参数result，result为成功之后的返回结果

---

### 改（更新）
```js
Mongo.update(batabaseName,collcationName,array,function(result){
    if(!result){
       res.send({
           code:0,
           mes:"error"
        })
    }else{
        res.send({
           code:1,
           mes:"success",
           data:result
        })
    }
})
```
update方法相关说明：

- `array` 数组接受两个值，第一个放查找要更新的对象，第二个值为要替换的对象

如果根据_id查询直接写{_id:"12121"} 值直接是一个普通字符串

- `callback` 接受一个参数result，result为成功之后的返回结果
---

### 查

```
Mongo.find(batabaseName,collcationName,data,function(result){
    if(!result){
       res.send({
           code:0,
           mes:"error"
        })
    }else{
        res.send({
           code:1,
           mes:"success",
           data:result
        })
    }
},{
    skip:0,
    limit:0
})

```
find方法相关说明：

- `data`  要删除数据的描述对象

如果根据_id查询直接写{_id:"12323323"} 值直接是一个普通字符串

- `callback` 接受一个参数result，result为查找出来的数据结果