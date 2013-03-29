function fetchRandom(){
	var actInd = Alloy.createController('actInd').getView();
	$.random.add(actInd);
	util.send('api/fetchRandom', {email: "freemem@163.com", password: "666666"}, function(res){
		var data = JSON.parse(res);
		if(data.type == "success"){
			items = data.items;
			data = [];
			for(i=0; i<items.length; i++){
				if (items[i].url != null){
					var view = Ti.UI.createScrollView({
						maxZoomScale:1.5, //这项必须有,先放1.5吧，否则不清晰。
					})
					var image = Ti.UI.createImageView({
						width:320, 
						image: items[i].url,
					})
					view.add(image);
					data.push(view);
				};
			};
			$.scrollableView.setViews(data);
		}else if(data.type == "fail"){
			alert('用户名或密码错误！');
		}else{
			alert('unknown error');
		}
		$.random.remove(actInd);
		$.scrollableView.scrollToView(0);
	});
}

//scrollableView加事件监听
$.scrollableView.addEventListener('doubletap', function(e){
    var view = $.scrollableView.views[$.scrollableView.currentPage];
    (view.zoomScale <= 1.0) ? view.setZoomScale(2, {animated:true}) : view.setZoomScale(1, {animated:true});
});

//设置窗口title
$.random.title = "某时"; 