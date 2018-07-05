$(function () {
	$(".nextStep").click(function(){
		$("#deForm").submit(function(e){
			e.preventDefault();
		});
		var verifyName = $("#verifyName").val();
		if(verifyName==null || verifyName==''){
			layerOpen("请输入候选人姓名");
			$("#verifyName").focus();
			return;
		}
		var verifyMobile = $("#verifyMobile").val();
		if(verifyMobile==null || verifyMobile==''){
			$("#verifyMobile").focus();
			layerOpen("请输入候选人手机号");
			return;
		}else{
			if(!isValidPhone(verifyMobile)){
				$("#verifyMobile").focus();
				$("#verifyMobile").val("");
				layerOpen("请输入正确的候选人手机号");
				return;
			}
		}
		var obj = {
			"verifyName":verifyName,
			"verifyMobile":verifyMobile,
			"userCode":"5b16379d23847512ddc02597"
		};
        $.ajax({
        	url:'http://192.168.1.152:8887/api/quick/verifySMS',
        	type: "POST",
        	timeout:5000,
        	dataType:"json",
        	data:JSON.stringify(obj),
        	success: function (data) {
        		var jsonData = JSON.parse(data['plaintext'])
        		var result = jsonData.item.result;
        		if(result === 2001){
        			layerOpen(jsonData.item.resultInfo);
        			$("#verifyName").val("");
        			$("#verifyMobile").val("");
        		}else{
        			layerOpen("申请授权短信发送失败，请稍后重试");
        		}
        	}
        });
    });
	
	$(".msg-authorize").click(function(){
		$("#basicFormDiv").show();
		$("#qrCodeDiv").hide();
	});
	
	$(".scan-authorize").click(function(){
		$("#basicFormDiv").hide();
		$("#qrCodeDiv").show();
	});
});

/**
 * 获取核验消息
 */
function layerOpen(msg) {
	layer.open({
        content: msg
        ,btn: '确定'
    });
}