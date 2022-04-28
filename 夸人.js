// 作者QQ1483081359
// [rule: 夸我 ]

main()



function main() {
    var data1 = request({ 
        "url": "https://apii.bingyue.xyz/api/kryl/api.php" , 
        "method": "get", 
        "dataType": "text" 
    })
   var data2 = request({ 
        "url": "https://apii.bingyue.xyz/api/kryl/api.php" , 
        "method": "get", 
        "dataType": "text" 
    })
    var data3 = request({ 
        "url": "https://apii.bingyue.xyz/api/kryl/api.php" , 
        "method": "get", 
        "dataType": "text" 
    })
 
        
    sendText(data1)
    sendText(data2)
    sendText(data3)
    
}

  
main()

