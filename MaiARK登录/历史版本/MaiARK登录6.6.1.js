// [rule: 登录 ] 
// [rule: 登陆 ] 
// [priority:924703993]
// [disable: false] 是否禁用
//作者QQ1483081359 转载请保留版权  github仓库：zhacha222/sillyGirljs
//傻妞和MaiARK都要对接青龙
//傻妞可以对接多个青龙，但是要设置一个聚合容器
//MaiARK只需要对接 傻妞聚合的那个青龙就行了 
//可以实现直接登录查询，不需要再复制ck发送给机器人，和对接Nolan的效果一样 

//登录后由于数据同步不及时，立即查询会提示账号过期，需要等待一分钟左右等数据同步后，查询才会有数据
//6.6更新 适配QQ，微信，TG，微信公众号 全平台登录


    var addr = "http://xxx.xxx.xx.xxx:8082"
    //这修改成自己MaiARK的ip地址和端口
    //最后面不要带“/” ，不然会出错！
    //只要修改这一处就行了，其他不懂就不要改！！！
    
    var s = Sender
    var qq = GetUserID()
    sendText("MaiARK为你服务，请输入11位手机号：(输入“q”随时退出会话。)");
    var num = input(15000);

function main() {
     
	if(!num || num == "q" || num == "Q"){
		sendText("已退出")
		return;
		 
	}else{
        sendText("正在获取登录验证码,请耐心等待...");
        
	}
	

	var result = request({
			url: addr +"/getsms?mobile=" + num,
			"dataType": "json"
		})

    if (!result) {
        sendText("无法获取验证码，请更换账号，或通过其他方式登录。");
        return;
    }


    if (result.code == 0) {
        sendText("获取验证码成功！")
    
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
	sendText("请输入短信验证码：")
	code = input(30000);
	if(!code || code == "q" || code == "Q"){
	    sendText("已退出");
	    return;
	}

	var result = request({
			url: addr +"/verify?mobile="+num +"&gsalt=" + gsalt+"&guid="+guid+"&lsid="+lsid+"&smscode="+code,
			"dataType": "json"
		})

    if (!result) {
        sendText("获取超时,请重新申请登录");
        return;
    }

    if (result.ck != undefined) {
        
    var rule = /[^;]+;pt_pin=(.*);$/
    var ck = result.ck
    var pin = rule.exec(ck)
    var resuilt = pin[1]
   sendText(resuilt)
    
    if (s.GetImType() == "qq" ) {
    bucketSet('pinQQ', resuilt, qq)
    sendText("上车成功。")
    notifyMasters(`${GetUsername()} ，添加成功。`)   
    return;
     } 
     if (s.GetImType() == "wx" ) {
    bucketSet('pinWX', resuilt, qq)
    sendText("上车成功。")
    notifyMasters(`${GetUsername()} ，添加成功。`)   
    return;
     }
     if (s.GetImType() == "wxmp" ) {
    bucketSet('pinWXMP', resuilt, qq)
    sendText("上车成功。")
    notifyMasters(`${GetUsername()} ，添加成功。`)   
    return;
     }
     else if (s.GetImType() == "tg" ) {
    bucketSet('pinTG', resuilt, qq)
    sendText("上车成功。")
    notifyMasters(`${GetUsername()} ，添加成功。`)   
    return;
     } 
        

    }else {
        sendText(result.msg + "，请重新登录！");
        return;
    }
}


main()


