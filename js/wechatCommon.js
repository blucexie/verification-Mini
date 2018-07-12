// 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
 var useragent = navigator.userAgent;

if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
    // 这里警告框会阻塞当前页面继续加载
    alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
    // 以下代码是用javascript强行关闭当前页面
    var opened = window.open('about:blank', '_self');
    opened.opener = null;
    opened.close();
}


//微信快速核验分享方法-------开始
var link = 'https://api.funinhr.com/api/wechat/index.html';//分享跳转链接
var title = '要招聘，就用易职信';//分享标题
var desc = '企业都爱用的背调平台';//分享文案
var imgUrl = 'http://cdn.funinhr.com/online/image/job/1-120-120.png';//分享图片地址

var dataUrl = {
    url: link
};

$.ajax({
    type: "post",
    url: "/api/get/wxconfig",
    dataType: "json",
    async: false,
    data: JSON.stringify(dataUrl),
    success: function (data) {
        var data = JSON.parse(data.plaintext);

        wx.config({
            debug: true,
            appId: data.appid,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone'
            ]
        });
    },
    error: function (xhr, status, error) {
        return false;
    }
});

wx.ready(function () {
    // var protocol = window.location.protocol;
    // var host = window.location.host;
    wx.onMenuShareTimeline({
        title: title,
        link: link,
        imgUrl:imgUrl,
        success:function(){
            return false;
        }
    });
    wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl:imgUrl,
        type: 'link',
        dataUrl: '',
        success:function(){
            return false;
        }
    });
    wx.onMenuShareQQ({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success:function(){
            return false;
        }
    });

    wx.onMenuShareWeibo({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success:function(){
            return false;
        }
    });

    //分享到QQ空间
    wx.onMenuShareQZone({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success:function(){
            return false;
        }
    });
});