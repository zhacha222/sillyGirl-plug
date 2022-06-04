// [rule: 登录 ] 
//[priority:924703993]
// [disable: false] 是否禁用
//作者QQ1483081359 

    var addr = "http://150.158.88.142:8082"
    //这修改成自己MaiARK的ip地址和端口
    //最后面不要带“/” ，不然会出错！
    //只要修改这一处，其他不要改！！！
    
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
    bucketSet('pinQQ', resuilt, qq)
    
    sendText("上车成功。")
    notifyMasters(`${GetUsername()} ，添加成功。`)   
        

    }else {
        sendText(result.msg);
        return;
    }
}


main()





