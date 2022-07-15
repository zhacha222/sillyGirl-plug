// [rule: 登录 ]  有问题tg频道留言 https://t.me/silly_MaiArk
// [rule: 登陆 ]  作者QQ1483081359 转载请保留版权  github仓库：zhacha222/sillyGirljs
// [rule: h ]
// [priority:924703993]
// [disable: false] 是否禁用
// [admin: false] 是否只允许管理员使用

/*注意事项：
1.傻妞和MaiARK都要对接青龙    
2.傻妞可以对接多个青龙，但是要设置一个聚合容器  
3.MaiARK只需要对接 傻妞聚合的那个青龙就行了 
可以实现直接登录查询，不需要再复制ck发送给机器人，和对接Nolan的效果一样 
*更新日志：
6.6更新 适配QQ，微信，TG，微信公众号 全平台登录
6.7更新 修复部分人GetImType()报错，修复登录时显示获取超时但实际上有收到短信的bug 
6.9更新 新增 登录后更新查询数据中的【登录时长】，修复部分人登录立即查询提示过期的现象
6.12更新 增加手机号初步筛选，防止叼毛钓鱼使MaiARK频繁请求导致黑ip
6.18更新 修改手机号初步筛选的逻辑bug
6.19更新 新增 超时重连（默认5次），增加验证码格式验证
6.20 修复微信登录过程中撤回手机号报错的bug(仅测试vlw框架的)
6.24更新 增加20s获取验证码超时判断，直接内置maiark登录地址，增加maiark登录开关，增加maiark登录失败的通知开关
7.1更新 增加登录私聊开关，增加储存手机号开关，优化登录失败通知，增加登录拉黑管理
*/


//[rule:^登录管理$]
// [rule: ^登陆管理$] 

 
// [rule: ^拉黑查询 (.*)$] 
// [rule: ^拉黑查询(.*)$] 


// [rule: ^拉黑 (.*)$] 
// [rule: ^拉黑(.*)$] 


// [rule: ^解黑 (.*)$]
// [rule: ^解黑(.*)$] 
 

// [rule: ^拉黑管理$] 



    var user = GetUserID()
    var name = GetUsername()
    var maiark_addr = bucketGet("jd_cookie", "maiark_addr") //maiark的addr
    var notify = bucketGet("jd_cookie", "maiark_notify") //notify开关
    var enable = bucketGet("jd_cookie", "enable_maiark") //maiark开关
    var loginprivate = bucketGet("jd_cookie", "login_private") //登录私聊开关
    var phonememory = bucketGet("jd_cookie", "phone_memory") //手机号储存开关
    var isblack1 = bucketGet("login_black", user) //登录黑名单
    var isblack2 = bucketGet("login_black", name) //登录黑名单
    var addr = maiark_addr.replace(/([\w\W]+)\/$/,"$1")
    var isAdmin = isAdmin()
    var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
    	+ '?(([0-9a-z_!~*().&=+$%-]+: )?[0-9a-z_!~*().&=+$%-]+@)?' //ftp的user@
	    + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
    	+ '|' // 允许IP和DOMAIN（域名）
    	+ '([0-9a-z_!~*()-]+.)*' // 域名- www.
    	+ '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
    	+ '[a-z]{2,6})' // first level domain- .com or .museum
    	+ '(:[0-9]{1,4})?' // 端口- :80
    	+ '((/?)|' // a slash isn't required if there is no file name
    	+ '(/[0-9a-z_!~*().;?:@&=+$,%#-]+)+/?)$';
    	

function choose(){ //命令筛选
    
	var msg=GetContent()

    if(msg== "登录" || msg== "登陆" || msg== "h" )
		checkMaiArk()
	
	else if(msg=="登录管理" || msg=="登陆管理" ) {
	
    	if (isAdmin) {
        	logincontrol()
    	    }
    	return;	
	}
	
	else if(msg.indexOf("解黑")==0) {
	
    	if (isAdmin) {
        	blackdelete()
    	    }
    	return;	
	}
	
	else if(msg.indexOf("黑查")==1) {
        blackcheck()
    	return;	
	}
	
	else if(msg.indexOf("黑管")==1) {
         if (isAdmin) {
        	blackmanager()
    	    }
    	return;	
	}
	
	else if(msg.indexOf("拉黑")==0) {
	
    	if (isAdmin) {
        	blackset()
    	    }
    	return;	
	}
	return
}
    	
