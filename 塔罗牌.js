// 作者QQ1483081359
// [rule: 塔罗 ]

function main() {
    
    var su = request({
		url: "http://api.diaoyan.buzz/tlp.php?n=",
		dataType: "text"
	})
	
	sendText("您抽到一张" + su + "\n正在尝试为您解析~" )
    var data = request({ 
        "url": "http://api.diaoyan.buzz/tlp.php?n=" + su , 
        "method": "get", 
        "dataType": "text" 
    })
    sendText(data)
    
}
main()