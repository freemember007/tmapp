//获取并设置变量
var args = arguments[0] || {};
var index = args.index;
var items = args.items;

//解析数据生成scrollableView
var data = [];
for(var i=0; i<items.length; i++){
	var view = Ti.UI.createScrollView({
		maxZoomScale: 2, //这项必须有,否则不起作用。
		created_at: items[i].created_at, //自定义属性
	})
	var image = Ti.UI.createImageView({
		width:Ti.Platform.displayCaps.platformWidth, 
		image: items[i].url,
		preventDefaultImage:true
	})
	view.add(image);
	data.push(view);
};
$.scrollableView.setViews(data);

//scrollableView加事件监听并定位初始位置
$.scrollableView.scrollToView(index);
$.scrollableView.addEventListener('dblclick', function(e){
    var view = $.scrollableView.views[$.scrollableView.currentPage];
    (view.zoomScale <= 1.0) ? view.setZoomScale(2, {animated:true}) : view.setZoomScale(1, {animated:true});
});

var fullScreen = false;
function toggleFullScreen(){
	if(fullScreen){
		$.top.show();
		$.backButton.show();
		Ti.UI.iPhone.showStatusBar({animationStyle:Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_FADE});
		$.scrollableView.showPagingControl=true;
		fullScreen = false;
	}else{
		fullscreen();
	}
}
function fullscreen(){
	$.top.hide();
	$.backButton.hide();
	Ti.UI.iPhone.hideStatusBar({animationStyle:Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_FADE});
	$.scrollableView.showPagingControl=false;
	fullScreen = true;
}
//适时改变窗口title
$.scrollableView.addEventListener("scrollEnd",function(e){
	if(e.view!=null){
		var hour = e.view.created_at.match(/[0-9]+:[0-9]+/)[0];
		$.top.text = util.formatTime(parseInt(hour)) + " " + hour;
	}
});

function back(){
	$.scrollImage.close({animated:true});
}