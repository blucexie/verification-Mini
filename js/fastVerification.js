$(function () {
	/*短信授权获取授权码*/
    function getAuthenCodeQueryString() {
        var url = window.location.href;
        var index = url.lastIndexOf("\/");
        code = url.substring(index + 1, url.length);
        if (code != null){        	
        	return code;
        }
        return null;
    }
    
    /*根据参数名获取参数值*/
    function getParamByNameQueryString(name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null){        	
        	return  unescape(r[2]);
        }
        return null;
    }
    var userCode = getParamByNameQueryString("userCode");
    var authenCode = null;
    /*扫码授权*/
    if(userCode != null && userCode != ''){
    	var obj = {
    			"userCode":userCode
    		}
    		$.ajax({
    			url:'/quick/get/enterprise/info',
    			type: "POST",
    			timeout:5000,
    			dataType:"json",
    			async:false,
    			data:JSON.stringify(obj),
    			success: function (data) {
    				var jsonData = JSON.parse(data['plaintext'])
    				var result = jsonData.result;
    				if(result == 1001 && jsonData.item != null){
    					$(".companyName").text(jsonData.item.enterpriseName);
    				}else{
    					layerOpen("获取企业公司信息失败");
    					return;
    				}
    			}
    		});
    /*短信授权*/
    }else{
    	/*阿里短信授权方式*/
    	authenCode = getParamByNameQueryString("authenCode");
    	if(authenCode == null){
    		/*腾讯短信授权方式*/
    		authenCode = getAuthenCodeQueryString();
    	}
    	if(authenCode != null && authenCode != undefined){
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
    				if(result == 1001 && jsonData.item != null){
    					$("#verifyName").val(jsonData.item.verifyName);
    					$("#verifyMobile").val(jsonData.item.verifyMobile);
    					$(".companyName").text(jsonData.item.enterpriseName);
    				}else{
    					layerOpen("授权码已失效");
    					return;
    				}
    			}
    		});
    	}
    }
    
	$(".nextStep button").click(function(){
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
			layer.open({
				content: "请输入您的姓名"
				,btn: '确定',
				yes: function(index){
					layer.close(index);
					$("#verifyName").focus();
				}
			});
			$(".nextStep").attr('disabled',false);
			return;
		}
		/* 获取身份证号码 */
		var verifyIdCard = $("#verifyIdCard").val();
		if(verifyIdCard==null || verifyIdCard==''){
			layer.open({
				content: "请输入您的身份证号码"
				,btn: '确定',
				yes: function(index){
					layer.close(index);
					$("#verifyIdCard").focus();
				}
			});
			$(".nextStep").attr('disabled',false);
			return;
		}else{
			if(!checkICCard(verifyIdCard)){
				layer.open({
					content: "您的身份证号码输入有误，请重新输入"
					,btn: '确定',
					yes: function(index){
						layer.close(index);
						$("#verifyIdCard").focus();
					}
				});
				$("#verifyIdCard").val("");
				$(".nextStep").attr('disabled',false);
				return;
			}
		}
		/* 获取手机号码 */
		var verifyMobile = $("#verifyMobile").val();
		if(verifyMobile==null || verifyMobile==''){
			layer.open({
				content: "请输入您的手机号"
				,btn: '确定',
				yes: function(index){
					layer.close(index);
					$("#verifyMobile").focus();
				}
			});
			$(".nextStep").attr('disabled',false);
			return;
		}else{
			if(!isValidPhone(verifyMobile)){
				layer.open({
					content: "您的手机号输入有误，请重新输入"
					,btn: '确定',
					yes: function(index){
						layer.close(index);
						$("#verifyMobile").focus();
					}
				});
				$("#verifyMobile").val("");
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
        			$(".nextStep").attr('disabled',false);
        			window.location.href = "/resume/succeedQuick.html";
        		}else if(result == 3001){
        			layerOpen("您已在该企业授权通过，请确认");
        			$(".nextStep").attr('disabled',false);
        		}else{
        			layerOpen("信息处理有误，请稍后重试");
        			$(".nextStep").attr('disabled',false);
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