// 全局变量
Alloy.Globals.tabGroup = $.tabGroup
Alloy.Globals.tab1 = $.tab1
Alloy.Globals.tab2 = $.tab2
Alloy.Globals.tab4 = $.tab4
Alloy.Globals.tab5 = $.tab5

// loading...
var startWin = Ti.UI.createWindow({
	backgroundImage: 'Default.png'
});
var actInd = Titanium.UI.createActivityIndicator({
    left: 135, bottom: 90,
    height: 50, width: 50,
    style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
});
startWin.add(actInd);
actInd.show();
startWin.open();

// 注册push事件(注意：如果不每次启动都注册，虽可收到push，但callback不会起作用。)
var badge = Alloy.Models.instance("badge");
badge.set({"number":Ti.UI.iPhone.getAppBadge()});
if(badge.get("number")==0){
  badge.set({"visible":false,"width":0});
}else if(badge.get("number")<10){
  badge.set({"visible":true,"width":22});
}else{
  badge.set({"visible":true,"width":32});
}
badge.save();
Titanium.Network.registerForPushNotifications({
    types: [
        Titanium.Network.NOTIFICATION_TYPE_BADGE,
        Titanium.Network.NOTIFICATION_TYPE_ALERT,
        Titanium.Network.NOTIFICATION_TYPE_SOUND
    ],
    success:function(e){
        var device_token = e.deviceToken;
        Ti.App.Properties.setString("device_token",device_token)
    },
    error:function(e){
        Ti.API.info("Error during registration: "+e.error);
    },
    callback:function(e){
      if(Ti.App.Properties.getString("isInForeground") == "true"){
        var badgeCount = Ti.UI.iPhone.getAppBadge();
        badgeCount = badgeCount + 1;
        Ti.UI.iPhone.setAppBadge(badgeCount);
        badge.set({"number":badgeCount});
        if(badge.get("number")==0){
          badge.set({"visible":false,"width":0});
        }else if(badge.get("number")<10){
          badge.set({"visible":true,"width":22});
        }else{
          badge.set({"visible":true,"width":32});
        }
        badge.save();
      }else{
        if(Alloy.Globals.currentWindow!=Alloy.Globals.sharetome){
          if(Alloy.Globals.currentWindow!=undefined){Alloy.Globals.currentWindow.close()};
          Alloy.Globals.sharetome.open();
          Alloy.Globals.currentWindow = Alloy.Globals.sharetome;
        }
      }
    }
  })

// 初始化
//Ti.App.Properties.removeProperty("id");
if(Ti.App.Properties.hasProperty("id")){
	$.tabGroup.open({
		transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT,
	});
	Alloy.Globals.menu.open();
	startWin.close(); //后续设个延时
}else{
	var login = Alloy.createController('login').getView();
	login.open({
		transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN
	});
	startWin.close();
}

