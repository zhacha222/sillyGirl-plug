//2022.7.31修复版 有问题tg频道留言 https://t.me/silly_MaiArk
// [rule: 推新番 ]

var request = require("request");
var time = new Date();
var mon = new Date().getMonth() + 1;
if (mon < 10) {
    mon = "0" + mon;
}
option = {
    "method": "get",
    "url": `https://www.141jav.com/date/${time.getFullYear()}/${mon}/${time.getDate()-1}`,
    //"url": `https://www.141jav.com/date/2022/07/29`,
    "header": {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36 Edg/86.0.622.56",
    }
}

request(option, (error, response, body) => {
    try{
    if (!error && response.statusCode == 200) {
        var body = body.replace(/\n/g, "")  //过滤换行符
        // 获取全部的封面、标题、描述、magnets
        var covers = body.match(/<div class="column"><img class="image" src="(.*?)"/g)
        var titles = body.match(/<h5 class="title is-4 is-spaced">(.*?)<\/h5>/g)
        var desps = body.match(/<p class="level has-text-grey-dark">(.*?)<\/p>/g)
        var magnets = body.match(/title="Download .torrent" href="(.*?)"/g)

        for (i = 0; i < covers.length; i++){
            var title = titles[i].replace(/<h5 class="title is-4 is-spaced"><a href="(.*?)">/, "").replace('</a><span class="is-size-6 has-text-grey">', " ").replace('</span></h5>', '');
            var desp = `『描述』：`+desps[i].match(/<p class="level has-text-grey-dark">(.*?)<\/p>/)[1];
            var cover = image(covers[i].match(/src="(.*?)"/)[1]);
            var magnet = magnets[i].match(/href="(.*?)"/)[1]
            // console.log(item);
            sendText(`共上新${covers.length}条内容，第${i+1}条：\n\n『标题』：${title}\n${desp}\n『BT种子下载』：\nhttps://www.141jav.com${magnet}\n${cover}\n`)
        }
    } else {
        sendText(error)
    }
    }catch(e){
       sendText(`当前暂无新番`) 
    }
})
