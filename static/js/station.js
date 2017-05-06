var server = require('http').createServer();
var io = require('socket.io')(server);

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

var client = mqtt.connect(host, options);

io.on("connection",function(socket){
  console.log("与浏览器链接")
})
