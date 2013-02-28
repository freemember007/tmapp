//Ti.App.Properties.removeProperty("id");
if(Ti.App.Properties.hasProperty("id")){
	$.index.open();
}else{
	var login = Alloy.createController('login').getView();
	login.open();
}
Alloy.Globals.index = $.index

function showOptions(){
	alert("aaa")
}
