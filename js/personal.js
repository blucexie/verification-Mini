var authen = '0';
$(function(){
    if(userCode !== undefined){
        getPersonInfo();
    }
    $('.authenticate').click(function () {
        if (checkLogin()){
            window.location.href = "authentication.html?authen="+authen;
        }
    });
    $('.info').click(function () {
        if (checkLogin()){
            window.location.href = "messageList.html";
        }
    });
    $('.wallet').click(function () {
        if (checkLogin()){
            window.location.href = "recharge.html";
        }
    });
    $(".about").click(function(){
        window.location.href='about.html';
    });
    $(".download").click(function(){
        window.location.href='download.html';
    });
    $("#img").click(function () {
        checkLogin();
    });
});

function getPersonInfo() {
    $.ajax({
        type : "POST",
        url : "/api/quick/get/account/balance",
        timeout:5000,
        dataType:"json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data : JSON.stringify({"userCode":userCode}),
        success : function(data) {
            var jsonData = JSON.parse(data['plaintext']);
            console.log(jsonData)
            if(jsonData.item.result === 1001){
                var balance = jsonData.item.balance;
                $('.icon').find('span').text(balance+"元");
            }else{
                $('.icon').find('span').text("0.00元");
            }

        }
    });
    $.ajax({
        type : "POST",
        url : "/api/quick/get/userInfo",
        timeout:5000,
        dataType:"json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data : JSON.stringify({"userCode":userCode}),
        success : function(data) {
            var jsonData = JSON.parse(data['plaintext']);
            if(jsonData.item.result === 1001){
                authen = jsonData.item.userAuten;
                if(jsonData.item.userAuten === '1'){
                    //认证通过
                    $('.unanth-header').removeClass('active');
                    $('.anth-header').addClass('active');
                    $('.authenticate').show();
                    $('.anth-userName').text(jsonData.item.mobile);
                    $('.anth-company').text(jsonData.item.enterpriseName);
                    $('#anth-image').attr('src',jsonData.item.image)
                    $('.unanth').attr('src','images/doneauth.png')//
                }else if(jsonData.item.userAuten === '2'){
                    //认证中
                    $('.userName').text(jsonData.item.mobile);
                    $('#image').attr('src',jsonData.item.image);
                    $('.unanth').attr('src','images/authing.png');
                    $('.authenticate').hide();
                }else if(jsonData.item.userAuten==='3'){
                    //认证失败
                    $('.unanth-header').removeClass('active');
                    $('.anth-header').addClass('active');
                    $('.authenticate').show();
                    $('.anth-userName').text(jsonData.item.mobile);
                    $('.anth-company').text(jsonData.item.enterpriseName);
                    $('#anth-image').attr('src',jsonData.item.image);
                    $('.unanth').attr('src','images/auth_failed.png');
                }else if(jsonData.item.userAuten==='0'){
                    //未认证
                    $('.userName').text(jsonData.item.mobile);
                    $('#image').attr('src',jsonData.item.image);
                    $('#anth-image').attr('src',jsonData.item.image);
                    $('.unanth').attr('src','images/unanth.png');
                }
            }
        }
    });

}
