$(function () {
    $('.footer').click(function () {
        window.location.href='https://api.funinhr.com/contactUs.html';
    });

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
            url : "/api/quick/enterprise/send/registeSMS",
            timeout:5000,
            dataType:"json",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data : JSON.stringify({"mobile":mobile}),
            success : function(data) {
                var jsonData = JSON.parse(data['plaintext']);
                var result = jsonData.item.result;
                if(result === 2001){
                    layer.open({
                        content: jsonData.item.resultInfo,
                        btn: '确定'
                    });
                    document.getElementById("mesBtn").style.color="#cccccc";
                    document.getElementById("mesBtn").style.border="1px solid #bfbfbf";
                    $("#mesBtn").attr("disabled", "true");
                    InterValObj = window.setInterval(SetRemainTime, 1000);
                }else{
                    layer.open({
                        content: jsonData.item.resultInfo,
                        btn: '确定'
                    });
                }
            }
        });
    });


    $('.register>button').click(function () {
        var mobile = $('#resumeMobile').val();
        var validateCode = $('#validateCode').val();
        var password = $('#resumePassword').val();
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
        var basicPass = true;
        if( $("#check1").is(':checked')===false){
            layer.open({
                content: '请阅读并同意协议'
                ,btn: '确定'
            }); 
            basicPass = false;
        }
        if (!basicPass) return false;
        dataJson ={
            mobile:mobile,
            loginPwd: password,
            validateCode:validateCode,
            openid:openid
        };
        $.ajax({
            url:'/api/quick/enterprise/register',
            type: "POST",
            timeout:5000,
            dataType:"json",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data:JSON.stringify(dataJson),
            success: function (data) {
                var jsonData = JSON.parse(data['plaintext']);
                var result = jsonData.item.result;
                var resultInfo = jsonData.item.resultInfo;
                if(result === 1001){
                    // layer.open({
                    //     content: resultInfo
                    // });
                    addCookie('userCode',jsonData.item.userCode);
                    window.location.replace("index.html");
                }else{
                    layer.open({
                        content: resultInfo,
                        btn: '确定'
                    });
                    return;
                }
            },
            error: function (XMLHttpRequest, textStatus) {
                layer.open({
                    content: '网络异常，请稍后重试',
                    btn: '确定'
                });
            }
        });
    });

    $('.agreement').on('click',function(){
        window.location.href = "https://api.funinhr.com/protocol.html";
    })
});