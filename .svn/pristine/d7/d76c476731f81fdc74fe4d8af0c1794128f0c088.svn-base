$(function(){
    if(userCode !== undefined){
        getPersonInfo();
    }
    $('.authenticate').click(function () {
        if (checkLogin()){
            window.location.href = "authentication.html";
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
                if(jsonData.item.userAuten === '1'){
                    $('.unanth-header').removeClass('active');
                    $('.anth-header').addClass('active');
                    $('.anth-userName').text(jsonData.item.mobile);
                    $('.anth-company').text(jsonData.item.enterpriseName);
                    $('#anth-image').attr('src',jsonData.item.image);
                }else if(jsonData.item.userAuten === '2'){
                    $('.userName').text(jsonData.item.mobile);
                    $('#image').attr('src',jsonData.item.image);
                    $('.authenticate').hide();
                }else{
                    $('.userName').text(jsonData.item.mobile);
                    $('#image').attr('src',jsonData.item.image);
                }
            }
        }
    });

}
