// var api_serve = "http://192.168.1.6:8887";
var api_serve = "https://apix.funinhr.com";

/* 校验手机号码 */
function isValidPhone(mobile) {
	var re = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|19[0-9]|14[57])[0-9]{8}$/;
	return re.test(mobile);
}

/* 校验身份证号 */
function checkICCard(resumeIdCard) {
	var idCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
	return idCard.test(resumeIdCard);
}

/* 6-12非纯数字密码 */
function checkPassword(password) {
    var pas = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    return pas.test(password);
}

/* 解决安卓键盘弹出顶起footer */
var winHeight = $(window).height(); 

$(window).resize(function () {
	var thisHeight = $(this).height();
	if (winHeight > thisHeight) {
		$(".footerTab").css("visibility", 'hidden')
	} else {
		$(".footerTab").css("visibility", 'visible')
		$(".footerTab").css("position", "fixed")
	}
});

//获取UserCode
 function getUserCode() {
    var code = getCookie('userCode');
    if (code === '') {
    	return undefined;
    }
    return code;
}

//获取OpenId
function getOpenId() {
    var openid = getCookie('openid');
    if (openid === '') {
        // return undefined;
        return RndNum(16);
    }
    return openid;
}

//subscribe
function getSubscribe() {
    var subscribe = getCookie('subscribe');
    if (subscribe === '') {
        return undefined;
    }
    return subscribe;
}

var userCode = getUserCode();

var openid = getOpenId();

var subscribe = getSubscribe();

function checkLogin() {
    if(subscribe === '0' || subscribe === undefined){
        layer.open({
            content: '请首先关注易职信公众号'
            ,btn: ['确定', '取消']
            ,yes: function(index){
                window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI5Nzk3NjE3NA==&scene=124&#wechat_redirect';
            }
        });
        return false;
    }
    if (userCode === undefined) {
        window.location.href = 'signIn.html';
        return false;
    }
    return true;
}

function loginSuccess(name, value) {
	addCookie(name, value);
}


function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function RndNum(n) {
    var rnd = "";
    for (var i = 0; i < n; i++) {
        rnd += Math.floor(Math.random() * 10);
    }
    return rnd;
}
$(function(){
    $('#tabOne').on('click',function(){
        $(this).parents('.footerTab').children('a').removeClass('active');
        $(this).children('a').addClass('active');
        window.location.href = 'index.html';
    })
    $('#tabTwo').on('click',function(){
        $(this).parents('.footerTab').children('a').removeClass('active');
        $(this).children('a').addClass('active');
        window.location.href = 'reportList.html';
    })
    $('#tabThree').on('click',function(){
        $(this).parents('.footerTab').find('a').removeClass('active');
        $(this).find('a').addClass('active');
        window.location.href = 'personal.html';
    })
})

var InterValObj; //timer变量，控制时间
var countTime = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数

//timer处理函数
function SetRemainTime() {
    if (curCount == 0) {
        window.clearInterval(InterValObj);//停止计时器
        document.getElementById("mesBtn").style.color="#03aaad";
        document.getElementById("mesBtn").style.border="1px solid #03aaad";
        $("#mesBtn").removeAttr("disabled");//启用按钮
        $("#mesBtn").text("获取验证码");
    }
    else {
        curCount--;
        $("#mesBtn").text(curCount);
    }
}