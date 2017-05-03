var server = require('http').createServer();
var io = require('socket.io')(server);

// var coordtransform = require('coordtransform');
var mqtt = require("mqtt");
var host = "tcp://120.27.230.136:1883"; //127.0.0.1:61623";
var clientId = 'webclient';
var options = {
	keepalive: 10, //10秒 设置为0 时禁用
	clientId: clientId,
	protocolId: 'MQTT', //协议
	protocolVersion: 4,
	clean: true, //true设置为false 当离线接受qos 1和2的消息
	reconnectPeriod: 1000, //1秒，两人重新连接之间的时间间隔
	connectTimeout: 30 * 1000, //在收到connack前
	rejectUnauthorized: false //万一mqtts（MQTT通过TLS）是必需的，该options对象是通过向传递 tls.connect()。如果您使用的是自签名证书，通过rejectUnauthorized: false选项。要注意的是你自己暴露在中间人攻击的人，所以这是不建议在生产环境中的配置
}



io.on('connection', function(client1) {
	console.log('与浏览器websocket连接');

	var client = mqtt.connect(host, options);

	client.on('error', function(err) {
		console.log(err);
		client.end();
	});
	client.on('connect', function() {
		console.log('连接服务器120.27.230.136');
	});

	client.subscribe('gateway/+/stats', {
		qos: 2
	});
	/*client.publish('topic','wss secure connect demohhhhhhh...!',{qos:1,retained:false});*/

	client.on('close', function() {
		console.log('断开与服务器的连接');
	});

	client.on('message', function(topic, message, packcet) {
		var data = JSON.parse(message);
		// console.log(data);
		// var wgs84togcj02 = coordtransform.wgs84togcj02(data.longitude, data.latitude);
		var date = new Date();
		var newdata = {
			/*date:date,*/
			mac: data.mac,
			time: date,/*data.time,*/
			longitude:data.longitude,
			latitude:data.latitude,
			altitude: data.altitude,
			online:'正常'
		}
		// console.log(newdata);
		client1.emit('message', newdata);
	});
	client1.on('disconnect', function() {
		console.log('关闭');
		client.end();
	});
});
server.listen(3003);
