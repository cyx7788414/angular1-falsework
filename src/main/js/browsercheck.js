module.exports = `
function getBrowserInfo(){
    var agent = navigator.userAgent.toLowerCase() ;

    var regStr_ie = /msie [\d.]+;/gi ;
    var regStr_ff = /firefox\\/[\d.]+/gi
    var regStr_chrome = /chrome\\/[\d.]+/gi ;
    var regStr_saf = /safari\\/[\d.]+/gi ;
    //IE
    if(agent.indexOf("msie") > 0) {
        return agent.match(regStr_ie) ;
    }
    //firefox
    if(agent.indexOf("firefox") > 0) {
        return agent.match(regStr_ff) ;
    }
    //Chrome
    if(agent.indexOf("chrome") > 0) {
        return agent.match(regStr_chrome) ;
    }
    //Safari
    if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
        return agent.match(regStr_saf) ;
    }
}
var browser = getBrowserInfo();
var verinfo = (browser + "").replace(/[^0-9.]/ig,"");

function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
    if (isIE) {
        // var IE5 = IE55 = IE6 = IE7 = IE8 = false;
        // var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        // reIE.test(userAgent);
        // var fIEVersion = parseFloat(RegExp["$1"]);
        // IE55 = fIEVersion == 5.5;
        // IE6 = fIEVersion == 6.0;
        // IE7 = fIEVersion == 7.0;
        // IE8 = fIEVersion == 8.0;
        // if (IE55||IE6||IE7||IE8) {
            return "IE_low";
        //}
    }
    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }
}
function itIsLow() {
    window.location.hash = "/browser.html";
    return false;
}
var mybrow = myBrowser();
if (mybrow == "FF") {
    if(parseInt(verinfo) < 30) {
        itIsLow();
    }
}
if (mybrow == "Opera") {
}
if (mybrow == "Safari") {
}
if (mybrow == "IE_low") {
    itIsLow();
}
if (!mybrow && String(browser).indexOf("chrome")>=0) {
    if(parseInt(verinfo)<20) {
        itIsLow();
    }
}
`;