checkLogin();
$(function () {
    getMessage('/quick/get/account/message');
    $('.infoTab>div').click(function () {
        $('.infoTab>div').find('*').attr('class','');
        $(this).find('*').attr('class','active');
        if (userCode == undefined ) return;
        if($(this).find('p').text() === '核验消息'){
            getMessage('/quick/get/verify/message');
        }else{
            getMessage('/quick/get/account/message');
        }

    });
});

/**
 * 获取钱包消息
 */
function getMessage(url) {
    $('.infoList').find('li').remove();
    $.ajax({
        url: '/api'+url,
        type: "POST",
        timeout: 5000,
        dataType: "json",
        data: '{"userCode":"'+userCode+'"}',
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
        ,
        error: function (XMLHttpRequest, textStatus) {
            layer.open({
                content: '网络异常，请稍后重试'
                ,btn: '确定'
            });
        }
    });
}