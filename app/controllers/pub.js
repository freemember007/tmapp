function showOptions(){
	if($.image.image == null){
		$.dialog.show();
		$.pub.setLeftNavButton(null);
	}
}

function choose(e){
	$.dialog.hide();;
	switch( e.index ) {
		case 0:
			takePhoto();
			break;
		case 1:
			openPhoto();
			break;
		case 2:
			Alloy.Globals.index.setActiveTab("tab1");
    }	
}

function openPhoto(){
	$.image.image = "notNull"; //以免图片打开后dialog再次显示
	Ti.Media.openPhotoGallery({
		success: function(e){
			showPhoto(util.computeImageSize(e.media));
		},
		cancel: function(){
			$.image.image = null; //去掉上面的赋值，回归原始null值
			$.dialog.show();
		},
		error: function(){
			alert("error");
		}
	});
}

function takePhoto(){
	$.image.image = "notNull";
	Ti.Media.showCamera({
		success: function(e){
			if(OS_IOS)Ti.Media.hideCamera();
			showPhoto(util.computeImageSize(e.media));
		},
		cancel: function(){
			$.image.image = null;
			$.dialog.show();
		},
		error: function(){
			alert("error");
		},
		autohide:false
	});
}

function showPhoto(imgs){
	var cancelButton = Ti.UI.createButton({
		title: "取消",
	})
	$.pub.setLeftNavButton(cancelButton);
	cancelButton.addEventListener("click",clearPub);
	$.pub.remove($.imageContainer);
	$.image.image = imgs.middleImg.src;
	$.toolbar.visible = true;
	$.commentInput.focus();
	$.pubButton.addEventListener("click",pub);
}

function pub(){
	$.commentInput.blur(); //此处的blur跟clearPub的blur不冲突
	util.send('api/uploadPhoto', {photo:$.image.image, content:$.commentInput.value, id:"1"}, function(res){
		var data = JSON.parse(res);
		item = data.item;
		clearPub();
		Alloy.Globals.table.scrollToTop();
		util.fetchFeed();
	});
}

function clearPub(){
	$.pub.setLeftNavButton(null);
	$.pub.add($.imageContainer);
	$.image.image = null;
	$.commentInput.value = "";
	$.commentInput.blur();
	$.toolbar.visible = false;
	Alloy.Globals.index.setActiveTab("tab1");
	$.pubButton.removeEventListener("click",pub); //重要！取消show函数定义的监听事件
};

function openZoomImage(){
	var image = Alloy.createController('zoomImage', $.image.image).getView();
};