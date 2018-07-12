$(function () {
    $('#code').html('');
    $('#code').qrcode({
        width: 115,
        height: 115,
        text:api_serve+'/wechat/fastVerification.html?userCode='+userCode
    });
	$(".nextStep").click(function(){
		$(".nextStep").attr('disabled',true);
		$("#deForm").submit(function(e){
			e.preventDefault();
		});
		var verifyName = $("#verifyName").val();
		if(verifyName==null || verifyName==''){
			layerOpen("请输入候选人姓名");
			$("#verifyName").focus();
			$(".nextStep").attr('disabled',false);
			return;
		}
		var verifyMobile = $("#verifyMobile").val();
		if(verifyMobile==null || verifyMobile==''){
			$("#verifyMobile").focus();
			layerOpen("请输入候选人手机号");
			$(".nextStep").attr('disabled',false);
			return;
		}else{
			if(!isValidPhone(verifyMobile)){
				$("#verifyMobile").focus();
				layerOpen("请输入正确的候选人手机号");
				$(".nextStep").attr('disabled',false);
				return;
			}
		}
		var obj = {
			"verifyName":verifyName,
			"verifyMobile":verifyMobile,
			"userCode": userCode
		};
        $.ajax({
        	url:'/api/quick/verifySMS',
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
        		}else if(result === 3001){
        			layerOpen(jsonData.item.resultInfo);
        		}else{
        			layerOpen("申请授权短信发送失败，请稍后重试");        			
        		}
        		$(".nextStep").attr('disabled',false);
        	}
        });
    });
	
	$(".msg-authorize").click(function(){
		$("#basicFormDiv").show();
		$("#qrCodeDiv").hide();
		$(this).addClass('active');
		$('.scan-authorize').removeClass('active');
	});
	
	$(".scan-authorize").click(function(){
		$("#basicFormDiv").hide();
		$("#qrCodeDiv").show();
		$(this).addClass('active');
		$('.msg-authorize').removeClass('active');
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