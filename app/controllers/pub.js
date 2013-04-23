Alloy.Globals.showPhoto = showPhoto;
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

function showPhoto(imgs){
	$.pub.remove($.imageContainer);
	$.image.image = imgs.middleImg.src;
	$.cancelButton.addEventListener("click",clearPub);
	$.pubButton.addEventListener("click",pub);
}

function pub(){
	$.commentInput.blur(); 
	util.send('api/uploadPhoto', {photo:$.image.image, content:$.commentInput.value, 
		id:Ti.App.Properties.getString("id"),friendsID:friendsID.toString()}, function(res){
		var data = JSON.parse(res);
		if(data.type="success"){
			clearPub();
			Alloy.Globals.tabGroup.setActiveTab(Alloy.Globals.tab1);
			Alloy.Globals.fetchBlog();
			Alloy.Globals.tableBlog.scrollToTop();
		}else{
			util.alert("上传失败，请重新发布！")
		}
	});
}

function clearPub(){
	$.pub.add($.imageContainer);
	$.image.image = "null";
	$.commentInput.value = "";
	$.cancelButton.removeEventListener("click",clearPub);//重要！取消show函数定义的监听事件,否则后续事件会触发多次！
	$.pubButton.removeEventListener("click",pub); 
	$.pub.close();
};

function openZoomImage(){
	$.commentInput.blur(); 
	Alloy.createController('zoomImage', $.image.image).getView();
};

function showKeybroad(){
	$.commentInput.focus();
}

$.pub.addEventListener("close", function(){
    $.destroy();
});