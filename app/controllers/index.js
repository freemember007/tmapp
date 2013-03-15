//Ti.App.Properties.removeProperty("id");

var startWin = Ti.UI.createWindow({
	backgroundImage: 'startup_bg.png'
});

var actInd = Titanium.UI.createActivityIndicator({
    left: 135, bottom: 70,
    height: 50, width: 50,
    style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
});

startWin.add(actInd);
actInd.show();
startWin.open();

if(Ti.App.Properties.hasProperty("id")){
	$.index.open({
		transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT,
	});
	startWin.close();
}else{
	var login = Alloy.createController('login').getView();
	login.open({
		transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN
	});
	startWin.close();
}

Alloy.Globals.index = $.index
Alloy.Globals.tab1 = $.tab1
Alloy.Globals.tab2 = $.tab2
Alloy.Globals.tab4 = $.tab4