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
        console.log('reply:' + data.toString());
        myname = data.toString();
        console.log('data:' + myname);
        myname = data.toString();
        // response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
        // response.write(myname);//可以获得数据库中的myname;
        // response.end();

      }
    });
     console.log('data:' + myname.data);
     response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
     response.write(myname);//undefined
     response.end();
  });
};