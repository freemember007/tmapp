$.window.hide();
$.window.hideNavBar();

var previousTab;
function donotOpen(e){
	Alloy.Globals.index.setActiveTab(e.previousTab);
	$.dialog.show();
	previousTab = e.previousTab
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
			$.window.show();
			$.window.showNavBar();
			$.tab3.removeEventListener("focus",donotOpen);
			Alloy.Globals.index.setActiveTab($.tab3);
			showPhoto(util.computeImageSize(e.media));
		},
		cancel: function(){
		},
		error: function(){
			alert("error");
		}
	});
}

function takePhoto(){
	Ti.Media.showCamera({
		success: function(e){
			$.window.show();
			$.window.showNavBar();
			$.tab3.removeEventListener("focus",donotOpen);
			Alloy.Globals.index.setActiveTab($.tab3);
			if(OS_IOS)Ti.Media.hideCamera();
			showPhoto(util.computeImageSize(e.media));
		},
		cancel: function(){
		},
		error: function(){
			alert("error");
		},
		autohide:false
	});
}

function showPhoto(imgs){
	$.window.remove($.imageContainer);
	$.image.image = imgs.middleImg.src;
	$.commentInput.focus();
	$.cancelButton.addEventListener("click",clearPub);
	$.pubButton.addEventListener("click",pub);
}

function pub(){
	$.commentInput.blur(); 
	util.send('api/uploadPhoto', {photo:$.image.image, content:$.commentInput.value, id:"1"}, function(res){
		var data = JSON.parse(res);
		item = data.item;
		clearPub();
		Alloy.Globals.index.setActiveTab(Alloy.Globals.tab1);
		Alloy.Globals.tableBlog.scrollToTop();
		util.fetchBlog();
	});
}

function clearPub(){
	$.window.add($.imageContainer);
	$.image.image = "null";
	$.commentInput.value = "";
	$.cancelButton.removeEventListener("click",clearPub);//重要！取消show函数定义的监听事件,否则后续事件会触发多次！
	$.pubButton.removeEventListener("click",pub); 
	Alloy.Globals.index.setActiveTab(previousTab);
	$.tab3.addEventListener("focus",donotOpen);
	$.window.hide();
	$.window.hideNavBar();
};

function openZoomImage(){
	Alloy.createController('zoomImage', $.image.image).getView();
};