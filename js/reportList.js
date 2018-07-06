checkLogin();

$(function () {
    getAccountMessage()
});

function viewReport(orderCode,verifyCode){
    $.ajax({
        url : "/api/quick/print/report/html",
        type : "POST",
        data :JSON.stringify({"userCode":userCode,"orderCode":orderCode,"verifyCode":verifyCode}),
        dataType:"json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success : function(data) {
            var jsonData = JSON.parse(data['plaintext']);
            var result = jsonData.result;
            if(result === 1001){
                var html = jsonData.item;
                // html = html.replace("html.style.fontSize=hWidth/15+'px'","html.style.fontSize='30px'");
                var index = layer.open({
                    type : 1,
                    title : '基本核查报告',
                    shadeClose : false, // 点击遮罩关闭层
                    area : [ '600px', '100%' ],
                    content : html
                });
                layer.full(index);
            }
        },
        error:function () {
            alert('错误');
        }
    });
}
function payOrder(orderCode){
	layer.prompt(function(pwd, index){
	  $.ajax({
	        type : "POST",
	        url : "/api/quick/payOrder",
	        timeout:5000,
	        dataType:"json",
	        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	        data : JSON.stringify({"userCode":userCode,"orderCode":orderCode,"payPwd":pwd}),
	        success : function(data) {
	            var jsonData = JSON.parse(data['plaintext']);
	            console.log(jsonData);
	            if(jsonData.item.result === 4005){
	            	 layer.msg(jsonData.item.resultInfo);
	            	 setTimeout(window.location.reload(), 3000);
	            }else{
	            	layer.msg(jsonData.item.resultInfo);
	            }
	        }
	    });
	  layer.close(index);
	});
}

/**
 * 获取钱包消息
 */
function getAccountMessage() {
    $.ajax({
        url: '/api/quick/get/order/list',
        type: "POST",
        timeout: 5000,
        dataType: "json",
        data: "{\"userCode\":\""+userCode+"\"}",
        success: function (data) {
            var jsonData = JSON.parse(data['plaintext']);
            var result = jsonData.result;
            if (result === 1001) {
                var itemArr = jsonData.item;
                $(itemArr).each(function (index, value) {
                	var time = value.payTime;
                	var reportStr = '<li class="clearfix"><span class="nameSidebar">' + (value.verifyName.length > 2 ? value.verifyName.substring(value.verifyName.length - 2, value.verifyName.length) : value.verifyName)+'</span><div class="content"><h3>'+ value.verifyName+'</h3>';
                	if(value.orderStat === '1'){
	                	if(value.verifyResult === '0'){
	                		reportStr += ' <p class="green">一致</p>'; 
	                	}else{
	                		reportStr += '<p class="red">不一致</p>'; 
	                	}
                	}else{
                		reportStr += ' <p></p>'; 
                	}
                	reportStr += '<p>订单价格：'+value.orderBalance+'元</p></div>'; 
                	reportStr += '<div class="list-right">';
                	if(value.orderStat === '1'){
                		reportStr += '<span onclick="javascript:viewReport('+"'"+$.trim(value.orderCode)+"','"+$.trim(value.verifyCode)+"'"+')">查看</span>';
                	}else{
                		reportStr += '<span class="orange" onclick="payOrder('+"'"+$.trim(value.orderCode)+"'"+')">去付款</span>';
                	}
                	reportStr += '<p>'+time.substring(4, 6) + "-" + time.substring(6, 8) + "&nbsp;&nbsp;" + time.substring(8, 10) + ":" + time.substring(10, 12) +'</p>'
                	reportStr += '</div></li>'
                
                	/*       
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
                        "          </li>"; */
                    $('.list').append(reportStr);
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