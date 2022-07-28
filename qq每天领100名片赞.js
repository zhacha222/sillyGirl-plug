//有问题tg频道留言 https://t.me/silly_MaiArk
// [rule:领赞]

function main() {
	var qq = GetUserID()//发送人用户id
	var userName = GetUsername()
	//var random = Math.ceil(Math.random() * 1234)
	if (ImType()==`qq`){
	
	var result = request({
			url: "https://xiaobai.klizi.cn/API/other/mpz.php?qq=" + qq,
            "dataType": "text"
		})
		
    		
    	if(result==`恭喜你成功领取名片赞`){
    	 var content ="恭喜，领赞成功！\n数量：100" + "\n预计：3分钟内到账。\n"
    	 sendText("[CQ:at,qq=" + qq + ",text=@" + userName + "]\n" + content + "")
    	}else{
    	   sendText(result+`，明天再来吧！`) 
	    
	    }
	 
    }

}

main()
    
    