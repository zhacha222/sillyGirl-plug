// 作者QQ1483081359
// [rule: 小说 ]

function main() {
sendText("请在15内输入小说名字或关键词：")
    var name = input(15000)
    if (name == "") {
        return sendText("操作超时，已退出会话。")
    }
    if (name == "q") {
        return sendText("已退出会话。")
    }
    var content = request({
        url: "https://xiaobai.klizi.cn/API/other/novel.php?msg="  + name + "&n=",
        "dataType": "text"
    })
    if (content == "") {
        return sendText("抱歉，无此小说资源！")
}
else
    sendText("请输入需要查找的小说序号：\n\n"+content)
    var num = input(15000)
    if (num == "") {
        return sendText("操作超时，已退出会话。")
    }
    if (num == "q") {
        return sendText("已退出会话。")
    }
    sendText("正在从全网搜寻中，请稍候~")
    var data = request({
        url: "https://xiaobai.klizi.cn/API/other/novel.php?msg="  + name + "&n="+num,
        "dataType": "json"
    })
    console.log(data)
    var ti = data.title
    var author = data.author
    var img = data.img
    var download = data.download
    var js = data.js
    
     if (ti != "") {
        return sendText("【书名】：《" + ti + "》"+"\n【作者】：" + author + "\n【简介】：" + js +"\n【下载地址】：" + download +image(img))
}
else
    sendText("网络不好，请重新获取！")
    
}    
   
    
 main()
