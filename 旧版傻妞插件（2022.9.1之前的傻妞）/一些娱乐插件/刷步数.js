// 作者QQ1483081359
// [rule: 步数 ]


function main() {
    var userID = GetUserID()//发送人用户id
	var userName = GetUsername()
    sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"请输入小米运动账号：")
    var nu = input(15000)
    if (nu == "") {
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"操作超时，已退出会话。")
        
    }
    if (nu == "q") {
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"已退出会话。")
    }
    sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"请在15s内输入密码：")
    var com = input(15000)
    if (com == "") {
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"操作超时，已退出会话。")
    }
    if (com == "q") {
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"已退出会话。")
    }
    sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"请在15s内输入步数：")
    var cn = input(15000)
    if (cn == "") {
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"操作超时，已退出会话。")
    }
    if (cn == "q") {
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"已退出会话。")
    }
    var content = request({
        url: "https://api.kit9.cn/api/milletmotion/?mobile="  + nu + "&password=" + com + "&step=" + cn,
        "dataType": "json"
    })
    
	
     if (content.code == 200) {
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" + content.msg +"\n步数：" +cn)
}
    
    else if (content.code == 207){
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +content.msg)
}
    
}    
   
    
 main()