choose()    
    	
function checkMaiArk() {//登录check 

    if (isblack1=="true" || isblack2=="true") {//登录拉黑判断
        var dddf=sendText("您已被列入登录黑名单，请联系管理员解除！")
        sleep(3000)
        RecallMessage(dddf)
        return
    }

    if (loginprivate=="true" && GetChatID()!=0) {//登录私聊判断
        sendText("请私聊我发送‘登录’")
        return
    }
    if (enable=="false") { //maiark开关判断
		Continue()
		return;
	}
	if (maiark_addr == '') {
	    if (!isAdmin) {
		sendText("MaiARK无法为您服务。")
		return;
	    }
		if (isAdmin) {
		    
	      sendText("检测到未设置MaiARK服务地址")
	      sendText("2s后开始配置...")
	      sleep(1500)
	   	  sendText("请输入您的MaiARK服务地址：\n(输入“q”随时退出会话。)")
	   	  maiArk = input(30000)
	   	  
	   	  for (var i = 0; i < 2; i++) {
         //错误4次直接退出
          if(!maiArk || maiArk == "q" || maiArk == "Q"){
		   sendText("已退出会话。")
		   return;
	    }
          if (maiArk.match(strRegex)) {
           bucketSet("jd_cookie", "maiark_addr", maiArk)
           sendText("已保存。")
           return;   
            } else{
                 sendText("输入地址格式错误，请重新输入：")
                 maiArk = input(30000)
          
        }
            
     } 
         sendText("错误次数过多，已退出。")
              return;
		
	    }
		
	}
	
	if (phonememory=="true") { //maiark开关判断
		var num = bucketGet("number", user)
		main1(num)
		return;
	}
      	
      sendText("MaiARK为您服务，请输入11位手机号：(输入“q”随时退出会话。)");
	  var num = input(20000)
	  main(num);
}

     
function main(num) {//输入手机号
    
    if (!num.match(/^[1][3,4,5,6,7,8,9][0-9]{9}$/)) {
 
     for (var i = 0; i < 4; i++) {
         //错误4次直接退出
     
       if(!num || num == "q" || num == "Q"){
		  sendText("已退出会话。")
          cancelloginnotify() //取消登录通知
		  return;
	    }
	    if(num.match(/^[1][3,4,5,6,7,8,9][0-9]{9}$/)){
		  sendText("正在获取登录验证码,请耐心等待...")
		  return getcode(num)
	    }
        else{
          sendText("请输入正确的手机号：")
          num = input(20000)
          	//默认等待手机号输入20s,不够自己改
        }
        
     }
     
        sendText("输入错误次数过多，已退出。")
        numwrongnotify() //手机号多次输入错误通知
        return;
   }
        else{
        sendText("正在获取登录验证码,请耐心等待...")
        getcode(num);
        
	    }
	    
}

