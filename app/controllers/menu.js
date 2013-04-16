var currentWindow;
var friends = Alloy.createController('friends').getView();
var sharetome = Alloy.createController('sharetome').getView();

function exit(){
	util.send('api/login', {email:Ti.App.Properties.getString("email"), password:Ti.App.Properties.getString("password"), device_token: ""}); //清除token
	Ti.App.Properties.removeProperty("id");
	Ti.App.Properties.removeProperty("email");
	Ti.App.Properties.removeProperty("password");
	Ti.App.Properties.removeProperty("avatar");
	Ti.App.Properties.removeProperty("blogData");
	Ti.App.Properties.removeProperty("monthData");
	Ti.App.Properties.removeProperty("yearData");
	hideMenu();
	var login = Alloy.createController('login').getView();
	login.open({
		transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN
	});
	Alloy.Globals.tabGroup.close();
	Alloy.Globals.menu.close();
	if(currentWindow != undefined){currentWindow.close()};
}

function openMytime(){
	hideMenu();
	if(currentWindow != undefined){currentWindow.close()};
	currentWindow = undefined;
}

function openFriends(){
	hideMenu();
	if(currentWindow != undefined && currentWindow != friends ){currentWindow.close()};
	friends.open();
	friends.animate({left:0});
	currentWindow = friends
}

function openSharetome(){
	hideMenu();
	if(currentWindow != undefined && currentWindow != sharetome ){currentWindow.close()};
	sharetome.open();
	sharetome.animate({left:0});
	currentWindow = sharetome
}


// touch事情监听toggleMenu，有诸多问题，如不包括scroll，事情不能在空的区域触发。
var start, move;
function touchStart(e){
	start = e.globalPoint.x;
}
function touchMove(e){
	move = e.globalPoint.x;
	if(start>move){
		hideMenu()
	}
}

function hideMenu(){
	$.menu.animate({left:-200});
	Alloy.Globals.slide = false;
	if(currentWindow == undefined ){
		Alloy.Globals.tabGroup.animate({left:0});
		Alloy.Globals.tableBlog.scrollable = true;
	}else{
		currentWindow.animate({left:0});
		// currentWindow.getView($.table).scrollable = true;
	}
	
}