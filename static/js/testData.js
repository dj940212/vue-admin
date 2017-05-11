var server = require("http").createServer();
var io = require("socket.io")(server);
var testData = [
  {"devEUI":"aaa","latitude":30.2796092364,"longitude":120.0161752634},
  {"devEUI":"aaa","latitude":30.2797389484,"longitude":120.0168458156},
  {"devEUI":"aaa","latitude":30.2801280836,"longitude":120.0181279115},
  {"devEUI":"aaa","latitude":30.2805450125,"longitude":120.0194368295},
  {"devEUI":"aaa","latitude":30.2814993096,"longitude":120.0194046430},
  {"devEUI":"aaa","latitude":30.2825879382,"longitude":120.0190023117},
  {"devEUI":"aaa","latitude":30.2833105956,"longitude":120.0187072687},
  {"devEUI":"aaa","latitude":30.2833059632,"longitude":120.0175968342},
  {"devEUI":"aaa","latitude":30.2823980081,"longitude":120.0168565445},
  {"devEUI":"aaa","latitude":30.2827037490,"longitude":120.0155154400}
];

io.on("connection",function(socket){
    console.log("连接浏览器成功");
    var i = 0;
      setInterval(function(){
        if (i>9) {
            i = 0
        }
        socket.emit("testData",testData[i])
        i++;
      },5000)

})

io.on("disconnect",function(){
  console.log("断开浏览器连接");
})


server.listen(3000);
