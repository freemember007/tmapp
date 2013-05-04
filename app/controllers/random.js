Alloy.Globals.fetchRandom = fetchRandom;

function fetchRandom(){
	var actInd = Alloy.createController('actInd').getView();
	if($.image.image != null){
		actInd.message = null;
		actInd.style = Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN;
	};
	$.random.add(actInd);
	util.send('api/fetchRandom', {email: Ti.App.Properties.getString("email"), password: Ti.App.Properties.getString("password")}, function(res){
		var data = JSON.parse(res);
		if(data.type == "success"){
			item = data.item;
			if (item.url != null){
				$.image.image = item.url;
				$.scrollView.zoomScale = 1.0; //复位一下。
			};
		}else if(data.type == "fail"){
			alert('用户名或密码错误！');
		}else{
			alert('unknown error');
		}
		$.random.remove(actInd);
	});
}

//双击缩放
function zoom(){
	($.scrollView.zoomScale <= 1.0) ? $.scrollView.setZoomScale(2, {animated:true}) : $.scrollView.setZoomScale(1, {animated:true});
}
