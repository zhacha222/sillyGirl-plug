//有问题tg频道留言 https://t.me/silly_MaiArk
// [rule:战力查询?]
// [rule:战力查询 ?]

var msg = encodeURI(param(1))

function main() {
	var result = request({
			url: "https://xiaobai.klizi.cn/API/other/wzzl.php?data=&msg="+ msg+"&type=",
            "dataType": "json"
		})
	
		
	if(result.code==-1){
	    return sendText(result.error)
	}else if(result.code==200){
	    sendText(result.title+result.content)
	}else {
	   return sendText(`获取失败，发生未知错误`) 
	}

}

main()
    
    