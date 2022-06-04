// [rule: 登录 ] 
//[priority:4294967295]
// 修改ip地址和端口其他不要改

    sendText("maiArk为你服务，请输入11位手机号：(输入“q”随时退出会话。)");
    var num = input(15000);

function main() {
    
	if(!num || num == "q" || num == "Q"){
		sendText("已退出")
		return;
		
	}else{
        sendText("正在获取登录验证码,请耐心等待...");
        
	}
	

	var result = request({
			// 修改ip地址和端口其他不要改
			url: "http://150.158.88.142:8082/getsms?mobile=" + num,
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
			// 修改ip地址和端口其他不要改
			url: "http://150.158.88.142:8082/verify?mobile="+num +"&gsalt=" + gsalt+"&guid="+guid+"&lsid="+lsid+"&smscode="+code,
			"dataType": "json"
		})

    if (!result) {
        sendText("获取超时,请重新申请登录");
        return;
    }

    if (result.ck != undefined) {
        sendText("请在15s内将下面的ck复制后发给我，完成登录！")
        var ck = sendText(result.ck)
        sleep(30000)
        RecallMessage(ck)
        
        

    }else {
        sendText(result.msg);
        return;
    }
}


main()








