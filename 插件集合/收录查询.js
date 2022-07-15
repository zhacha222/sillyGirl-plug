// 作者QQ1483081359
// [rule: ?收录 ] 
// [rule: ^收录(.*)$ ] 
function main() {
    var userID = GetUserID()
	var userName = GetUsername()
    var address = encodeURI(param(1))
    var data = request({ 
        "url": "http://tianyi.kingapi.cloud/api/siteor.php?url=" + address , 
        "method": "get", 
        "dataType": "text" 
    })
  
        sendText(data)



}
main()
