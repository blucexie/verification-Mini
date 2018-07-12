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
var link = window.location.href;//当前页面链接
var title = '要招聘，就用易职信';//分享标题
var desc = '企业都爱用的背调平台';//分享文案
var imgUrl = 'http://cdn.funinhr.com/online/image/enterprise/logo200x200.png';//分享图片地址

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
            debug: false,
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

//var shareLink = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx83f0bedcd4d1c492&redirect_uri=https://api.funinhr.com/api/wechat/index&response_type=code&scope=snsapi_userinfo'
var shareLink = 'https://api.funinhr.com/api/wechat/index'

wx.ready(function () {
    // var protocol = window.location.protocol;
    // var host = window.location.host;
    wx.onMenuShareTimeline({
        title: title,
        link: shareLink,
        imgUrl:imgUrl,
        success:function(){
            return false;
        }
    });
    wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: shareLink,
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
        link: shareLink,
        imgUrl: imgUrl,
        success:function(){
            return false;
        }
    });

    wx.onMenuShareWeibo({
        title: title,
        desc: desc,
        link: shareLink,
        imgUrl: imgUrl,
        success:function(){
            return false;
        }
    });

    //分享到QQ空间
    wx.onMenuShareQZone({
        title: title,
        desc: desc,
        link: shareLink,
        imgUrl: imgUrl,
        success:function(){
            return false;
        }
    });
});