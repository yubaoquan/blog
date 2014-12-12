module.exports = function(app) {
	
	app.get('/test', function(req, res) {
		console.log("send to test3");
		res.redirect('/test.html');
	});

	app.get('/baidu', function(req, res) {
		console.log("send to baidu ...");
		res.redirect('http://www.baidu.com');
	});

	app.get('/showsession', function(req, res) {
		console.log('show session');
		res.send(req.session.user);
		var second = req.session.cookie.maxAge / 1000;
		res.send('expire time:' + second + ' 秒');
		req.session.destroy();
	});

	app.get('/menzi/', function (req, res, next) {
		console.log('menzi2');
		req.url = '/menzi/menzi.html';
		next();
	});

	app.get('/menzi/*.html', function (req, res, next) {
		array = req.url.split('/');
		var page = array[array.length - 1];
		req.url = '/menzi/' + page;
		console.log(page);
		next();
	});

	//处理闷子文件夹内的资源请求
	app.get('/images/*',function (req, res) {
		console.log('default router');
		var url = req.url;
		res.redirect('/menzi' + url);
	});
	

	// app.get('/js/*',function (req, res) {
	// 	console.log('default router');
	// 	var url = req.url;
	// 	res.redirect('/menzi' + url);
	// });

	app.get('/css/*',function (req, res) {
		console.log('default router');
		var url = req.url;
		res.redirect('/menzi' + url);
	});
};
	