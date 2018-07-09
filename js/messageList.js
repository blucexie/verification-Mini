checkLogin();
//请求数据起始下标
var pageStart = 0;
//请求size
var pageSize = 10;
//是否可以下拉加载
var canLoadMore = true;
//tab下标
var position = 0;
$(function () {
    getMessage('/quick/get/account/message');
    $('.infoTab>div').click(function () {
        pageStart = 0;
        canLoadMore = true;
        $('.infoList').find('li').remove();
        $('.infoTab>div').find('*').attr('class', '');
        $(this).find('*').attr('class', 'active');
        if (userCode == undefined) return;
        if ($(this).find('p').text() === '核验消息') {
            position = 1;
        } else {
            position = 0;
        }
        getMessage();

    });

    $(window).scroll(function () {
        if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
            if (canLoadMore) {
                getMessage();
            }
        }
    });
});

function redirectRecharge() {
    window.location.href='recharge.html';
}

function redirectReportList() {
    window.location.href='reportList.html';
}
/**
 * 获取消息
 */
function getMessage() {

    var url = position === 0 ? '/quick/get/account/message' : '/quick/get/verify/message';
    $.ajax({
        url: '/api' + url,
        type: "POST",
        timeout: 5000,
        dataType: "json",
        data: '{"userCode":"' + userCode + '","pageStart":"' + pageStart + '","pageSize":"' + pageSize + '"}',
        success: function (data) {
            var jsonData = JSON.parse(data['plaintext']);
            var result = jsonData.result;
            if (result === 1001) {
                var itemCount = jsonData.itemCount;
                if(itemCount === 0){
                    $('.noData').addClass('active');
                    return;
                }else{
                    $('.noData').removeClass('active');
                }
                var itemArr = jsonData.item;
                if (itemArr.length < pageSize) {
                    canLoadMore = false;
                }
                $(itemArr).each(function (index, value) {
                    var time = value.updateTime;
                    var accountMessageList = "<li>\n";
                        accountMessageList +="<div class=\"date\">\n";
                        accountMessageList +="<p>" + time.substring(4, 6) + "-" + time.substring(6, 8) + "</p>\n";
                        accountMessageList +="</div>\n";
                        accountMessageList +="<div class=\"consume\" ";
                        position === 0 ?accountMessageList +="onclick='javascript:redirectRecharge()'":accountMessageList +="onclick='javascript:redirectReportList()'";
                        accountMessageList +=">\n";
                        accountMessageList +="<h2>" + value.messageTitle + "</h2>\n";
                        accountMessageList +="<p class=\"time\">" + time.substring(8, 10) + ":" + time.substring(10, 12) + "</p>\n";
                        accountMessageList +="<p class=\"describe\">" + value.messageContent + "</p>\n";
                        accountMessageList +="</div>\n";
                        accountMessageList +="</li>";
                    $('.infoList').append(accountMessageList);
                });

            }
        }
        ,
        error: function (XMLHttpRequest, textStatus) {
            layer.open({
                content: '网络异常，请稍后重试'
                , btn: '确定'
            });
        }
    });
}