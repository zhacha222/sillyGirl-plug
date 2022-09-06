//有问题tg频道留言 https://t.me/silly_MaiArk
// [rule:青年大学习]

function main() {
	
	var result = request({
			url: "https://xiaobai.klizi.cn/API/other/youth.php",
            "dataType": "text"
		})
		
    	   sendText(result) 
	    
}

main()
    
    