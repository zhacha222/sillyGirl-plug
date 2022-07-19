// 作者QQ1483081359
// [rule: ^查ip (.*)$ ]
// [rule: ^查ip(.*)$ ]

function main() {
    var userID = GetUserID()
	var userName = GetUsername()
    var IP = param(1)
    var data = request({ 
        "url": "http://ovoxc.cn/chuanapi/ip.php?ip="+IP , 
        "method": "get", 
        "dataType": "json" 
    })
  
    sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]" +"\n查询ip：" + IP +"\nIP地址：" +data.text)

}


main()
