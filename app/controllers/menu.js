function exit(){
	Ti.App.Properties.removeProperty("id");
	Alloy.Globals.menu.animate({left:-200});
	Alloy.Globals.blogList.animate({left:0});
	var login = Alloy.createController('login').getView();
	login.open({
		transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN
	});
	Alloy.Globals.slide = false;
	Alloy.Globals.tabGroup.close();
	Alloy.Globals.menu.close();
}

// touch事情监听toggleMenu，有诸多问题，如不包括scroll，事情不能在空的区域触发。
var start, move;
function touchStart(e){
	start = e.globalPoint.x;
}
function touchMove(e){
	move = e.globalPoint.x;
	if(start>move){
		Alloy.Globals.blogList.animate({left:0});
		$.menu.animate({left:-200});
		Alloy.Globals.slide = false;
		Alloy.Globals.tableBlog.scrollable = true;
	}
}