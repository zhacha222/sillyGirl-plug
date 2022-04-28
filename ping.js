// 作者QQ1483081359
// [rule: 测速 ? ]
// [rule：测速?]
// [rule: ^ping (.*)$ ]
// [rule: ^ping(.*)$ ]

function main() {
    var userID = GetUserID()//发送人用户id
	var userName = GetUsername()
    var address = param(1)
    var content = request({ 
        "url": "https://api.kit9.cn/api/measurement/?host="+address , 
        "method": "get", 
        "dataType": "json" 
    })
    if (content.code == 202) {
        return sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]\n" + "该网站未解析！")
}
else
    
    sendText("[CQ:at,qq=" + userID + ",text=@" + userName + "]" +"\n查询网址：" + address +"\nIP：" +content.data.ip+"\nIP地址：" +  content.data.location + "\n最小延迟："+ content.data.ping_time_min+"\n平均延迟："+content.data.ping_time_avg+"\n最大延迟：" + content.data.ping_time_max +"\n归属地："+content.data.node)

}


main()