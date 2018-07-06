$(function () {
    getEnterpriseInfo();

    $('.sub').click(function () {
        var mobile = $('#tel').val();
        var regex = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        var companyName = $('#corporateName').val();
        // if(companyName.length===0 || companyName.name>)
        if (!regex.test(mobile)) {
            layer.open({
                content: '请输入正确的手机号码',
                btn: '确定'
            });
            return;
        }
        if ((chartedImage === '' || chartedImage === null || chartedImage === undefined) && base64OssFile === undefined) {
            layer.open({
                content: '请选择图片',
                btn: '确定'
            });
            return;
        }

        dataJson = {
            userCode: userCode,
            enterpriseName: companyName,
            enterpriseCorporationName: $('#name').val(),
            enterpriseCorporationMobile: mobile,
            enterpriseCharteredImage: chartedImage,
            base64OssFile:base64OssFile
        };
        $.ajax({
            url: '/api/quick/save/enterprise/info',
            type: 'POST',
            timeout: 5000,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: JSON.stringify(dataJson),
            success: function (data) {
                var jsonData = JSON.parse(data['plaintext']);
                if (jsonData.item.result === 1001) {
                    layer.open({
                        content: '提交认证成功',
                        btn: '确定'
                    });
                    window.location.replace("personal.html");
                } else {
                    layer.open({
                        content: jsonData.result.resultInfo,
                        btn: '确定'
                    })
                }
            }
        });
    })
})


var chartedImage;

function getEnterpriseInfo() {
    var userCode = getCookie('userCode');
    $.ajax({
        url: '/api/quick/get/enterprise/info',
        type: 'POST',
        timeout: '5000',
        dataType: 'json',
        data: "{\"userCode\":\""+userCode+"\"}",
        success: function (data) {
            var jsonData = JSON.parse(data['plaintext']);
            if (jsonData.result === 1001) {
                var result = jsonData.item;
                console.log(result.enterpriseCharteredImage);
                $("#corporateName").val(result.enterpriseName);
                $("#name").val(result.enterpriseCorporationName);
                $("#tel").val(result.enterpriseCorporationMobile);
                chartedImage = result.enterpriseCharteredImage;
                if (chartedImage !== '' && chartedImage !== null && chartedImage !== undefined) {
                    $(".layui-btn").find('img').attr('src', result.enterpriseCharteredImage);
                }

            }
        }
    })
}

