$(function () {
    getEnterpriseInfo()
})

function saveEnterpriseInfo() {
    $.ajax({
        url: "http://192.168.1.120:8887/api/quick/save/enterprise/info",
        type: "POST",
        timeout: "5000",
        dataType: "json",
        data: "{\"userCode\":\"5b16379d23847512ddc02597\"}",
        success: function (data) {
            var jsonData = JSON.parse(data['plaintext']);
            if (jsonData.result === 1001) {

            }
            console.log(result);
        }
    })
}

function getEnterpriseInfo() {
    $.ajax({
        url: 'http://192.168.1.120:8887/api/quick/get/enterprise/info',
        type: 'POST',
        timeout: '5000',
        dataType: 'json',
        data: "{\"userCode\":\"5b16379d23847512ddc02597\"}",
        success: function (data) {
            var jsonData = JSON.parse(data['plaintext']);
            var result = jsonData.item;
            console.log(result)

        }


    })
}