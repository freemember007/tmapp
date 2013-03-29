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

