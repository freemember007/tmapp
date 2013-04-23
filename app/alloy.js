var util = require("util");

//定义GUI规格
Alloy.Globals.sitePath = ENV_DEV?"http://localhost:3000/":"http://184.82.117.60/";
Alloy.Globals.GUI_bkC = "#f3f3f3";
Alloy.Globals.GUI_FC = "#000";
if (OS_IOS){
	Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK;
}
//侧滑菜单要用到的全局变量
Alloy.Globals.menu = Alloy.createController('menu').getView();
Alloy.Globals.sharetome = Alloy.createController('sharetome').getView();
Alloy.Globals.currentWindow = undefined
Alloy.Globals.slide = false;

//检测应用在前景还是背景运行
setTimeout(function() {Ti.App.Properties.setString("isInForeground","true")}, 5000); // 暂时的丑办法。
Ti.App.addEventListener('resumed', function(){
  Ti.App.Properties.setString("isInForeground","true")
});
Ti.App.addEventListener('pause', function(){
	Ti.App.Properties.setString("isInForeground","false")
});

// 注册背景服务
function isiOS4Plus(){
    if (Titanium.Platform.name == 'iPhone OS'){
        var version = Titanium.Platform.version.split(".");
        var major = parseInt(version[0]);
        // can only test this support on a 3.2+ device
        if (major >= 4){
            return true;
        }
    }
    return false;
}
 
if (isiOS4Plus()){
    var service;
    Ti.App.addEventListener('resumed',function(e){
        Ti.API.info("app has resumed from the background");
        if(service!=null){
            service.stop();
            service.unregister();
        }
    });
    Ti.App.addEventListener('pause',function(e){
        Ti.API.info("app was paused from the foreground");
        service = Ti.App.iOS.registerBackgroundService({url:'bg.js'});
        Ti.API.info("registered background service = "+service);
    });
}