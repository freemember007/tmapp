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
			Ti.App.Properties.removeProperty("sharetomeData");
			hideMenu();
			var login = Alloy.createController('login').getView();
			login.open({
				transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN
			});
			Alloy.Globals.menu.close();
			if(Alloy.Globals.currentWindow != undefined){Alloy.Globals.currentWindow.close()};
			Alloy.Globals.currentWindow = undefined //同一个seesion下，将其复位，否则后面hideMenu会出错。
			Alloy.Globals.tabGroup.animate({left:0}); //把它复一下位。
			Alloy.Globals.tabGroup.close();//貌似关闭不了，所以放在最后面。
		}else if(data.type == "fail"){
			alert('退出失败，请重新退出！');
		}else{
			alert('unknown error');
		}
	}); 
}

function openMytime(){
	Alloy.Globals.tabGroup.animate({left:0});
	hideMenu(true);
	if(Alloy.Globals.currentWindow != undefined){Alloy.Globals.currentWindow.close()};
	Alloy.Globals.currentWindow = undefined;
}

function openFriends(){
	var friends = Alloy.createController('friends').getView(); // 以后这种调用V-C的定义尽量放在函数里面。否则会导致再次打开时非真正打开。
	friends.open(); // 如何解决重复打开导致运行慢的问题？难道只有停用数据绑定了？
	friends.animate({left:0});
	hideMenu(true);
	if(Alloy.Globals.currentWindow != undefined && Alloy.Globals.currentWindow != friends ){Alloy.Globals.currentWindow.close()};
	Alloy.Globals.currentWindow = friends
}

function openSharetome(){
	Alloy.Globals.sharetome.open();
	Alloy.Globals.sharetome.animate({left:0});
	hideMenu(true);
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

function hideMenu(isClick){
	$.menu.animate({left:-200});
	if(!isClick){
		if(Alloy.Globals.currentWindow == undefined ){
			Alloy.Globals.tabGroup.animate({left:0});
		}else{
			Alloy.Globals.currentWindow.animate({left:0});
		}
	}
	Alloy.Globals.tableBlog.scrollable = true;
	Alloy.Globals.slide = false;
}