function main1(num) {//存储手机号
    
    if (num) {
		var phonephoneber =
			num.substring(0, 3) + "****" + num.substring(7, 11) ;
		sendText(
			"6秒后,将使用历史号码" +
				phonephoneber +
				"自动登录\n若使用其他号码登录请发送〖1〗，取消登录请发送〖q〗。)"
		);

		sec = input(6000);
		if (sec == "q" || sec == "Q") {
			sendText("已退出会话。")
			cancelloginnotify() //取消登录通知
			return;
		} 
		if (sec == "1") {
			sendText("请输入11位手机号：");

			var num = input(30000);
			
    		if (!num.match(/^[1][3,4,5,6,7,8,9][0-9]{9}$/)) {
     
             for (var i = 0; i < 4; i++) {
             //错误4次直接退出
         
                if(!num || num == "q" || num == "Q"){
        		  sendText("已退出会话。")
                  cancelloginnotify() //取消登录通知
        		  return;
        	    }
        	    if(num.match(/^[1][3,4,5,6,7,8,9][0-9]{9}$/)){
        		  sendText("正在获取登录验证码,请耐心等待...")
        		  return getcode(num)
        	    }
                else{
                  sendText("请输入正确的手机号：")
                  num = input(20000)
                  	//默认等待手机号输入20s,不够自己改
                    }
              }
                 
                sendText("输入错误次数过多，已退出。")
                numwrongnotify() //手机号多次输入错误通知
                 return;
            }
            else{
                sendText("已将此手机号码设为默认号码（后续无需再输入）")
                sendText("正在获取登录验证码,请耐心等待...")
                getcode(num)
    			bucketSet('number', user, num)
            }
        			
		} 
		else {
		    sendText("正在获取登录验证码,请耐心等待...")
			getcode(num)
		}
	} 
		
	else {
		sendText("MaiARK为你服务，请输入11位手机号：(输入“q”随时退出会话。)");
		var num = input(20000);
		
	    if (!num.match(/^[1][3,4,5,6,7,8,9][0-9]{9}$/)) {
 
         for (var i = 0; i < 4; i++) {
         //错误4次直接退出
     
            if(!num || num == "q" || num == "Q"){
    		  sendText("已退出会话。")
              cancelloginnotify() //取消登录通知
    		  return;
    	    }
    	    if(num.match(/^[1][3,4,5,6,7,8,9][0-9]{9}$/)){
    		  sendText("正在获取登录验证码,请耐心等待...")
    		  return getcode(num)
    	    }
            else{
              sendText("请输入正确的手机号：")
              num = input(20000)
              	//默认等待手机号输入20s,不够自己改
                }
          }
             
            sendText("输入错误次数过多，已退出。")
            numwrongnotify() //手机号多次输入错误通知
             return;
        }
        else{
            sendText("已将此手机号码设为默认号码（后续无需再输入）")
            sendText("正在获取登录验证码,请耐心等待...")
            getcode(num)
			bucketSet('number', user, num)
        
        }
		
	}

}


function getcode(num) {//获取验证码
     
	var result = request({
			url: addr +"/getsms?mobile=" + num,
			"dataType": "json",
			"timeOut": 30000
			  //获取验证码30s未响应则超时
		})

    if (!result) {
        
        sendText("获取验证码超时，请尝试重新登录，或换用其他方式登录！")
        //如果这里登录时返回这个内容，请检查自己的MaiARK是否正常
        getcodewrongnotify() //获取验证码失败通知
        return;
    }
    if (result.msg == "操作过于频繁，请24小时后再试，或先使用其他方式登录") {
       sendText("操作过于频繁，请24小时后再试，或换使用其他方式登录!")
       iptimeoutnotify() //ip拉黑通知
        return;
    }

    if (result.code == 0) {
        sendText("请输入短信验证码：")
        LoginJD(num,result);
    } else {
        sendText(result.msg)
        getcodewrongnotify() //获取验证码失败通知
        return;
    }
}


