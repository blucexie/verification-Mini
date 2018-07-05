$(function () {
    getAccountMessage()
});

/**
 * 获取核验消息
 */
function getVerifyMessage() {
    $.ajax({
        url: 'http://192.168.1.120:8887/api/quick/get/verify/message',
        type: "POST",
        timeout: 5000,
        dataType: "json",
        data: "{\"userCode\":\"5b16379d23847512ddc02597\"}",
        success: function (data) {
            var jsonData = JSON.parse(data['plaintext'])
            var result = jsonData.item;
            console.log(result)
            // var accountMessageList;
            // if(result === 1001){
            //     var itemArr = jsonData.item;
            //     $(itemArr).each(function (index,value) {
            //         var time = value.updateTime;
            //         accountMessageList = ("<li>\n" +
            //             "                <div class=\"date\">\n" +
            //             "                    <p>"+time.substring(4,6)+"-"+time.substring(6,8)+"</p>\n" +
            //             "                </div>\n" +
            //             "                <div class=\"consume\">\n" +
            //             "                    <h2>"+value.messageTitle+"</h2>\n" +
            //             "                    <p class=\"time\">"+time.substring(8,10)+":"+time.substring(10,12)+"</p>\n" +
            //             "                    <p class=\"describe\">"+value.messageContent+"</p>\n" +
            //             "                </div>\n" +
            //             "            </li>");
            //         $('.infoList').append(accountMessageList);
            //     });
            //
            // }
        }
    });
}

/**
 * 获取钱包消息
 */
function getAccountMessage() {
    $.ajax({
        url: 'http://192.168.1.120:8887/api/quick/get/account/message',
        type: "POST",
        timeout: 5000,
        dataType: "json",
        data: "{\"userCode\":\"5b16379d23847512ddc02597\"}",
        success: function (data) {
            var jsonData = JSON.parse(data['plaintext'])
            var result = jsonData.result;
            if (result === 1001) {
                var itemArr = jsonData.item;
                $(itemArr).each(function (index, value) {
                    var time = value.updateTime;
                    var accountMessageList = ("<li>\n" +
                        "                <div class=\"date\">\n" +
                        "                    <p>" + time.substring(4, 6) + "-" + time.substring(6, 8) + "</p>\n" +
                        "                </div>\n" +
                        "                <div class=\"consume\">\n" +
                        "                    <h2>" + value.messageTitle + "</h2>\n" +
                        "                    <p class=\"time\">" + time.substring(8, 10) + ":" + time.substring(10, 12) + "</p>\n" +
                        "                    <p class=\"describe\">" + value.messageContent + "</p>\n" +
                        "                </div>\n" +
                        "            </li>");
                    $('.infoList').append(accountMessageList);
                });

            }
        }
        // ,
        // error: function (XMLHttpRequest, textStatus) {
        //     layer.open({
        //         content: '网络异常，请稍后重试'
        //         ,btn: '确定'
        //     });
        // }
    });
}