// [rule: 菜单] 
// [rule: 菜单管理]
// [admin: true]
// github仓库：zhacha222/sillyGirljs
// 有问题tg频道留言 https://t.me/silly_MaiArk

let right = ""
let left = ""
let str = ""
let menutext = ""
let n = ""
let menuStr = ""

var GetContent=GetContent()
try{
    var menu1 = bucketGet("sillyGirl", "menu")
    str=JSON.parse(menu1)}catch(e){str = []}

function choose(){ //命令筛选

    
    if(GetContent=="菜单"){
        
     menu()   
        
    }else if (GetContent=="菜单管理"){
        if (isAdmin) {
        	manager()
    	    }
    	return;
        
    }
}

function manager()  { 

    for(var i=0,j=1;i<str.length;i++,j++){
        
        for (var key in str[i]) {
            
            menutext += j+'.' + key + ` - ` + str[i][key]+`\n`
        }

    }
    sendText(`请选择对象进行编辑：(-删除指令，0增加指令，q退出, wq保存)\n`+menutext)
     msg=input()
    
    if(msg==0){
        
     add()
     return manager()
        
    }else if (0>msg&&msg>-j){
        
     n = msg.split(`-`)[1] -1
     del()  
     return manager()
        
    }else if (msg == "q" || msg == "Q" || msg == "" ) {
        sendText("已退出设置。")
        return;
    }else if (msg == "wq" ) {
        bucketSet("sillyGirl", "menu", JSON.stringify(str))
        sendText("已保存修改")
        return;
    }else {
        sendText('指令错误，请重新输入：')
        sleep(600)
        menutext = ""
        return manager()
    }

}


function add(){

    sendText(`请输入新增指令名称：`);
    var order = input();
    sendText(`请输入用法示例：`);
    var answer = input();
    datar = {"name": ""}
    var new_key = order
    var old_key = "name"
    datar.name = answer
    datar[new_key] = datar[old_key];
    delete datar[old_key];
    str.push(datar)
    menutext = ""

}

function del(){

    str.splice(n,1)
    menutext = ""

}



function menu() {
    var aa = bucketGet("sillyGirl", "menu")
    var menu=JSON.parse(aa)
    var menuStr = "" 
    var max = 6;
    //排序菜单多在下少在上
    var len = menu.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            // 相邻元素两两对比，元素交换，大的元素交换到后面
            var key1;
            var key2;
            for (key1 in menu[j]) {  
            }
            for (key2 in  menu[j + 1]) {  
            }
            if (key1.length > key2.length) {
                var temp = menu[j];
                menu[j] = menu[j + 1];
                menu[j + 1] = temp;
            }
        }
    }
    //获取最大长度
    for (const key in menu[menu.length - 1]) {
        if (key.length >= max) {
            max = key.length + 1;
        }
    }
    for (let index = 0; index < max; index++) {
        if (index == Math.floor(max / 2)) {
            menuStr += "—机器人菜单—";
        } else {
            menuStr += "—";
        }
    }
    menuStr += "\n";
    for (let index = 0; index < max; index++) {
        if (index == Math.floor(max / 2)) {
            menuStr += "右面为用法示例";
        } else {
            menuStr += "—";
        }
    }
    menuStr += "\n";
    menu.forEach(item => {
        for (const key in item) {
             left = key;
             right = item[key];
            if (key.length < max) {
                for (let index = 0; index < max - key.length; index++) {
                    left += "—";
                }
            }
            menuStr += left + right + "\n"
        }
    });
    
    sendText(menuStr)
    return 
}

choose()
