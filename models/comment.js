var mongodb = require('./db');
var ObjectID = require('mongodb').ObjectID;

function Comment(articleId, name, title, comment) {
  var head = 'http://www.gravatar.com/avatar/6e6a8cc1254b1e8a106deb594d1b3974?s=48';
  console.log('head:' + head);
  this.name = name;
  // this.day = day;
  this.title = title;
  this.comment = comment;
  this.articleId = articleId;
  this.head = head;
}

module.exports = Comment;

//存储一条留言信息
Comment.prototype.save = function(callback) {
  console.log('save comment name:' + this.name);
  var name = this.name,
      // day = this.day,
      title = this.title,
      comment = this.comment;
  console.log('save comment name:' + name);
  console.log('comment:' + comment);
  var  articleId = this.articleId;
  var head = this.head;
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('posts', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //通过用户名、时间及标题查找文档，并把一条留言对象添加到该文档的 comments 数组里
      collection.update({
        // "name": name,
        // "time.day": day,
        // "title": title
        "_id" : new ObjectID(articleId)
      }, {
        $push: {"comments": {'name':name, 'content':comment, 'head':head}}
      } , function (err) {
        
          mongodb.close();
          console.log("db closed");
          if (err) {
            console.log("push comment error");
            return callback(err);
          }
          callback(null);
      });   
    });
  });
};