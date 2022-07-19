// 作者QQ1483081359
// [rule: 业务查询 ] 
    var data = request({ 
        "url": "https://api.linhun.vip/api/smkey?p=qun&type=json", 
        "method": "get", 
        "dataType": "json" 
    })
         sendText("由于协议限制，请使用设备A扫描设备B的二维码！你有60秒钟扫码哦！ "+image(data.img))
    console.log(data)
    var qr = data.qrsig
function main() {
    var qq = GetUserID()
    var data1 = request({ 
        "url": "https://api.linhun.vip/api/smkey?p=qun&type=json&qrsig="+qr, 
        "method": "get", 
        "dataType": "json" 
    })
   if (data1.msg == "二维码未失效。") {
        return main()
}
   if (data1.msg == "二维码已失效。") {
        return sendText("二维码已失效。")
}
   if (data1.msg == "登录已取消！或二维码过期。") {
        return sendText("登录已取消！或二维码过期。")
}
 
   if (data1.msg == "登录成功！") {
    sendText("查询中，请稍候~")
   console.log(data1)
    var skey = data1.skey
    var dat = request({ 
        "url": "http://tayiyang.weizhinb.top/api/qqywcx/api.php?qq="+qq+"&skey="+skey, 
        "method": "get", 
        "dataType": "text" 
    })

      sendText(dat)
}
      else return main()
}
main()