function LoginJD(num,result) {//登录
	var gsalt = result.gsalt
	var guid = result.guid
	var lsid = result.lsid
	var i = 0
	code = input(45000)
	//等待验证码45s，不够自己改
	while (!code.match(/^[0-9]{6}$/)) {
      i++
      if (i > 2)  { 
         sendText("输入错误次数过多，已退出。")
          codewrongnotify() //验证码多次输入错误通知
         return;
      }
      if (!code || code == "q" || code == "Q")  {
          sendText("已退出会话。")
          cancelloginnotify() //取消登录通知
          return 
      }
      if (code.match(/(.*)revoked_msg(.*)$/))  {code = input(30000)}
      if (!code.match(/^[0-9]{6}$/)) {
        sendText("请输入正确格式的验证码：")
        code = input(30000)
    }
}
    
	var result1 = request({
		url: addr +"/verify?mobile="+num +"&gsalt=" + gsalt+"&guid="+guid+"&lsid="+lsid+"&smscode="+code,
			"dataType": "json",
			"timeOut": 30000
		})
		
	while (!result1) {
      i++
      if (i > 4)  {
      sendText("登录超时,请重新申请登录。")
      loginimeoutnotify() //登录超时通知
      return 
      }
      if (!result1) {
          
         sendText("正在尝试第" + i + "次重登...")
         result1 = request({
			url: addr +"/verify?mobile="+num +"&gsalt=" + gsalt+"&guid="+guid+"&lsid="+lsid+"&smscode="+code,
			"dataType": "json"
		})
    }
}		
		
		
	while (result1.msg == "验证码输入错误") {
      i++
      if (i > 5)  {
        sendText("输入错误次数过多，已退出。")
        codewrongnotify() //验证码多次输入错误通知
        return
      }
      if (result1.msg == "验证码输入错误") {
         sendText("验证码错误，请重新输入：")
         code = input(30000)
         result1 = request({
		 url: addr +"/verify?mobile="+num +"&gsalt=" + gsalt+"&guid="+guid+"&lsid="+lsid+"&smscode="+code,
			"dataType": "json"
		})
		
      }	
      if (!code || code == "q" || code == "Q") {
       sendText("已退出会话。")
       cancelloginnotify() //取消登录通知
       return
      }
      if (!code.match(/^[0-9]{6}$/)){
      sendText("验证码格式错误，已退出会话。")
      codewrongnotify() //验证码多次输入错误通知
      return 
      }
	  if (!result1){
	  sendText("登录信息已过期，请重新登录。")
	  codetimeoutnotify() //登录时验证码已过期通知
	  return 
	  }
    
}	
		
    if (result1.msg == "验证码已过期，请重新获取") {
       sendText("验证码已过期，请重新登录！")
       codetimeoutnotify() //登录时验证码已过期通知
        return;
    }
    if (result1.msg == "操作过于频繁，请24小时后再试，或先使用其他方式登录") {
       sendText("操作过于频繁，请24小时后再试，或换使用其他方式登录!")
       loginfrequentnotify() //登录频繁通知
        return;
    }
    if (result1.msg == "您的账号存在安全风险，请使用其他方式登录") {
       sendText("您的账号存在安全风险，请手动登录一次京东app以解除风险!")
       unsafenotify() //账号风险通知
        return;
    }

    if (result1.ck != undefined) {
    postck(result1)
   
     }else {
        sendText(result1.msg + "，请重新登录！")
        return;
    }

}

function postck(result1) {//上传ck

    var rule = /[^;]+;pt_pin=(.*);$/
    var ck = result1.ck
    var ckpin = rule.exec(ck)
    var jj = ckpin[1]
    var pin = encodeURI(jj)
    
    try
	{
	sillyGirl.session(ck)
	}
	catch (e)
	{
	sillyGirl.Session(ck)
	}
    
     if (ImType() == "qq" ) {
        bucketSet('pinQQ', pin, user)
        sendText("上车成功。")
       return;
      } 
      
     if (ImType() == "wx" ) {
        bucketSet('pinWX', pin, user)
        sendText("上车成功。")
     return;
      }
     if (ImType() == "wxmp" ) {
        bucketSet('pinWXMP', pin, user)
        sendText("上车成功。")
       return;
     }
     else if (ImType() == "tg" ) {
        bucketSet('pinTG', pin, user)
        sendText("上车成功。")
      return;
     } 
        

}


function cancelloginnotify() {//取消登录通知
    if (notify!= "false") {
    notifyMasters("用户："+user+"\n昵称："+GetUsername()+"\n来源渠道："+ImType()+"\n该用户取消登录\n\n不想收到此通知？试试对我发送“set jd_cookie maiark_notify false”")  
    }
}

function numwrongnotify() {//手机号多次输入错误通知
    if (notify!= "false") {
    notifyMasters("用户："+user+"\n昵称："+GetUsername()+"\n来源渠道："+ImType()+"\n该用户多次手机号输入错误，疑似钓鱼建议拉黑\n\n不想收到此通知？试试对我发送“set jd_cookie maiark_notify false”")  
     }
}

function getcodewrongnotify() {//获取验证码失败通知
    if (notify!= "false") {
     notifyMasters("用户："+user+"\n昵称："+GetUsername()+"\n来源渠道："+ImType()+"\n该用户获取验证码失败，请检查maiark是否正常\n\n不想收到此通知？试试对我发送“set jd_cookie maiark_notify false”")
    }
}

function codewrongnotify() {//验证码多次输入错误通知
    if (notify!= "false") {
     notifyMasters("用户："+user+"\n昵称："+GetUsername()+"\n来源渠道："+ImType()+"\n该用户输入验证码错误次数过多，疑似钓鱼建议拉黑\n\n不想收到此通知？试试对我发送“set jd_cookie maiark_notify false”")  
    }
}

