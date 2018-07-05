$(function () {
    getAccountMessage()
});

/**
 * 获取钱包消息
 */
function getAccountMessage() {
    $.ajax({
        url: 'http://192.168.1.120:8887/api/quick/get/order/list',
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
                    var time = value.payTime;
                    var verifyName = value.verifyName;
                    var orderStatHtml;
                    if(value.orderStat === '0'){
                        orderStatHtml = "<span class=\"orange\">去付款|￥" + value.orderBalance + "</span>";
                    }else{
                        if(value.verifyResult === '1'){
                            orderStatHtml = "<span class=\"green\">一致</span>";
                        }else{
                            orderStatHtml = "<span class=\"red\">不一致</span>";
                        }
                    }
                    // verifyName,verifyStatus,orderStat,orderBalance
                    var reportList = "<li class=\"clearfix\">\n" +
                        "              <span class=\"nameSidebar\">" + (verifyName.length > 2 ? verifyName.substring(verifyName.length - 2, verifyName.length) : verifyName) + "</span>\n" +
                        "              <div class=\"content\">\n" +
                        "                <h3>" + verifyName + "</h3>\n" +
                        "                <p>付费查</p>\n" +
                        "                <p>订单价格：￥" + value.orderBalance + "元</p>\n" +
                        "              </div>\n" +
                        "              <div class=\"list-right\">\n" +
                        orderStatHtml +
                        "                <p>" + time.substring(4, 6) + "-" + time.substring(6, 8) + "&nbsp;&nbsp;" + time.substring(8, 10) + ":" + time.substring(10, 12) + "</p>\n" +
                        "              </div>\n" +
                        "          </li>";
                    $('.list').append(reportList);
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