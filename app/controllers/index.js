// 全局变量
Alloy.Globals.tabGroup = $.tabGroup
Alloy.Globals.tab1 = $.tab1
Alloy.Globals.tab2 = $.tab2
Alloy.Globals.tab4 = $.tab4

// loading...
var startWin = Ti.UI.createWindow({
	backgroundImage: 'Default.png'
});
var actInd = Titanium.UI.createActivityIndicator({
    left: 135, bottom: 90,
    height: 50, width: 50,
    style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
});
startWin.add(actInd);
actInd.show();
startWin.open();

// 初始化
//Ti.App.Properties.removeProperty("id");
if(Ti.App.Properties.hasProperty("id")){
	$.index.open({
		transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT,
	});
	$.tabGroup.open();
	//startWin.close(); //后续设个延时
	
}else{
	var login = Alloy.createController('login').getView();
	login.open({
		transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN
	});
	startWin.close();
}

// 自定义groupTab
var ticustomtab = require("de.marcelpociot.ticustomtab");
ticustomtab.customText({
    textColor: '#666',
    //shadowColor: '#fff', 
    font: {fontSize: 12, fontWeight:"bold", fontFamily:'迷你简南宫',}
});

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
			pub.open({modal:true});
			Alloy.Globals.showPhoto(util.computeImageSize(e.media));
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
			var pub = Alloy.createController('pub').getView();
			pub.open({modal:true});
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