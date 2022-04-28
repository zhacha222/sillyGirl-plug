// 作者QQ1483081359
// [rule: 特别关心 ] 
    var data = request({ 
        "url": "https://api.linhun.vip/api/smkey?p=qzone&type=json", 
        "method": "get", 
        "dataType": "json" 
    })
         sendText("由于协议限制，请使用设备A扫描设备B的二维码！你有60秒钟扫码哦！ "+image(data.img))
    console.log(data)
    var qr = data.qrsig
function main() {
    var qq = GetUserID()
    var data1 = request({ 
        "url": "https://api.linhun.vip/api/smkey?p=qzone&type=json&qrsig="+qr, 
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
    var pskey = data1.p_skey
    var dat = request({ 
        "url": "https://api.linhun.vip/api/concerned?qq="+qq+"&skey="+skey+"&p_skey="+pskey, 
        "method": "get", 
        "dataType": "json" 
    })
if (dat.msg == "查询成功") {
        return sendText("您被"+dat.concerned+"个人设为了特别关心！")
}
else
      sendText("查询失败，请重试！")

}
      else return main()

}
main()