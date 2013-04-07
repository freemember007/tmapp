// 添加actInd 
var actInd = Alloy.createController('actInd').getView();
$.monthList.add(actInd);

// show/hide navBar
var offset = 0;
var isHide = false; //避免事件重复触发而影响性能，尚不是很完美，仍有warn.
function hideNavBar(e){
	if(e.contentOffset.y - offset > 10 && isHide == false){
		$.top.animate({top:-47});
		$.table.animate({top:0});
		offset = e.contentOffset.y
		isHide = true;
	}
	if(e.contentOffset.y - offset < -10 && isHide == true){
		$.top.animate({top:0});
		$.table.animate({top:44});
		offset = e.contentOffset.y
		isHide = false;
	}
	if(e.contentOffset.y <= 0){
		offset = 0;
	}
	if(e.contentOffset.y >= e.contentSize.height - e.size.height){
		offset = e.contentSize.height - e.size.height;
	}
}

// fetch
function firstFetchMonth(){
	if(Ti.App.Properties.hasProperty("monthData")&&Ti.App.Properties.getString("monthData")!="{}"){
		var items = JSON.parse(Ti.App.Properties.getString("monthData"));
		var tabledata = [];
		for(key in items){
			var arg = {
		        day: key,
		        feeds: items[key]
			};
			var row = Alloy.createController('monthRow', arg).getView();
			tabledata.push(row);
		};
		$.table.setData(tabledata);
		$.monthList.remove(actInd);
	}else{
		fetchMonth()
	}
}
function fetchMonth(){
	util.send('api/fetchMonth', {email: Ti.App.Properties.getString("email"), password: Ti.App.Properties.getString("password")}, function(res){
		var data = JSON.parse(res);
		$.monthList.remove(actInd);
		if(data.type == "success"){
			items = data.items;
			var tabledata = [];
			for(key in items){
				var arg = {
			        day: key,
			        feeds: items[key]
				};
				var row = Alloy.createController('monthRow', arg).getView();
				tabledata.push(row);
			};
			$.table.setData(tabledata);
			Ti.App.Properties.setString("monthData",JSON.stringify(items));
		}else if(data.type == "fail"){
			alert('用户名或密码错误！');
		}else{
			alert('unknown error');
		}
	});
}

// 下拉刷新
var pullView = Alloy.createController('pullView', {table:$.table,fetch:fetchMonth}).getView();
$.table.headerPullView = pullView