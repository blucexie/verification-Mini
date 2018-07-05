$(function () {
	$(".nextStep").click(function(){
		$("#deForm").submit(function(e){
			e.preventDefault();
		});
		var date = new Date();
		var year = date.getFullYear();
		var mon = date.getMonth() + 1;
		var da = date.getDate();
		if (mon >= 10) {
			mon = mon;
		} else {
			mon = "0" + mon;
		}
		if (da >= 10) {
			da = da;
		} else {
			da = "0" + da;
		}
		var myDate = year + '/' + mon + '/' + da;
		/* 获取用户姓名 */
		var verifyName = $("#verifyName").val();
		if(verifyName==null || verifyName==''){
			layerOpen("请输入您的姓名");
			$("#verifyName").focus();
			return;
		}
		/* 获取身份证号码 */
		var verifyIdCard = $("#verifyIdCard").val();
		if(verifyIdCard==null || verifyIdCard==''){
			$("#verifyIdCard").focus();
			layerOpen("请输入您的身份证号码");
			return;
		}else{
			if(!checkICCard(verifyIdCard)){
				$("#verifyIdCard").focus();
				$("#verifyIdCard").val("");
				layerOpen("您的身份证号码输入有误，请重新输入");
				return;
			}
		}
		/* 获取手机号码 */
		var verifyMobile = $("#verifyMobile").val();
		if(verifyMobile==null || verifyMobile==''){
			$("#verifyMobile").focus();
			layerOpen("请输入您的手机号");
			return;
		}else{
			if(!isValidPhone(verifyMobile)){
				$("#verifyMobile").focus();
				$("#verifyMobile").val("");
				layerOpen("您的手机号输入有误，请重新输入");
				return;
			}
		}
		/* 获取签名 */
	    var resumeSignURL;
        var imgURL = $('.nameSpace img').attr('src');
        if(imgURL){
            resumeSignURL = imgURL.slice(22);
        }else{
            inputObject = $(this);
            layerOpen("请签名");
            return false;
        }
		var obj = {
			"authenCode":"5b16379d23847512ddc02597",
			"quickVerifyInfo":{
				"verifyName":verifyName,
				"verifyMobile":verifyMobile,
				"verifyIdCard":verifyIdCard,
			},
			"signInfo":{
                resumeSignURL:resumeSignURL,
                resumeSignTime:myDate.split("/").join("")
            }
		};
        $.ajax({
        	url:'http://192.168.1.152:8887/api/quick/verify',
        	type: "POST",
        	timeout:5000,
        	dataType:"json",
        	data:JSON.stringify(obj),
        	success: function (data) {
        		var jsonData = JSON.parse(data['plaintext'])
        		var result = jsonData.item.result;
        		if(result == 1001){
        			layerOpen(jsonData.item.resultInfo);
        			$("#verifyName").val("");
        			$("#verifyMobile").val("");
        		}else{
        			layerOpen("信息处理有误，请稍后重试");
        		}
        	}
        });
    });
});

/* 获取核验消息 */
function layerOpen(msg) {
	layer.open({
        content: msg
        ,btn: '确定'
    });
}