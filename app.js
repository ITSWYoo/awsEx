var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(function (req, res) {
    fs.readFile('HTMLPage.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
}).listen(52273, function () {
    console.log('Running');
});

var io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
    socket.on('rint', function (data) {
        console.log('Client Send Data:', data);
        socket.emit('smart', data);
    });
});

// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
//
// var routes = require('./routes/index');
// var users = require('./routes/users');
//
// var app = express();
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', routes);
// app.use('/users', users);
//
// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
//
// // error handlers
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function (err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });
//
// app.listen(52273, function () {
//     console.log('running');
// })
// module.exports = app;


// var fs = require('fs');
// var mysql = require('mysql');
// var express = require('express');
// var bodyParser = require('body-parser');
//
// var client = mysql.createConnection({
//     name: 'root',
//     password: 'db1320',
//     database: 'Library'
// });
//
// var app = express();
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
//
// app.listen(52273,function () {
//     console.log("Server Running!!");
// });
//
// app.get('/',function (req, res) {
//    fs.readFile('list.html','utf-8',function (err, data) {
//        if(err){
//            console.log('Error!');
//        }
//        else{
//            client.query('SELECT * FROM products', function (err, results) {
//                res.send(results)
//            })
//        }
//    })
// });
// var mysql = require('mysql');
//
// var client = mysql.createConnection({
//     user: 'root',
//     password: 'db1320',
//     database: 'Library'
// });
//
// client.query('select *from products', function (err, result, fields) {
//     var a=[];
//     if(err){
//         console.log('Query Error!');
//     }else{
//         a = result;
//         for(var i in a){
//             if(i<2) console.log(a[i]);
//         }
//     }
// });
// var fs = require('fs');
// var express = require('express');
// var bodyParser = require('body-parser');
//
// var DummyDB = (function () {
//     var DummyDB = {};
//     var storage = [];
//     var count = 1;
//
//     //조회
//     DummyDB.get = function (id) {
//         if (id) {
//             id = (typeof id == 'string') ? Number(id) : id;
//
//             for (var i in storage) if (storage[i].id == id) {
//                 return storage[i];
//             }
//         } else {
//             return storage;
//         }
//     };
//
//     //추가
//     DummyDB.insert = function (data) {
//         data.id = count++;
//         storage.push(data);
//         return data;
//     };
//
//     //삭제
//     DummyDB.remove = function (id) {
//         id = (typeof id == 'string') ? Number(id) : id;
//
//         for (var i in storage) if (storage[i].id == id) {
//             storage.splice(i, 1);
//             return true;
//         }
//
//         return false;
//     };
//
//     return DummyDB;
// })();
//
// var app = express();
//
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
//
// app.get('/user', function (req, res) {
//     res.send(DummyDB.get());
// });
// app.get('/user/:id', function (req, res) {
//     res.send(DummyDB.get(req.params.id));
// });
// app.post('/user', function (req, res) {
//
//     var name = req.body.name;
//     var region = req.body.region;
//
//     if (name && region) {
//         res.send(DummyDB.insert({
//             name: name,
//             region: region
//         }));
//     } else {
//         throw new Error('error');
//     }
// });
//
// app.put('/user/:id', function (req, res) {
//     var id = req.params.id;
//     var name = req.body.name;
//     var region = req.body.region;
//
//     var item = DummyDB.get(id);
//     if (name) item.name = name;
//     if (region) item.region = region;
//
//     res.send(item);
// });
//
// app.delete('user/:id', function (req, res) {
//     res.send(DummyDB.remove(req.params.id));
// });
//
// app.listen(52273, function () {
//     console.log("running");
// })
// var express = require('express');
// var session = require('express-session');
// var uuid = require('node-uuid');
//
// var app = express();
//
// app.use(session({
//     secret: 'secret key',
//     resave: false,
//     saveUninitialized: true,
//     // cookie:{
//     //     originalMaxAge: null,
//     //     expires: null,
//     //     httpOnly: true,
//     //     path:'/'
//     // }
// }));
//
// app.use(function(req, res){
//     req.session.now = uuid.v4();
//
//     res.send(req.session);
// });
//
// app.listen(52273, function () {
//     console.log('running');
// })


// app.post('/', function (req, res) {
//     console.log(req.body);
//     console.log('!!!!!!!!!!!!!!!!!!!!');
//     console.log(req.files);
//
//     res.redirect('/');
// });

// app.listen(52273, function () {
//     console.log("running");
// });
// var http = require('http');
// var fs = require('fs');
// var url = require('url');
//
// var ejs = require('ejs');
// ejs.
//
// http.createServer(function (req, res) {
//     var pathname = url.parse(req.url).pathname;
//
//     if(pathname == '/'){
//
//     }else if(pathname == 'OtherPage'){
//
//     }
// }).listen(52273,function () {
//     console.log('running');
// });


// var http = require('http');
//
// var server = http.createServer();
//
// //클라이언트가 요청할 때 발생
// server.on('request', function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('<h1>hi</h1>');
// });
// //클라이언트가 접속할 때 발생
// server.on('connection', function (code) {
//     console.log('Connection On');
// });
// //서버 종료
// server.on('close', function (code) {
//     console.log('Close On');
// });
//
// server.listen(52273);
//
// //간단하게
// require('http').createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('<h1>hi</h1>');
// }).listen(52273, function () {
//     console.log('server running');
// });
