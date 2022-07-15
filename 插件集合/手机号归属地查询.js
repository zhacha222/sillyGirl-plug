// 作者QQ1483081359
// 该项目仅供个人学习参考，请您务必在下载后24小时内删除，请勿用于违法活动，此项目造成的一切后果与作者无关！
// [rule: 手机号 (.*)$ ]
// [rule: 手机号(.*)$ ]
// [rule: 手机号? ]
function main() {
    var telnumber = encodeURI(param(1))
    var data = request({ 
        "url": "https://api.iyk0.com/tel/?tel=" + telnumber , 
        "method": "get", 
        "dataType": "json" 
    })
    if (data.code == 200) {
        return sendText("\n手机号：" + data.tel+"\n"+data.local+"\n" + data.duan +"\n"+data.type+"\n"+data.yys+"\n" +  data.bz )
}
else
       
sendText("该手机号无数据或者手机号有误！") 


}
main()
