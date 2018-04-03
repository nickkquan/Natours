var StaticServer = require("static-server");

var server = new StaticServer({
	rootpath: "./client/",
	port: 3000
});

server.start(function() {
	console.log("Goliath online!");
});
