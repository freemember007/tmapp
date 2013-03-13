//获取并设置变量
var args = arguments[0] || {};
var index = args.index;
var items = args.items;

//解析数据生成scrollableView
data = [];
for(i=0; i<items.length; i++){
	var view = Ti.UI.createScrollView({
		maxZoomScale:1.5, //这项必须有,先放1.5吧，否则不清晰。
	})
	var image = Ti.UI.createImageView({
		width:318, //让图片之间留点间隙，暂时的解决办法
		image: items[i].url,
	})
	view.add(image);
	data.push(view);
};
$.scrollableView.setViews(data);

//scrollableView加事件监听并定位初始位置
$.scrollableView.scrollToView(index);
$.scrollableView.addEventListener('doubletap', function(e){
    var view = $.scrollableView.views[$.scrollableView.currentPage];
    (view.zoomScale <= 1.0) ? view.setZoomScale(2, {animated:true}) : view.setZoomScale(1, {animated:true});
});

//设置窗口title
$.scrollImage.title = "某时"; 