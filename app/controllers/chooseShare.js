var args = arguments[0] || {};

Ti.API.info(args);

var friendsID = [];
var ownerID = parseInt(Ti.App.Properties.getString("id"));

var friends = Alloy.Collections.friend;
friends.fetch();

var myFriends = filterFunction(friends)
if(myFriends.length==0){$.shareLabel.setVisible(false)};

function filterFunction(collection) {
    return collection.where({owner:ownerID});
}

function transformFunction(model) {
    var transform = model.toJSON();
    if(transform.avatar!=null){
    	transform.avatar = Alloy.Globals.sitePath + transform.avatar;
    }else{
    	transform.avatar = "avatar.png";
    }
    return transform;
}

function addShare(e){  // 貌似监听事件不能放在绑定的重复元素上，为此，只能绑定其父元素了。
	if(e.source.opacity == 0.3){
		e.source.opacity = 0.99;
		friendsID.push(e.source.uid);
		return;
	}
	if(e.source.opacity == 0.99){
		e.source.opacity = 0.3;
		for(var i=0; i<friendsID.length; i++){
			if(friendsID[i] == e.source.uid){friendsID.splice(i,1)};
		}
	}
}

function share(e){
	util.send('api/share', {itemID:args,domain_name:Ti.App.Properties.getString("domain_name"),friendsID:friendsID.toString()}, function(res){
		var data = JSON.parse(res);
		if(data.type="success"){
			clearShare();
		}else{
			util.alert("分享失败，请重试！")
		}
	});
}

function clearShare(){
	$.cancelButton.removeEventListener("click",clearShare);//重要！取消show函数定义的监听事件,否则后续事件会触发多次！
	$.shareButton.removeEventListener("click",share); 
	$.chooseShare.close();
};

function close(){
	$.chooseShare.close();
}

$.chooseShare.addEventListener("close", function(){
    $.destroy();
});