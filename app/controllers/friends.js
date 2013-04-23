var ownerID = parseInt(Ti.App.Properties.getString("id"));

var friends = Alloy.Collections.friend;
friends.fetch();

function filterFunction(collection) {
    return collection.where({owner:ownerID});
}
//var myFriends = filterFunction(friends) // 用myFriends=friends.where({owner:ownerID})不行，貌似这样还是不行，不知是何原因？

function transformFunction(model) {
    var transform = model.toJSON();
    if(transform.avatar!=null){
    	transform.avatar = Alloy.Globals.sitePath + transform.avatar;
    }else{
    	transform.avatar = "avatar.png";
    }
    return transform;
}

function addFriend(){
	if($.input.value.match(/^\s*$/)){
		$.input.value="";
		return; //条件体内一般不需要return。这里是为了跳出母函数，让条件体外的最后两句代码不再执行(return后不带参数实际上返回的是undefined)
	}else if($.input.value==Ti.App.Properties.getString("domain_name")){
		util.alert("不可添加自己为自己人");
	}else if(friends.where({owner:ownerID}).length==9){
		util.alert("自己人最多可设9人，现在达上限，请删除不必要的自己人。");
	}else if(friends.length!=0 && friends.where({owner:ownerID,domain_name:$.input.value}).length!=0){// 注：backbone0.9.2没有findWhere方法，故用此方法。
		util.alert("用户已经在您的自己人列表中！")
	}else{
		util.get("api/userInfo?domain_name=" + $.input.value, function(res){
			var data = JSON.parse(res);
			if(data.success){
				var friend = Alloy.createModel("friend",{uid:data.uid, owner:ownerID, avatar: data.avatar, domain_name:data.domain_name});
				friend.save()
				friends.add(friend);
			}else{
				util.alert("用户名不存在，请确认添加的用户名是否正确！");
			}
		});
	}
	$.input.value="";
	$.input.blur();
}

// toggleMenu
function toggleMenu(){
	if(Alloy.Globals.slide){
		$.friends.animate({left:0});
		Alloy.Globals.menu.animate({left:-200});
		Alloy.Globals.slide = false;
	}else{
		$.friends.animate({left:200});
		Alloy.Globals.menu.animate({left:0});
		$.input.blur();
		$.input.value="";
		Alloy.Globals.slide = true;
	}
}

// 以下是官方推荐做法，但貌似会导致下次打开时，数据不再绑定(后来发现问题还是出在该V-C被引用至提前打开并存储所致，以后切记小心！)
$.friends.addEventListener("close", function(){
    $.destroy();
});