/**
 * Created by Yoo on 2016-10-28.
 */
exports.timer = new process.EventEmitter();
var cnt = 1;
setInterval(function () {
    exports.timer.emit('tick');
},1000);