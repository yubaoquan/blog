var redisDB = require('../models/redisDB.js');
/*
 * GET users listing.
 */

// exports.list = function(req, res){
//   res.send("respond with a resource");
// };

module.exports = function (app) {
	app.get('/user', function(req, response) {
		console.log('/user');
		response.send("Hello World");
	});

  app.get('/redis', function (req, response) {
    console.log('redis test');
    var myname;
    redisDB.get("name", function (err, data) {
      if (err) {
        console.log('fail to get name');
        return null;
      } else {
        if (data === null) {
          console.log('no myname data');
          myname = 'null';
        } else {
          myname = data;
        }
        console.log('reply:' + data);
        console.log('data:' + myname);
        
        response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
        response.write(myname);//可以获得数据库中的myname;
        response.end();

      }
    });
     // console.log('data:' + myname.data);
     // response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
     // response.write(myname);//undefined
     // response.end();
  });

  app.get('/ajax', function (req, res) {
    res.json({
      data : 'success',
      name : 'dengqingqlin'
  });
  });
};