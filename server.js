var express 		= require('express'),
	http			= require('http'),
	path			= require('path'),
	bodyParser 		= require('body-parser'),
	app 			= express(),
	server 			= http.createServer(app),
	io				= require('socket.io').listen(server), 
	usernames		= [];

//Set up server
app.set('port', process.env.PORT || 3300 );


//Middleware
app.use(bodyParser()); 
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static(path.resolve(__dirname + '/prod'))); 

//Routes
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});


//Boot up server
server.listen(app.get('port'), function() {
	console.log("Server up and running at http://localhost:" + app.get('port') );
});

io.sockets.on('connection', function(socket) {
	
	function updateUsernames() {
		io.sockets.emit('usernames', usernames);
	}

	socket.on('new user', function(data, callback){
		if(usernames.indexOf(data) != -1) {
			callback(false);
		} else {
			callback(true);
			socket.username = data;
			name = data;
			usernames.push(socket.username);
			updateUsernames(); 
		}
	});

	socket.on('send message', function(data) {
		io.sockets.emit('new message', {msg: data, name: socket.username});
	});

	socket.on('disconnect', function(data) {
		if(!socket.username) return;
		usernames.splice(usernames.indexOf(socket.username), 1);
		updateUsernames(); 
	})


})

