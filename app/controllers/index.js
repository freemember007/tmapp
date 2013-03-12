//Ti.App.Properties.removeProperty("id");
if(Ti.App.Properties.hasProperty("id")){
	$.index.open();
}else{
	var login = Alloy.createController('login').getView();
	login.open();
}

Alloy.Globals.index = $.index
Alloy.Globals.tab1 = $.tab1
Alloy.Globals.tab2 = $.tab2
Alloy.Globals.tab4 = $.tab4