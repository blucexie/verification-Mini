$(function(){
    $('#mesBtn').click(function () {
        var mobile = $('#resumeMobile').val();
        if(!isValidPhone(mobile)){
            layer.open({
                content: '请输入正确的手机号码',
                btn: '确定'
            });
            return;
        }
        curCount = countTime;
        $.ajax({
            type : "POST",
            url : "/api/quick/enterprise/send/rebuildPwdSMS",
            timeout:5000,
            dataType:"json",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data : JSON.stringify({"mobile":mobile}),
            success : function(data) {
                var jsonData = JSON.parse(data['plaintext']);
                var result = jsonData.item.result;
                var resultInfo = jsonData.item.resultInfo;
                if(result === 2001){
                    layer.open({
                        content: resultInfo,
                        btn: '确定'
                    });
                    document.getElementById("mesBtn").style.color="#cccccc";
                    document.getElementById("mesBtn").style.border="1px solid #bfbfbf";
                    $("#mesBtn").attr("disabled", "true");
                    InterValObj = window.setInterval(SetRemainTime, 1000);
                }else{
                    layer.open({
                        content: resultInfo,
                        btn: '确定'
                    });
                }
            }
        });
    });

    $('.resetBtn>button').click(function () {
        var mobile = $('#resumeMobile').val();
        var validateCode = $('#validateCode').val();
        var password = $('#Password').val();
        var againPassword = $('#againPassword').val();
        if(mobile === ''){
            layer.open({
                content: '请输入手机号',
                btn: '确定'
            });
            return;
        }
        if(!isValidPhone(mobile)){
            layer.open({
                content: '请输入正确的手机号',
                btn: '确定'
            });
            return;
        }
        if(validateCode === ''){
            layer.open({
                content: '请输入验证码',
                btn: '确定'
            });
            return;
        }
        if(validateCode.length !== 6){
            layer.open({
                content: '请输入正确的验证码',
                btn: '确定'
            });
            return;
        }
        if(password === ''){
            layer.open({
                content: '请输入密码',
                btn: '确定'
            });
            return;
        }
        if(!checkPassword(password)){
            layer.open({
                content: '请输入一个长度介于6和12之间的非纯数字密码',
                btn: '确定'
            });
            return;
        }
        if(againPassword === ''){
            layer.open({
                content: '请输入确认密码',
                btn: '确定'
            });
            return;
        }
        if(password !== againPassword){
            layer.open({
                content: '密码和确认密码不一致',
                btn: '确定'
            });
            return;
        }
        $.ajax({
            type : "POST",
            url : "/api/quick/enterprise/rebuild/pwd",
            timeout:5000,
            dataType:"json",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data : JSON.stringify({"mobile":mobile,"validateCode":validateCode,"loginPwd":password}),
            success : function(data) {
                var jsonData = JSON.parse(data['plaintext']);
                var result = jsonData.item.result;
                var resultInfo = jsonData.item.resultInfo;
                if(result === 1001){
                    layer.open({
                        content: resultInfo,
                        btn: '确定',
                        yes:function () {
                            window.location.replace("index.html");
                        }
                    });
                }else{
                    layer.open({
                        content: resultInfo,
                        btn: '确定'
                    });
                }
            }
        });
    });
});