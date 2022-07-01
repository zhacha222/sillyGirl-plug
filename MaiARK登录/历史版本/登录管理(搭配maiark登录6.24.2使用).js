// [rule: ^登录管理$] 有问题tg频道留言 https://t.me/silly_MaiArk
// [rule: ^登陆管理$] 作者QQ1483081359 转载请保留版权  github仓库：zhacha222/sillyGirljs
// [disable: false] 是否禁用
// [admin: true] 是否只允许管理员使用

/*此js设置未加任何过滤匹配，请认真输入，否则导致傻妞崩溃概不负责。
     本插件 改编自木子李大佬的 命令设置.js 
     搭配6.24.2maiark登录插件使用  摒弃繁琐指令，一键设置其各种参数
*/

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

function main() {
    var userID = bucketGet("qq", "masters")
    sendText("请在10s内从中选择你要设置的参数：(输入“q”随时退出会话。)\n\n1 . 启用maiark登录\n2 . 停用maiark登录\n3 . 打开maiark登录失败通知\n4 . 关闭maiark登录失败通知\n5 . 配置或更改maiark服务地址\n");
    iii = input(10000)
    if (iii == 1) { //启用maiark登录
        var tip = "true"
        bucketSet("jd_cookie", "enable_maiark", tip)
        sendText("已启用maiark登录。")
		return;
    } else if (iii == 2) { //关闭maiark登录
        var tip = "false"
        bucketSet("jd_cookie", "enable_maiark", tip)
        sendText("已关闭maiark登录。")
		return;
    } else if (iii == 3) { //启用maiark登录失败通知
        var tip = "true"
        bucketSet("jd_cookie", "maiark_notify", tip)
        sendText("已启用maiark登录失败通知。")
		return;
    }else if (iii == 4) { //关闭maiark登录失败通知
        var tip = "false"
        bucketSet("jd_cookie", "maiark_notify", tip)
        sendText("已关闭maiark登录失败通知。")
		return;
    }  else if (iii == 5) { //更改maiark服务地址
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
        

    } else {
       var value = "q"
    }
    if (value == "q" || value == "Q" || value == "" ) {
        sendText("已退出设置。")
        return;
    } 
}
main()
