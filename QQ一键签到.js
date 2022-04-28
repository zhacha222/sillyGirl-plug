// 作者QQ1483081359
// [rule: 签到 ] 

function main() {
    var qq = GetUserID()
    var data = request({ 
        "url": "https://api.linhun.vip/api/smkey?p=vip&type=json", 
        "method": "get", 
        "dataType": "json" 
    })
         sendImage(data.img)
  
    console.log(data)
    var qr = data.qrsig
    sleep(15000)
    
    var data1 = request({ 
        "url": "https://api.linhun.vip/api/smkey?p=vip&type=json&qrsig="+qr, 
        "method": "get", 
        "dataType": "json" 
    })
   if (data1.msg == "二维码未失效。") {
        return sendText("已退出会话。")
}
   if (data1.msg == "二维码已失效。") {
        return sendText("超时未登录，已退出会话。")
}
  if (data1.code == 202) {
        return sendText("登录已取消！或二维码过期。")
}
  else
    sendText(data1.msg+"，正在尝试为您签到，请稍候~")
    console.log(data1)
    
    var skey = data1.skey
    var pskey = data1.p_skey
    var dat = request({ 
        "url": "https://api.linhun.vip/api/Signin?qq="+qq+"&skey="+skey+"&p_skey="+pskey, 
        "method": "get", 
        "dataType": "json" 
    })

   sendText(dat.msg)




}
main()