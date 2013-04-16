Alloy.Globals.showPhoto = showPhoto;

function showPhoto(imgs){
	$.pub.remove($.imageContainer);
	$.image.image = imgs.middleImg.src;
	$.cancelButton.addEventListener("click",clearPub);
	$.pubButton.addEventListener("click",pub);
}

function pub(){
	$.commentInput.blur(); 
	util.send('api/uploadPhoto', {photo:$.image.image, content:$.commentInput.value, 
		id:Ti.App.Properties.getString("id"),friendsID:"1,"}, function(res){
		var data = JSON.parse(res);
		item = data.item;
		clearPub();
		Alloy.Globals.tabGroup.setActiveTab(Alloy.Globals.tab1);
		Alloy.Globals.tableBlog.scrollToTop();
		Alloy.Globals.fetchBlog();
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