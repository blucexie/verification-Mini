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

    $('#mesBtn').click(function () {
        var mobile = $('#phoneTab-Mobile').val();
        var regex = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        if(!regex.test(mobile)){
            layer.open({
                content: '请输入正确的手机号码',
                btn: '确定'
            });
            return;
        }
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
        var type = $('.header').find('div').children("p.active").text();
        if(type === '密码登录'){
            dataJson ={
                mobile:$('#passwordTab-Mobile').val(),
                loginPwd: $('#resumePassword').val(),
                openid:openid
            };
            login(dataJson,'/quick/password/login');
        }else{
            dataJson ={
                mobile:$('#phoneTab-Mobile').val(),
                validateCode: $('#validateCode').val(),
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
            var resultInfo = jsonData.item.resultInfo;
            if(result === 1001){
                // layer.open({
                //     content: resultInfo,
                //     success:function () {
                //     }
                // });
            	loginSuccess("userCode", jsonData.item.userCode);
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
}