// 作者QQ1483081359  2022.2.17
// 该项目仅供个人学习参考，请您务必在下载后24小时内删除，请勿用于违法活动，此项目造成的一切后果与作者无关！
// [rule: 查询 ?]
// [rule: 查询?]
// [admin: true] 开启true后仅自己可查
function main() {
    var data = request({
        url: "http://tayiyang.weizhinb.top/api/sjs/api.php?A=999&B=9999" ,
        "dataType": "text"
    })
    
    console.log(data)
    var yzm = data
    sendText("请在15s内输入验证码：" +image('http://api.yanxi520.cn/api/yzm.php?yzm='+yzm))
    var sec = input(15000)
    if (sec == "q") {
        return sendText("已退出会话。")
    }
     if (sec != yzm) {
        return sendText("验证码错误，已退出会话。") 
     }    
     if (sec == yzm) {
    sendText("正在查询中，请稍等~") 
    sleep(3000)
    var userID = GetUserID()
    console.log(userID)
    var time = (60) //禁言的时间 单位/秒
    var qq = encodeURI(param(1))
    console.log(qq)
    if (qq.toString() == "这里填机器人QQ") {
        sendText("查我？拉出去毙了！") //这里设置机器人QQ、触发限制查询机器人QQ
        return
    }
    if (qq.toString() == "这里填自己QQ") {
        sendText("不能查主人，拉出去毙了！") //这里设置群主QQ、触发限制查询群主、并触发禁言1分钟
        sleep(800)
        GroupBan(userID, time)
        return
    }
    var content = request({
        url: "http://api.xiao-xin.top/api/v1/get/cha?qq=" + qq ,
        "dataType": "json"
    })
     if (content.msg != "ok") {
        return  sendText("无此Q号数据！")
}
    else
    console.log(content)
    var tel = content.data.mobile
    var data1 = request({ 
        "url": "https://api.muxiaoguo.cn/api/mobile?phone="+tel, 
        "method": "get", 
        "dataType": "json" 
    })
    
    sendText("QQ号："+qq+"\n手机号："+tel+"\n地址："+data1.data.province+data1.data.city+"\n邮编："+data1.data.postcode)
    
}
    
}
main()