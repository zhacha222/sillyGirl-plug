// 作者QQ1483081359
// [rule: 注册 ? ] 
// [rule: 注册? ] 

function main() {
    var userID = GetUserID()
	var userName = GetUsername()
    var address = encodeURI(param(1))
    var data = request({ 
        "url": "https://api.qicaiyun.top/ymzc/api.php?url=" + address , 
        "method": "get", 
        "dataType": "text" 
    })
   
        sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]" +data)



}
main()