function codetimeoutnotify() {//登录时验证码已过期通知
    if (notify!= "false") {
     notifyMasters("用户："+user+"\n昵称："+GetUsername()+"\n来源渠道："+ImType()+"\n该用户登录时验证码已过期，登录失败。\n(如多次报错此消息，请检查MaiARK是否正常)\n\n不想收到此通知？试试对我发送“set jd_cookie maiark_notify false”") 
    }
}

function loginimeoutnotify() {//登录超时通知
    if (notify!= "false") {
     notifyMasters("用户："+user+"\n昵称："+GetUsername()+"\n来源渠道："+ImType()+"\n该用户多次重登超时，登录失败。\n(如多次报错此消息，请检查MaiARK是否正常)\n\n不想收到此通知？试试对我发送“set jd_cookie maiark_notify false”") 
    }
}

function ipfrequentnotify() {//ip拉黑通知
    if (notify!= "false") {
     notifyMasters("温馨提示："+"\n您的ip今日请求验证码过于频繁，疑似被拉黑，预计24小时后恢复正常！\n\n不想收到此通知？试试对我发送“set jd_cookie maiark_notify false”") 
    }
}

function loginfrequentnotify() {//登录频繁通知
    if (notify!= "false") {
     notifyMasters("用户："+user+"\n昵称："+GetUsername()+"\n来源渠道："+ImType()+"\n该用户登录过于频繁，请24小时后再试，登录失败。\n\n不想收到此通知？试试对我发送“set jd_cookie maiark_notify false”") 
    }
}

function unsafenotify() {//账号风险通知
    if (notify!= "false") {
     notifyMasters("用户："+user+"\n昵称："+GetUsername()+"\n来源渠道："+ImType()+"\n该用户账号存在安全风险，登录失败。需要手动登录一次京东app以解除风险!\n\n不想收到此通知？试试对我发送“set jd_cookie maiark_notify false”") 
    }
}


function logincontrol() {//登陆管理
    var userID = bucketGet("qq", "masters")
    sendText("请在10s内从中选择你要设置的参数：(输入“q”随时退出会话。)\n\n1 . 启用maiark登录\n2 . 停用maiark登录\n3 . 打开maiark登录失败通知\n4 . 关闭maiark登录失败通知\n\n5 . 配置或更改maiark服务地址\n\n6 . 拉黑管理\n7 . 打开私聊登录\n8 . 关闭私聊登录\n9 . 启用maiark手机号储存\n10 . 关闭maiark手机号储存\n\n------------------------------------------------\n11 . 使用nark登录\n12 . 配置或更改nark服务地址");
    iii = input(10000)
    if (iii == 1) { //启用maiark登录
        var tip = "true"
        bucketSet("jd_cookie", "enable_maiark", tip)
        sendText("已启用maiark登录。")
		return;
    }else if (iii == 2) { //关闭maiark登录
        var tip = "false"
        bucketSet("jd_cookie", "enable_maiark", tip)
        sendText("已关闭maiark登录。")
		return;
    }else if (iii == 3) { //启用maiark登录失败通知
        var tip = "true"
        bucketSet("jd_cookie", "maiark_notify", tip)
        sendText("已启用maiark登录失败通知。")
		return;
    }else if (iii == 4) { //关闭maiark登录失败通知
        var tip = "false"
        bucketSet("jd_cookie", "maiark_notify", tip)
        sendText("已关闭maiark登录失败通知。")
		return;
    }else if (iii == 5) { //更改maiark服务地址
         sendText("请输入新的MaiARK服务地址：\n(输入“q”随时退出会话。)")
         maiArk = input(30000)
        for (var i = 0; i < 2; i++) {
         //错误3次直接退出
          if(!maiArk || maiArk == "q" || maiArk == "Q"){
		    sendText("已退出会话。")
		    return;
	        }
          if (maiArk.match(strRegex)) {
            bucketSet("jd_cookie", "maiark_addr", maiArk)
            sendText("已保存。")
            return;   
            } else{
                 sendText("地址格式错误，请重新输入：")
                 maiArk = input(30000)
          
        }
            
     } 
         sendText("错误次数过多，已退出。")
              return;
    }else if (iii == 6) { //拉黑管理
        blackmanager()
		return;
    }else if (iii == 7) { //打开私聊登录
        var tip = "true"
        bucketSet("jd_cookie", "login_private", tip)
        sendText("已打开私聊登录。")
		return;
    }else if (iii == 8) { //关闭私聊登录
        var tip = "false"
        bucketSet("jd_cookie", "login_private", tip)
        sendText("已关闭私聊登录。")
		return;
    }else if (iii == 9) { //启用手机号储存
        var tip = "true"
        bucketSet("jd_cookie", "phone_memory", tip)
        sendText("已启用maiark手机号储存。")
		return;
    }else if (iii == 10) { //关闭手机号储存
        var tip = "false"
        bucketSet("jd_cookie", "phone_memory", tip)
        sendText("已关闭maiark手机号储存。")
		return;
    }else if (iii == 11) { //使用nark登录
        var tip = "false"
        bucketSet("jd_cookie", "enable_maiark", tip)
        sendText("已关闭maiark登录,使用nark登录")
		return;
    }else if (iii == 12) { //更改nark服务地址
         sendText("请输入新的nark服务地址：\n(输入“q”随时退出会话。)")
         nark = input(30000)
        for (var i = 0; i < 2; i++) {
         //错误3次直接退出
          if(!nark || nark == "q" || nark == "Q"){
		    sendText("已退出会话。")
		    return;
	        }
          if (nark.match(strRegex)) {
            bucketSet("jd_cookie", "nolan_addr", nark)
            sendText("已保存。")
            return;   
            } else{
                 sendText("地址格式错误，请重新输入：")
                 nark = input(30000)
          
        }
            
     } 
         sendText("错误次数过多，已退出。")
              return;
        

    } else {
       var value = "q"
    }
    if (value == "q" || value == "Q" || value == "" ) {
        sendText("已退出设置。")
        return;
    } 
}

