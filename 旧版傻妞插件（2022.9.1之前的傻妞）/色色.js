 // 有问题tg频道留言 https://t.me/silly_MaiArk
 // [rule: 色色 ]
 
 function main(){
   
 var level = bucketGet("sese", "level") 
 if(level==``){
     var level ='1' 
 }
 if(level>6||level<1){
     var level ='1'
     bucketSet("sese", "level",level) 
     sendText("无此程度，请在1-6中选择，已给您修改为默认程度1")
 }
 var data = request({
			url: "https://lolisuki.cc/api/setu/v1?r18=1&level="+level,
			"dataType": "json",
		})
		
	if (!data){
	   return main() 
	}	
		
 sendImage(data.data[0].urls.regular)
}
main()