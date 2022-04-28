// 联系作者 QQ1483081359
// [rule: ?备案 ] 
// [rule: 备案? ] 
function main() {
    var userID = GetUserID()
	var userName = GetUsername()
    var address = encodeURI(param(1))
    var data = request({ 
        "url": "https://api.lxddais.ltd/api/beian.php/?url=" + address , 
        "method": "get", 
        "dataType": "json" 
    })
    if (data.code == -1) {
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" +"该域名未备案！")
}
else
        sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]" +"\n主办单位：" +data.name+"\n单位性质：" +  data.nature + "\n备案号："+ data.icp+"\n网站名称："+data.sitename+"\n网站首页：" + data.siteindex +"\n审核时间："+data.time+"\n核查地址："+data.img)



}
main()