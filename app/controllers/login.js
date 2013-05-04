var user = Alloy.createModel("user");

function editNext(){
	$.passwordInput.focus();
}
function login(){
	user.set({email: $.emailInput.value, password: $.passwordInput.value});//作数据校验之用
	util.send('api/login', {email: user.get("email"), password: user.get("password"), device_token: Ti.App.Properties.getString("device_token")}, function(res){
		var data = JSON.parse(res);
		if(data.type == "success"){
			Ti.App.Properties.setString("id", data.id);
			Ti.App.Properties.setString("email", data.email);
			Ti.App.Properties.setString("password", $.passwordInput.value);
			Ti.App.Properties.setString("domain_name", data.domain_name);
			Ti.App.Properties.setString("avatar", data.avatar);
			Alloy.Globals.avatar.image = data.avatar?Alloy.Globals.sitePath + data.avatar:"avatar.png"; //必须设置，否则在同一个session下（即虽然登录，但bloglist并未关闭并再次打开）原始值不会改变
			Alloy.Globals.tabGroup.open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
			Alloy.Globals.menu.open();
			$.login.close();
		}else if(data.type == "fail"){
			alert('用户名或密码错误！');
		}else{
			alert('unknown error');
		}
	});	
}

function showRegister(){
	var register = Alloy.createController('register').getView();
		register.open();
}