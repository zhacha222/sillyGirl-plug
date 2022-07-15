// 作者QQ1483081359
// [rule: 骂人 ] 
// [rule: 骂我 ] 

function main() {
    var data1 = request({ 
        "url": "http://api.ovooa.cn/apis/zang.php" , 
        "method": "get", 
        "dataType": "text" 
    })
   var data2 = request({ 
        "url": "http://api.ovooa.cn/apis/zang.php" , 
        "method": "get", 
        "dataType": "text" 
    })
    var data3 = request({ 
        "url": "http://api.ovooa.cn/apis/zang.php" , 
        "method": "get", 
        "dataType": "text" 
    })
    var data4 = request({ 
        "url": "http://api.ovooa.cn/apis/zang.php" , 
        "method": "get", 
        "dataType": "text" 
    })
    var data5 = request({ 
        "url": "http://api.ovooa.cn/apis/zang.php" , 
        "method": "get", 
        "dataType": "text" 
    })
     var data6 = request({ 
        "url": "http://api.ovooa.cn/apis/zang.php" , 
        "method": "get", 
        "dataType": "text" 
    })
    var data7 = request({ 
        "url": "http://api.ovooa.cn/apis/zang.php" , 
        "method": "get", 
        "dataType": "text" 
    })
    var data8 = request({ 
        "url": "http://api.ovooa.cn/apis/zang.php" , 
        "method": "get", 
        "dataType": "text" 
    })
    var data9 = request({ 
        "url": "http://api.ovooa.cn/apis/zang.php" , 
        "method": "get", 
        "dataType": "text" 
    })
        
    var id1 = sendText(data1)
     var id2 = sendText(data2)
      var id3 = sendText(data3)
       var id4 = sendText(data4)
    var id5 = sendText(data5)
    var id6 = sendText(data6)
    var id7 = sendText(data7)
    var id8 = sendText(data8)
    var id9 = sendText(data9)
    
   
sleep(4000)
    
RecallMessage(id1)
RecallMessage(id2)
RecallMessage(id3)
RecallMessage(id4)
RecallMessage(id5)
RecallMessage(id6)
RecallMessage(id7)
RecallMessage(id8)
RecallMessage(id9)


}

  
main()

