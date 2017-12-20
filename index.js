let wechat = require("wechat"),
  express = require("express"),
  app = express(),
  http = require("http");

var config = {
  token: "jiangxin",
  appid: "wxdee062ba0c93c45b",
  appsecret: "6861402140c200c827e09f05a7972349",
  encodingAESKey: "hxlqJhRy5fVRU2xcl4dyJ0qC8MaUc5NgUCnlvEAVUes",
  checkSignature: false // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
};

app.use(express.query());

app.use(function(req, res, next) {
  console.log(req.method);

  if (req.method === "GET") {
    res.send("hello guys!");
  } else {
    next();
  }
});

app.use(
  "/",
  wechat(config, function(req, res, next) {
    // 微信输入信息都在req.weixin上
    console.log(req.method);
    var message = req.weixin;
    // console.log(message);
    if (message.FromUserName === "diaosi") {
      // 回复屌丝(普通回复)
      res.reply("hehe");
    } else if (message.Content === "text") {
      //你也可以这样回复text类型的信息
      res.reply({ content: "text object", type: "text" });
    } else if (message.FromUserName === "hehe") {
      // 回复一段音乐
      res.reply({
        type: "music",
        content: {
          title: "来段音乐吧",
          description: "一无所有",
          musicUrl: "http://mp3.com/xx.mp3",
          hqMusicUrl: "http://mp3.com/xx.mp3",
          thumbMediaId: "thisThumbMediaId"
        }
      });
    } else {
      // 回复高富帅(图文回复)
      res.reply([
        {
          title: "小辛教你去做菜",
          description: "酱辛世家",
          picurl:
            "http://a.hiphotos.baidu.com/image/pic/item/b812c8fcc3cec3fddc8130b5df88d43f869427b6.jpg",
          url: "https://mp.weixin.qq.com/s/gSQRngBH6UYJm7AyiA-Sgg"
        }
      ]);
    }
  })
);

var server = http.createServer(app);

server.listen(9001, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
