$(function () {
    var data = GetRequest();
    $.ajax({
        url : "/api/quick/get/report/html",
        type : "POST",
        data :JSON.stringify({"userCode":userCode,"orderCode":data.orderCode,"verifyCode":data.verifyCode}),
        dataType:"json",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success : function(data) {
            var jsonData = JSON.parse(data['plaintext']);
            var result = jsonData.result;
            if(result === 1001){
                var html = jsonData.item;
                var htmlHead = document.querySelector('.html');
                $('.html').find('head').remove();
                document.write(html);
                // console.log(html);
                // $('#html').append(html);
                // $('#html').attr('style','font-size: 25px;')
            }
        },
        error:function () {

        }
    });
});