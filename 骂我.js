// 作者QQ1483081359
// [rule: 骂人 ] 
// [rule: 骂我 ] 
function main() {
    var data = request({ 
        "url": "http://api.ovooa.cn/apis/zang.php" , 
        "method": "get", 
        "dataType": "text" 
    })
   
        sendText(data)



}
main()