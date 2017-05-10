var server = require("http").createServer();
var io = require("socket.io")(server);
var testData = [
  {"devEUI":"aaa","latitude":30.2792377697,"longitude":120.0171292379},
  {"devEUI":"aaa","latitude":30.2807766388,"longitude":120.0231436424},
  {"devEUI":"aaa","latitude":30.2871537529,"longitude":120.0283010801},
  {"devEUI":"aaa","latitude":30.2865978848,"longitude":120.0338157019},
  {"devEUI":"aaa","latitude":30.2848907441,"longitude":120.0387944695}
];

io.on("connection",function(socket){
    console.log("连接浏览器成功");
    var i = 0;
      setInterval(function(){
        if (i>4) {
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
