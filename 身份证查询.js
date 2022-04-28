// 作者QQ1483081359
// 该项目仅供个人学习参考，请您务必在下载后24小时内删除，请勿用于违法活动，此项目造成的一切后果与作者无关！
// [rule: 身份证 (.*)$ ]
// [rule: 身份证(.*)$ ]
// [rule: 身份证? ]
function main() {
    var number = encodeURI(param(1))
    var data = request({ 
        "url": "https://yuanxiapi.cn/api/idcard/?number=" + number , 
        "method": "get", 
        "dataType": "json" 
    })
    if (data.code == 200) {
        return sendText("\n姓名：???" + "\n性别："+ data.sex+"\n出生日期："+data.time+"\n年龄：" + data.age +"\n生肖："+data.animal+"\n星座："+data.sign+"\n户籍地区：" +  data.add )
}
else
       
sendText("身份证号有误！") 


}
main()