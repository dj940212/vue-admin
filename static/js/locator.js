
/**
 * Created by limei on 2017/2/16.
 */
var server = require('http').createServer();
var io = require('socket.io')(server);

// var coordtransform = require('coordtransform');
var mqtt = require("mqtt");
var host = "tcp://121.196.194.14:1883"; //127.0.0.1:61623"; 121.196.194.14:1883
var clientId = "id_"+Math.round(10000000*Math.random());
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
var dev =[];



io.on('connection', function(client1) {
  console.log('与浏览器websocket连接');

  var client = mqtt.connect(host, options);
  client.on('error', function(err) {
    console.log(err);
    client.end();
  });

  client.on('connect', function() {
    console.log('连接服务器121.196.194.14');
  });

  client1.on('message1',function (data) {
    console.log(data);
    mac = data;
    dev.push(data);
    /*client.subscribe('application/1/node/'+data+'/rx', {
      qos: 2
    });*/
    // client.subscribe('application/1/node/+/rx', {
    //   qos: 2
    // });
  });

  client.subscribe('application/1/node/+/rx', {
      qos: 2
  });

  client.on('close', function() {
    console.log('断开与服务器的连接mqtt');
  });

  client.on('message', function(topic, message, packcet) {
    var data = JSON.parse(message);
    client1.emit('message', data);

  });
  client1.on('disconnect', function() {
    console.log('关闭');
    client.end();
  });
});
server.listen(3002);
