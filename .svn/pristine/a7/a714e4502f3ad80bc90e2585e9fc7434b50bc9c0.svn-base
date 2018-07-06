$(function () {
    $.ajax({
        url: '/api/quick/get/account/balance',
        type: 'POST',
        timeout: '5000',
        dataType: 'json',
        data: "{\"userCode\":\"" + userCode + "\"}",
        success: function (data) {
            var jsonData = JSON.parse(data['plaintext']).item;
            if (jsonData.result === 1001) {
                $(".balance_first").text(jsonData.balance);
                $(".balance_recharge").text(jsonData.rechargeBalance);
                $(".balance_red").text(jsonData.presentBalance);
            } else {
                layer.open({
                    content: jsonData.resultInfo,
                    btn: '确定'
                });
            }
        },
        error: function (XMLHttpRequest, textStatus) {
            layer.open({
                content: '网络异常，请稍后重试'
                , btn: '确定'
            });
        }
    });
    $.ajax({
        url: '/api/quick/get/account/info',
        type: 'POST',
        timeout: '5000',
        dataType: 'json',
        data: "{\"userCode\":\"" + userCode + "\"}",
        success: function (data) {
            var jsonData = JSON.parse(data['plaintext']).item;
            if (jsonData.result === 1001) {
                var jsonArray = jsonData.accountArray;
                $(jsonArray).each(function (index, value) {
                    var time = value.payTime.substring(0, 4) + "-" + value.payTime.substring(4, 6) + "-" + value.payTime.substring(6, 8)
                        + "&nbsp;&nbsp;" + value.payTime.substring(8, 10) + ":" + value.payTime.substring(10, 12) + ":" + value.payTime.substring(12, 14);
                    var info = (" <li>\n" +
                        "                <div class=\"record_l left\">\n" +
                        "                    <p>" + value.Name + "</p>\n" +
                        "                    <p>" + time + "</p>\n" +
                        "                </div>\n" +
                        "                <div class=\"record_r right\">\n" +
                        "                    " + value.resultBalance + "\n" +
                        "                </div>\n" +
                        "            </li>");
                    $('.infoList').append(info);
                });
            } else {
                layer.open({
                    content: jsonData.resultInfo,
                    btn: '确定'
                })
            }
        },
        error: function (XMLHttpRequest, textStatus) {
            layer.open({
                content: '网络异常，请稍后重试'
                , btn: '确定'
            });
        }

    });


});









