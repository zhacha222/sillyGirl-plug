// 作者QQ1483081359
// 2.16 优化了上一版本获取内容出错的bug
// [rule: 福利线报 ]

function main() {
    var userID = GetUserID()
	var userName = GetUsername()
    var content = request({ 
        "url": "http://tianyi.kingapi.cloud/api/Huluxia_Wire_report.php", 
        "method": "get", 
        "dataType": "json" 
    })
    
    
    
  if (content.code != 1000) {
        return main()
}
else
    var coverImg = content.data.total.Picture
    
        sendText("【活动类型】：" + content.data.total.type +"\n【活动标题】：" + content.data.total.title +"\n【结束时间】：" + content.data.total.Time +"\n【活动规则】：" + content.data.total.rule +"\n【参与方式】：" + content.data.total.manner +"\n【活动说明】：" + content.data.total.explanation +"\n【线报来源】：" + content.data.user.nick +image(coverImg))


    
}


main()

