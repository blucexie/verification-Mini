$(function(){
    $('.passwordLogin').on('click',function(){
        $('.passwordTab').show();
        $('.phoneTab').hide();
        $(this).find('p').addClass('active');
        $(this).find('span').addClass('active');
        $('.phoneLogin>p').removeClass('active');
        $('.phoneLogin>span').removeClass('active');
    });
    $('.phoneLogin').on('click',function(){
        $('.phoneTab').show();
        $('.passwordTab').hide();
        $(this).find('p').addClass('active');
        $(this).find('span').addClass('active');
        $('.passwordLogin>p').removeClass('active');
        $('.passwordLogin>span').removeClass('active');
    });

    $('.footerRight').click(function () {
        window.location.href='resetPassword.html';
    });

    $('.agreement').on('click',function(){
        window.location.href = "https://api.funinhr.com/protocol.html";
    });
    $('#mesBtn').click(function () {
        var mobile = $('#phoneTab-Mobile').val();
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
            url : "/api/quick/enterprise/send/loginSMS",
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

    $('.login>button').click(function () {
        var basicPass = true;
        if( $("#check1").is(':checked')===false){
            layer.open({
                content: '请阅读并同意协议'
                ,btn: '确定'
            }); 
            basicPass = false;
        }
        if (!basicPass) return false;

        var type = $('.header').find('div').children("p.active").text();
        if(type === '密码登录'){
            var mobile = $("#passwordTab-Mobile").val();
            if(mobile===null || mobile===''){
                layer.open({
                    content: "请输入登录账户信息",
                    btn: '确定'
                });
                return;
            }

            if(!isValidPhone(mobile)){
                    layer.open({
                        content: "请您输入正确的手机号",
                        btn: '确定'
                    });
                    return;
            }

            var resumePassword = $("#resumePassword").val();
            if(resumePassword===null || resumePassword===''){
                layer.open({
                    content: "请输入登录账户密码",
                    btn: '确定'
                });
                return;
            }
            dataJson ={
                mobile:mobile,
                loginPwd: resumePassword,
                openid:openid
            };
            login(dataJson,'/quick/password/login');
        }else{
            var mobile = $("#phoneTab-Mobile").val();
            if(mobile===null || mobile===''){
                layer.open({
                    content: "请输入登录账户信息",
                    btn: '确定'
                });
                return;
            }

            if(!isValidPhone(mobile)){
                    layer.open({
                        content: "请您输入正确的手机号",
                        btn: '确定'
                    });
                    return;
            }

            var validateCode = $('#validateCode').val();
            if(validateCode === null || validateCode === ''){
                layer.open({
                    content: "请输入验证码",
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
            dataJson ={
                mobile:mobile,
                validateCode: validateCode,
                openid:openid
            };
            login(dataJson,'/quick/sms/login');
        }
    });

    $('.goRegister').click(function () {
        window.location.href='register.html';
    });
});

function login(dataJson,url) {
    $.ajax({
        url:'/api'+url,
        type: "POST",
        timeout:5000,
        dataType:"json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data:JSON.stringify(dataJson),
        success: function (data) {
            var jsonData = JSON.parse(data['plaintext']);
            var result = jsonData.item.result;
            if(result === 1001){
                // layer.open({
                //     content: resultInfo,
                //     time: 2,//2秒后自动关闭
                //     success:function () {
                //     }
                // });
                loginSuccess("userCode", jsonData.item.userCode);
                window.location.replace("index.html");
            }else{
                var resultInfo = jsonData.item.resultInfo;
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
}