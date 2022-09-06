// 作者QQ1483081359  项目非原创，由于原接口挂了，本人于2022.2.16参考熊猫制作的原文件二改 
// 该项目仅供个人学习参考，请您务必在下载后24小时内删除，请勿用于违法活动，此项目造成的一切后果与作者无关！
// [rule: 查询 ?]
// [rule: 查询?]
// [admin: true] 开启true后仅自己可查
function main() {
    var userID = GetUserID()
    console.log(userID)
    var time = (60) //禁言的时间 单位/秒
    var qq = encodeURI(param(1))
    console.log(qq)
    if (qq.toString() == "3573560681") {
        sendText("查我？拉出去毙了！") //这里设置机器人QQ、触发限制查询机器人QQ
        return
    }
    if (qq.toString() == 1483081359) {
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
    
main()
