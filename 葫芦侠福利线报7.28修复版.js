//有问题tg频道留言 https://t.me/silly_MaiArk
// [rule: 福利线报 ]

function main() {
    var userID = GetUserID()
	var userName = GetUsername()
    var content = request({ 
        "url": "http://api.qemao.com/api/huluxia/", 
        "method": "get", 
        "dataType": "json" 
    })
    
    
    
  if (content.code != 1000) {
        return main()
}
else
    var coverImg = content.data.Picture[0]
    
        sendText("【活动类型】：" + content.data.type +"\n【活动标题】：" + content.data.title +"\n【结束时间】：" + content.data.Time +"\n【活动规则】：" + content.data.rule +"\n【参与方式】：" + content.data.manner +"\n【活动说明】：" + content.data.explanation +"\n【线报来源】：" + content.user.nick +image(coverImg))


    
}


main()

