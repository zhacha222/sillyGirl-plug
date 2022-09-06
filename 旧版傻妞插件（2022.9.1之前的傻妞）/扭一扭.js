//有问题tg频道留言 https://t.me/silly_MaiArk
// [rule:扭一扭]

var result = request({
			url: "http://api.qemao.com/api/douyin/",
            "dataType": "location"
		})
		
	sendVideo("http://api.qemao.com/api/douyin/"+result)    