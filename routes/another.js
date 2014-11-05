module.exports = function(app) {
	
	app.get('/test', function(req, res) {
		console.log("send to test3");
		res.redirect('/test.html');
	});

	app.get('/baidu', function(req, res) {
		console.log("send to baidu 301...");
		res.redirect('http://www.baidu.com');
	});
};
	