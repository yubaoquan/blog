
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
};