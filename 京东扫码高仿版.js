// 作者QQ1483081359
// [rule: 京东扫码 ]
// [disable: false ] 
function main() {
    var userID = GetUserID()
	var userName = GetUsername()
    sendText("请在60s内打开京东app并扫描下方二维码：")
    sendImage('https://wkapi.top/api/qrcode.php?text=傻逼，你被骗了！&size=180')
    
    sleep(10000)
    
    sendText(userName+"，添加成功。")



}
main()