checkLogin();

//请求数据起始下标
var pageStart = 0;
//请求size
var pageSize = 10;
//是否可以下拉加载
var canLoadMore = true;
$(function () {
    getReportList();
    //下拉到底部监听
    $(window).scroll(function () {
        if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
            if (canLoadMore) {
                getReportList();
                pageStart+=pageSize;
            }
        }
    })
});

function viewReport(orderCode,verifyCode){
    var index = layer.open({
        type: 2,
        maxmin: false,
        content: 'reportHtml.html?orderCode='+orderCode+'&verifyCode='+verifyCode
    });
    layer.full(index);


    // $.ajax({
    //     url : "/api/quick/get/report/html",
    //     type : "POST",
    //     data :JSON.stringify({"userCode":userCode,"orderCode":orderCode,"verifyCode":verifyCode}),
    //     dataType:"json",
    //     contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    //     success : function(data) {
    //         var jsonData = JSON.parse(data['plaintext']);
    //         console.log(jsonData);
    //         var result = jsonData.result;
    //         if(result === 1001){
    //             var html = jsonData.item;
    //             console.log(html);
    //             // html = html.replace("html.style.fontSize=hWidth/15+'px'","html.style.fontSize='30px'");
    //             layer.open({
    //                 type: 1,
    //                 content: html,
    //                 anim: 'scale',
    //                 style: 'position:fixed; bottom:0; left:0; width: 100%; height: 100%; padding:10px 0; border:none;'
    //             });
    //
    //             // var index = layer.open({
    //             //     type : 1,
    //             //     title : '基本核查报告',
    //             //     shadeClose : false, // 点击遮罩关闭层
    //             //     area : [ '600px', '100%' ],
    //             //     content : "<html>"+html+"</html>"
    //             // });
    //             // layer.full(index);
    //         }
    //     },
    //     error:function () {
    //         alert('错误');
    //     }
    // });
}
function payOrder(orderCode){
    layer.prompt({
        formType:1,
        title: '请输入支付密码',
        // value: '初始值',
        // area: ['800px', '350px'], //自定义文本域宽高
        yes: function(index,layero){
            var password = layero.find(".layui-layer-input").val();
            if( password=== ''){
                layer.msg('请输入密码');
                return;
            }
            $.ajax({
                type : "POST",
                url : "/api/quick/payOrder",
                timeout:5000,
                dataType:"json",
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                data : JSON.stringify({"userCode":userCode,"orderCode":orderCode,"payPwd":password}),
                success : function(data) {
                    var jsonData = JSON.parse(data['plaintext']);
                    console.log(jsonData);
                    if(jsonData.item.result === 4005){
                        layer.msg(jsonData.item.resultInfo);
                        setTimeout(window.location.reload(), 3000);
                        layer.close(index);
                    }else{
                        layer.msg(jsonData.item.resultInfo);
                        layero.find(".layui-layer-input").val('')
                    }
                }
            });
        }
    });
    $('.layui-layer-input').attr('maxlength','6');
}

/**
 * 获取报告列表
 */
function getReportList() {
    $.ajax({
        url: '/api/quick/get/order/list',
        type: "POST",
        timeout: 5000,
        dataType: "json",
        data: "{\"userCode\":\""+userCode+"\",\"pageStart\":\""+pageStart+"\",\"pageSize\":\""+pageSize+"\"}",
        success: function (data) {
            var jsonData = JSON.parse(data['plaintext']);
            var result = jsonData.result;
            if (result === 1001) {
                var itemCount = jsonData.itemCount;
                if(itemCount === 0){
                    $('.noData').addClass('active');
                    return;
                }
                var itemArr = jsonData.item;
                if(itemArr===undefined||itemArr.length<pageSize){
                	canLoadMore = false;
				}
                $(itemArr).each(function (index, value) {
                	var time = value.payTime;
                	var reportStr = '<li class="clearfix"><span class="nameSidebar">' + (value.verifyName.length > 2 ? value.verifyName.substring(value.verifyName.length - 2, value.verifyName.length) : value.verifyName)+'</span><div class="content"><h3>'+ value.verifyName+'</h3>';
                	if(value.orderStat === '1' || value.orderStat === '2'){
	                	if(value.verifyResult === '1'){
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