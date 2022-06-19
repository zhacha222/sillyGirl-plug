// [rule: 登录 ] 
// [rule: 登陆 ] 
// [priority:924703993]
// [disable: false] 是否禁用
// [admin: false] 是否只允许管理员使用
//作者QQ1483081359 转载请保留版权  github仓库：zhacha222/sillyGirljs
//傻妞和MaiARK都要对接青龙
//傻妞可以对接多个青龙，但是要设置一个聚合容器
//MaiARK只需要对接 傻妞聚合的那个青龙就行了 
//可以实现直接登录查询，不需要再复制ck发送给机器人，和对接Nolan的效果一样 

//6.6更新 适配QQ，微信，TG，微信公众号 全平台登录
//6.7更新 修复部分人GetImType()报错，修复登录时显示获取超时但实际上有收到短信的bug 
//6.9更新 新增 登录后更新查询数据中的【登录时长】，修复部分人登录立即查询提示过期的现象
//6.12更新 增加手机号初步筛选，防止叼毛钓鱼使MaiARK频繁请求导致黑ip
//6.18更新 修复手机号初步筛选的逻辑bug

    var addr = "http://xxx.xxx.xx.xxx:8082"
    //这修改成自己MaiARK的ip地址和端口
    //最后面不要带“/” ，不然会出错！
    //只要修改这一处就行了，其他不懂就不要乱改！！！
     
    var user = GetUserID()
    sendText("MaiARK为你服务，请输入11位手机号：(输入“q”随时退出会话。)");
    var num = input(20000)
    
    
function main() {
    
    if (!num.match(/^[1][3,4,5,6.7,8,9][0-9]{9}$/)) {
 
     for (var i = 0; i < 4; i++) {
         //错误4次直接退出
     
       if(!num || num == "q" || num == "Q"){
		  sendText("已退出会话。")
		  return;
	    }
	    if(num.match(/^[1][3,4,5,6.7,8,9][0-9]{9}$/)){
		  sendText("正在获取登录验证码,请耐心等待...")
		  return getcode()
	    }
        else{
          sendText("请输入正确的手机号：")
          num = input(20000)
          	//默认等待20s,不够自己改
        }
        
     }
     
        sendText("输入错误次数过多，已退出。")
        return;
   }
        else{
        sendText("正在获取登录验证码,请耐心等待...")
        getcode()
        
	    }
	    
}

function getcode() {

	var result = request({
			url: addr +"/getsms?mobile=" + num,
			"dataType": "json"
		})

    if (!result) {
        
        sendText("获取验证码超时，请尝试重新登录，或检查MaiARK配置！");
        //如果这里登录时返回这个内容，请检查自己的MaiARK是否正常
        return;
    }


    if (result.code == 0) {
        sendText("请输入短信验证码：")
        LoginJD(result);
    } else {
        sendText(result.msg)
        return;
    }
}


function LoginJD(result) {
	var gsalt = result.gsalt
	var guid = result.guid
	var lsid = result.lsid
	code = input(30000);
	//默认等待30s,不够自己改
	if(!code || code == "q" || code == "Q"){
	    sendText("已退出会话。");
	    return;
	}

	var result1 = request({
			url: addr +"/verify?mobile="+num +"&gsalt=" + gsalt+"&guid="+guid+"&lsid="+lsid+"&smscode="+code,
			"dataType": "json"
		})

    if (!result1) {
       sendText("登录超时,请重新申请登录");
        return;
    }
    if (result1.msg == "您的账号存在安全风险，请使用其他方式登录") {
       sendText("您的账号存在安全风险，请手动登录一次京app解除风险!");
        return;
    }
    if (result1.msg == "验证码输入错误") {
       sendText("验证码错误,请重新登录");
        return;
    }

    if (result1.ck != undefined) {
    
    var rule = /[^;]+;pt_pin=(.*);$/
    var ck = result1.ck
    var ckpin = rule.exec(ck)
    var jj = ckpin[1]
    var pin = encodeURI(jj)
    sillyGirl.Session(ck)
    
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
    else {
        sendText(result1.msg + "，请重新登录！");
        return;
    }
}


main()




