function exit(){
	util.send('api/login', {email:Ti.App.Properties.getString("email"), password:Ti.App.Properties.getString("password"), device_token: ""},function(res){
		var data = JSON.parse(res);
		if(data.type == "success"){
			Ti.App.Properties.removeProperty("id");
			Ti.App.Properties.removeProperty("email");
			Ti.App.Properties.removeProperty("password");
			Ti.App.Properties.removeProperty("domain_name");
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
			if(Alloy.Globals.currentWindow != undefined){Alloy.Globals.currentWindow.close()};
		}else if(data.type == "fail"){
			alert('退出失败，请重新退出！');
		}else{
			alert('unknown error');
		}
	}); 
}

function openMytime(){
	hideMenu();
	if(Alloy.Globals.currentWindow != undefined){Alloy.Globals.currentWindow.close()};
	Alloy.Globals.currentWindow = undefined;
}

function openFriends(){
	hideMenu();
	var friends = Alloy.createController('friends').getView(); // 以后这种调用V-C的定义尽量放在函数里面。否则会导致再次打开时非真正打开。
	friends.open();
	friends.animate({left:0});
	if(Alloy.Globals.currentWindow != undefined && Alloy.Globals.currentWindow != friends ){Alloy.Globals.currentWindow.close()};
	Alloy.Globals.currentWindow = friends
}

function openSharetome(){
	hideMenu();
	Alloy.Globals.sharetome.open();
	Alloy.Globals.sharetome.animate({left:0});
	if(Alloy.Globals.currentWindow != undefined && Alloy.Globals.currentWindow != Alloy.Globals.sharetome ){Alloy.Globals.currentWindow.close()};
	Alloy.Globals.currentWindow = Alloy.Globals.sharetome
}


// touch事情监听toggleMenu，有诸多问题，如不包括scroll，事情不能在空的区域触发。
var start, move;
function touchStart(e){
	start = e.x;
}
function touchMove(e){
	move = e.x;
	if(start>move){
		hideMenu()
	}
}

function hideMenu(){
	$.menu.animate({left:-200});
	if(Alloy.Globals.currentWindow == undefined ){
		Alloy.Globals.tabGroup.animate({left:0});
		Alloy.Globals.tableBlog.scrollable = true;
	}else{
		Alloy.Globals.currentWindow.animate({left:0});
	}
	Alloy.Globals.slide = false;
}