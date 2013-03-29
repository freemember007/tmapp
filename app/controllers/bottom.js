function openRecent(){
	Alloy.Globals.tabGroup.setActiveTab(Alloy.Globals.tab1);
}

function openMonth(){
	Alloy.Globals.tabGroup.setActiveTab(Alloy.Globals.tab2);
}

function openCamera(){
	Alloy.Globals.tabGroup.setActiveTab(Alloy.Globals.tab3);
}

function openYear(){
	Alloy.Globals.tabGroup.setActiveTab(Alloy.Globals.tab4);
}

function openRandom(){
	Alloy.Globals.tabGroup.setActiveTab(Alloy.Globals.tab5);
}

// show/hide dialog and open pub
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
			var pub = Alloy.createController('pub').getView();
			pub.open();
			Alloy.Globals.showPhoto(util.computeImageSize(e.media));
		},
		cancel: function(){
		},
		error: function(){
			alert("error");
		},
	});
}

function takePhoto(){
	Ti.Media.showCamera({
		success: function(e){
			var pub = Alloy.createController('pub').getView();
			pub.open();
			Alloy.Globals.showPhoto(util.computeImageSize(e.media));
		},
		cancel: function(){
		},
		error: function(){
			alert("error");
		},
		saveToPhotoGallery:true,
	});
}