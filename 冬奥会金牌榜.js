// 作者QQ1483081359
// [rule: 金牌榜 ] 
// [rule: 冬奥会 ] 
function main() {
    var data = request({ 
        "url": "https://api.shy-jan.xyz/api/%E5%86%AC%E5%A5%A5%E5%A5%96%E7%89%8C%E6%A6%9C.php?type=text" , 
        "method": "get", 
        "dataType": "text" 
    })
  
        sendText(data)



}
main()