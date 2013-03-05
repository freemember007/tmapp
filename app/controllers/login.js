var user = Alloy.createModel("user");

function login(){
	user.set({email: $.usernameInput.value, password: $.passwordInput.value});//作数据校验之用
	util.send('api/login', {email: user.get("email"), password: user.get("password")}, function(res){
		var data = JSON.parse(res);
		if(data.type == "success"){
			Ti.App.Properties.setString("id", data.id);
			Ti.App.Properties.setString("email", data.email);
			$.login.close();
			var index = Alloy.createController('index').getView();
			index.open();
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