 // 有问题tg频道留言 https://t.me/silly_MaiArk
 // [rule: 帅哥 ]
 
 function main(){
 var data = request({
			url: "https://xiaobai.klizi.cn/API/img/boy.php",
			"dataType": "text",
		})
		
	if (!data){
	   return main() 
	}	
		
 sendImage(data)
}
main()