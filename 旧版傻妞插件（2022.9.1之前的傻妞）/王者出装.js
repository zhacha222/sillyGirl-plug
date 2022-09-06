//有问题tg频道留言 https://t.me/silly_MaiArk
// [rule:出装?]
// [rule:出装 ?]

var msg = encodeURI(param(1))

function main() {
	var result = request({
			url: "http://api.sdtro.cn/API/wzry/wzry.php?msg=" + msg,
            "dataType": "text"
		})
	
	var rule = /http(.*)$/
    var img  = (rule.exec(result)[0])
    
	if(!result)	{
	    return main()
	}else{
	    sendText(result+image(img))
	}

}

main()
    
    