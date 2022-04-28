// 联系作者 QQ1483081359
// [rule: 查快递 ]
function main() {
    sendText("请输入在15s内输入快递单号，按q退出：")
    var num = input(15000)
    if (num == "") {
        return sendText("操作超时，已退出会话。")
    }
    if (num == "q") {
        return sendText("已退出会话。")
    }
    sendText("正在查询，请稍侯~")
    var data = request({ 
        "url": "https://wanghun.top/api/yh/kd.php?msg=" + num , 
        "method": "get", 
        "dataType": "text" 
    })
    a = sendText(data)
    sleep(7000)
    RecallMessage(a)

}
main()