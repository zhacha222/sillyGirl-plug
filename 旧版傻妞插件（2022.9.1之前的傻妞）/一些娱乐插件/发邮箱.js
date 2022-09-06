// 作者QQ1483081359
// [rule: 发邮箱 ]


function main() {
    var userID = GetUserID()
	var userName = GetUsername()
    sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"请输入目标邮箱地址，按q退出会话：")
    var ad = input(20000)
    if (ad == "") {
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"操作超时，已退出会话。")
        
    }
    if (ad == "q") {
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"已退出会话。")
    }
    sendText("请在15s内输入邮箱标题：")
    var ti = input(15000)
    if (ti == "") {
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"操作超时，已退出会话。")
    }
    if (ti == "q") {
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"已退出会话。")
    }
    sendText("请在15s内输入邮箱内容：")
    var msg = input(15000)
    if (msg == "") {
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"操作超时，已退出会话。")
    }
    if (msg == "q") {
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"已退出会话。")
    }
    sendText("请选择邮箱模板，输入1~3：")
    var mb = input(15000)
    if (mb == "") {
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"操作超时，已退出会话。")
        
    }
    if (mb == "q") {
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"已退出会话。")
    }
    
    
    var content = request({
        url: "http://mail.ovooa.cn/email.php?accept="  + ad + "&title=" + ti + "&msg=" + msg + "&mb=" + mb,
        "dataType": "json"
    })
	
     if (content.code == 200) {
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n恭喜，发送成功！" )
}
    
    else if (content.code == 201){
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n发送失败，请检查邮箱地址是否正确然后重新发送！")
}
    
}    
   
    
 main()
