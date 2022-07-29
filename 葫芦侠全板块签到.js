//有问题tg频道留言 https://t.me/silly_MaiArk
// [rule:葫芦侠签到]

var qq = GetUserID()
var phone = bucketGet('huluxiatel', qq)
var password = bucketGet('huluxiapwd', qq)

if (!phone||!password) {
    sendText("未保存账号或密码，请根据提示操作！")
    tell()
} else {
    signin()
}


function tell() {
    sleep(1000)
    sendText("请在30秒内输入葫芦侠手机号: ");
    var phone = input(30000);
    var arr = ['q', 'Q', '退出'];
    if (phone && phone.length === 11) {
        bucketSet('huluxiatel', qq, phone)
        sendText("账号已记录\n如需修改请联系管理员")
        ps()
    } else if (arr.indexOf(phone) != -1) {} else {
        sendText("输入有误, 请重新发送葫芦侠签到！");
    }
}

function ps() {
    sendText("请在30秒内输入密码: ")
    password = input(30000);
    sendText("密码已记录\n如需修改请联系管理员")
    bucketSet('huluxiapwd', qq, password)
    sendText("开始签到，请稍候...")
    var arr = ['q', 'Q', '退出'];
    signin()
}



function signin() {
    
	var result = request({
			url: "https://xiaobai.klizi.cn/API/other/hlx_dl.php?key="+password+"&phone="+phone,
            "dataType": "json",
			"timeOut": 60000
		})
	if (result.status==0){
	    sendText("用户名或密码输入错误")
        tell()
        return
	}
	
	try{
	var result1 = request({
			url: "https://xiaobai.klizi.cn/API/other/hlx_qd.php?key="+result._key,
            "dataType": "text"
		})	
    	   sendText(result1) 
	}catch(e){
	    sendText(`签到失败`) 
	}	   
    	   
	    
}


    
    