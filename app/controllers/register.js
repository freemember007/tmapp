function back(){
	$.register.close();
}

function showDialog(){
	$.dialog.show();
}

function choose(e){
	switch( e.index ) {
		case 0:
			takePhoto();
			break;
		case 1:
			openPhoto();
			break;
    }	
}

function openPhoto(){
	Ti.Media.openPhotoGallery({
		success: function(e){
			showPhoto(util.computeImageSize(e.media));
		},
		cancel: function(){
		},
		error: function(){
			alert("error");
		},
		allowEditing:true,
	});
}

function takePhoto(){
	Ti.Media.showCamera({
		success: function(e){
			showPhoto(util.computeImageSize(e.media));
		},
		cancel: function(){
		},
		error: function(){
			alert("error");
		},
		saveToPhotoGallery:true,
		allowEditing:true,
	});
}

function showPhoto(imgs){
	$.avatar.image = imgs.thumb.src;
}

//remember_created_at貌似不需要，有空去掉。
function register(){
	util.send('api/register', {email:$.emailInput.value, password:$.passwordInput.value, 
		domain_name:$.nicknameInput.value, avatar:$.avatar.image}, function(res){
		var data = JSON.parse(res);
		if(data.type == "success"){
			Ti.App.Properties.setString("id", data.id);
			Ti.App.Properties.setString("email", $.emailInput.value);
			Ti.App.Properties.setString("password", $.passwordInput.value);			
			Ti.App.Properties.setString("avatar", data.avatar); // 如果属性为空，将不会记录
			Alloy.Globals.avatar.image = $.avatar.image;
			Alloy.Globals.tabGroup.open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
			Alloy.Globals.menu.open();
			$.register.close();
			APNS.apns();
		}else if(data.type == "fail"){
			alert('注册失败');
		}else{
			alert('unknown error');
		}
	});
}