// 作者QQ1483081359
// [rule: 京东扫码 ]

function main() {
    var userID = GetUserID()
	var userName = GetUsername()
    sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"请在60s内打开京东app并扫描下方二维码：")
    sendImage('https://wkapi.top/api/qrcode.php?text=傻逼，你被骗了&size=180')
    
    sleep(7000)
    
    sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"登录成功。")



}
main()