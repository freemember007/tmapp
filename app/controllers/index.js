//Ti.App.Properties.removeProperty("id");
if(Ti.App.Properties.hasProperty("id")){
	$.index.open({
		transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT,
	});
}else{
	var login = Alloy.createController('login').getView();
	login.open({
		transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN
	});
}

Alloy.Globals.index = $.index
Alloy.Globals.tab1 = $.tab1
Alloy.Globals.tab2 = $.tab2
Alloy.Globals.tab4 = $.tab4