function blackset() {//拉黑

var blackid = param(1)
var tip = "true"
bucketSet('login_black', blackid, tip)
sendText("用户："+blackid+"，已被拉黑。")

}

function blackdelete() {//解黑

var blackid = param(1)
var tip = "false"
bucketSet('login_black', blackid, tip)
sendText("用户："+blackid+"，已被仁慈的主人解除了拉黑！")

}

function  blackcheck() {//拉黑查询

var blackid = param(1)
var blackchecker = bucketGet("login_black", blackid) //登录黑名单

if (blackchecker=="true" ) {//登录拉黑判断
        sendText("黑名单用户！！！")
        return
    }
else   {  
    
    sendText("未被拉黑。")
}

}

function blackmanager() {//拉黑管理
    var userID = bucketGet("qq", "masters")
    sendText("请在10s内从中选择你要进行的操作：(输入“q”随时退出会话。)\n\n1 . 拉黑\n2 . 解黑\n3 . 拉黑查询\n");
    iii = input(10000)
    if (iii == 1) { //拉黑
        sendText("请30秒内输入拉黑用户id，输入q取消设置。")
        var id = input(30000)
        var tip = "true"
        bucketSet("login_black", id , tip)
        sendText("用户："+id+"，已被拉黑\n\n您也可以直接使用命令“拉黑+用户id” ，进行快捷拉黑操作")
		return;
    } else if (iii == 2) { //关闭maiark登录
        sendText("请30秒内输入解黑用户id，输入q取消设置。")
        var id = input(30000)
        var tip = "false"
        bucketSet("login_black", id , tip)
        sendText("用户："+id+"，已被仁慈的主人解除了拉黑\n\n您也可以直接使用命令“解黑+用户id” ，进行快捷解黑操作")
		return;
    } else if (iii == 3) { //拉黑查询
        sendText("请30秒内输入目标用户id，输入q取消设置。")
        var id = input(30000)
        var blackchecker = bucketGet("login_black", id) //登录黑名单

            if (blackchecker=="true" ) {//登录拉黑判断
                    sendText("黑名单用户！！！\n\n您也可以直接使用命令“拉黑查询+用户id” ，进行快捷拉黑查询操作")
                    return
                }
            else   {  
                
                sendText("未被拉黑。\n\n您也可以直接使用命令“拉黑查询+用户id” ，进行拉黑查询处理")
            }
        
		return;
    } else {
       var value = "q"
    }
    if (value == "q" || value == "Q" || value == "" ) {
        sendText("已退出设置。")
        return;
    } 
}
