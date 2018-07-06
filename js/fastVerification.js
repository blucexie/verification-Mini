$(function () {
	/*获取authenCode*/
    function getQueryString() {
        var url = window.location.href;
        var index = url.lastIndexOf("\/");
        code = url.substring(index + 1, url.length);
        if (code != null){        	
        	return code;
        }
        return null;
    }
    var authenCode = getQueryString();
    if(authenCode!=null){
    	var obj = {
    		"authenCode":authenCode
    	}
    	$.ajax({
        	url:'/quick/getVerifyInfo',
        	type: "POST",
        	timeout:5000,
        	dataType:"json",
        	async:false,
        	data:JSON.stringify(obj),
        	success: function (data) {
        		var jsonData = JSON.parse(data['plaintext'])
        		var result = jsonData.result;
        		if(result == 1001){
        			$("#verifyName").val(jsonData.item.verifyName);
        			$("#verifyMobile").val(jsonData.item.verifyMobile);
        		}else{
        			layerOpen("获取核验人信息有误，请稍后重试");
        		}
        	}
        });
    }
    
    /*获取userCode*/
    function getQueryString(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null){        	
        	return  unescape(r[2]);
        }
        return null;
    }
    var userCode = getQueryString("userCode");
    
	$(".nextStep").click(function(){
		$(".nextStep").attr('disabled',true);
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
			$(".nextStep").attr('disabled',false);
			return;
		}
		/* 获取身份证号码 */
		var verifyIdCard = $("#verifyIdCard").val();
		if(verifyIdCard==null || verifyIdCard==''){
			$("#verifyIdCard").focus();
			layerOpen("请输入您的身份证号码");
			$(".nextStep").attr('disabled',false);
			return;
		}else{
			if(!checkICCard(verifyIdCard)){
				$("#verifyIdCard").focus();
				$("#verifyIdCard").val("");
				layerOpen("您的身份证号码输入有误，请重新输入");
				$(".nextStep").attr('disabled',false);
				return;
			}
		}
		/* 获取手机号码 */
		var verifyMobile = $("#verifyMobile").val();
		if(verifyMobile==null || verifyMobile==''){
			$("#verifyMobile").focus();
			layerOpen("请输入您的手机号");
			$(".nextStep").attr('disabled',false);
			return;
		}else{
			if(!isValidPhone(verifyMobile)){
				$("#verifyMobile").focus();
				$("#verifyMobile").val("");
				layerOpen("您的手机号输入有误，请重新输入");
				$(".nextStep").attr('disabled',false);
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
            $(".nextStep").attr('disabled',false);
            return false;
        }
		var obj = {
			"authenCode":authenCode,
			"userCode":userCode,
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
        	url:'/quick/verify',
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
        		$(".nextStep").attr('disabled',false);
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