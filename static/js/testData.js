var server = require("http").createServer();
var io = require("socket.io")(server);
var testData = [
  {"devEUI":"4268253788322320","latitude":30.2826018996,"longitude":120.0135681562},
  {"devEUI":"8036302416436423","latitude":30.2837415002,"longitude":120.0147536926},
  {"devEUI":"4268253788322320","latitude":30.2848764551,"longitude":120.0143406324},
  {"devEUI":"8036302416436423","latitude":30.2859511758,"longitude":120.0135198764},
  {"devEUI":"4268253788322320","latitude":30.2851405039,"longitude":120.0130585365},
  {"devEUI":"8036302416436423","latitude":30.2847096870,"longitude":120.0118569068},
  {"devEUI":"4268253788322320","latitude":30.2849227795,"longitude":120.0103548698},
  {"devEUI":"8036302416436423","latitude":30.2838758425,"longitude":120.0106338195},
  {"devEUI":"4268253788322320","latitude":30.2819672383,"longitude":120.0115833215},
  {"devEUI":"8036302416436423","latitude":30.2823980672,"longitude":120.0129405193}
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
    },2000)

})

io.on("disconnect",function(){
  console.log("断开浏览器连接");
})


server.listen(3000);
