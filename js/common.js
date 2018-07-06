var api_serve = "http://192.168.1.6:8887";
// var api_serve = "https://apix.funinhr.com";

// 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
var useragent = navigator.userAgent;

/*if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
	// 这里警告框会阻塞当前页面继续加载
	alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
	// 以下代码是用javascript强行关闭当前页面
	var opened = window.open('about:blank', '_self');
	opened.opener = null;
	opened.close();
}
*/
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
    if (code == '') {
    	return undefined;
    }
    return code;
}

//获取UserCode
function getOpenId() {
    var code = getCookie('openid');
    if (code == '') {
        return undefined;
    }
    return code;
}

var userCode = getUserCode();

var openid = getOpenId();

/* function checkLogin() {
    if (userCode == undefined) {
        window.location.href = 'signIn.html';
        return false;
    }
    return true;
}

function checkOthers(){
	var userCode = getUserCode();
	if (userCode == undefined){
		layer.alert('请首先登陆或者注册企业账户', {
			  closeBtn: 0
			}, function(){
				window.location.href='signIn.html';
		});
		return;
	}
	
	window.location.href='checkOthers.html';
}
 */
function loginSuccess(name, value) {
	addCookie(name, value);
}