function checkOthers(){
    var userCode = getUserCode();
    if (userCode == undefined){
        layer.open({
            content: '请首先登陆或者注册企业账户'
            ,btn: ['去登陆', '取消']
            ,yes: function(index){
                window.location.href='signIn.html';
            }
        });
        return;
    }
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
                    window.location.href='checkOthers.html';
                }else if(jsonData.item.userAuten === '2'){
                    //认证中
                    layer.open({
                        content: '账户认证中，请等待'
                        ,btn: ['我知道了']
                    });
                }else if(jsonData.item.userAuten==='3'){
                    //认证失败
                    layer.open({
                        content: '认证失败，请重新认证'
                        ,btn: ['去认证', '取消']
                        ,yes: function(index){
                            window.location.href='authentication.html';
                        }
                    });
                }else if(jsonData.item.userAuten==='0'){
                    //未认证
                    layer.open({
                        content: '为了确保候选人信息安全，易职信需要认证您的企业资料'
                        ,btn: ['去认证', '取消']
                        ,yes: function(index){
                            window.location.href='authentication.html';
                        }
                    });
                }
            }
        }
    });

}