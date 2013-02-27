function showOptions(){
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
		error: function(){
			alert("error");
		}
	});
}

function takePhoto(){
	Ti.Media.showCamera({
		success: function(e){
			if(OS_IOS)Ti.Media.hideCamera();
			showPhoto(util.computeImageSize(e.media));
		},
		error: function(){
			alert("error");
		},
		autohide:false
	});
}

function showPhoto(imgs){
	$.image.image = imgs.thumb.src;
	$.TextField.visible = true;
	$.pubButton.visible = true;
	$.pubButton.addEventListener("click",function(){
		util.send('api/uploadPhoto', {photo:imgs.img.src, content:$.pubButton.value, id:"1"}, function(res){
		var data = JSON.parse(res);
		item = data.item;
		Alloy.Globals.tabGroup.setActiveTab("tab1");
		//Alloy.Globals.tab2.close($.pubWindow);
		var feeds = Alloy.Collections.feed;
		var feed = Alloy.createModel("feed",{content:item.content, date:"2013/"+item.month+"/"+item.day, image:item.image});
		feeds.add(feed,{at: 0})
		});
	});
}