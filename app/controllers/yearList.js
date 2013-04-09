// 添加actInd 
var actInd = Alloy.createController('actInd').getView();
$.yearList.add(actInd);

var offset = 0;
var isHide = false; //避免事件重复触发而影响性能，尚不是很完美，仍有warn.
function hideNavBar(e){
	if(e.contentOffset.y - offset > 10 && e.contentSize.height>480 && isHide == false){
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

function firstFetchYear(){
	if(Ti.App.Properties.hasProperty("yearData")&&Ti.App.Properties.getString("yearData")!="{}"){
		var items = JSON.parse(Ti.App.Properties.getString("yearData"));
		var tabledata = [];
		for(key in items){
			var arg = {
		        month: key,
		        feeds: items[key]
			};
			var section = Alloy.createController('yearSection', arg).getView();
			tabledata.push(section);
		};
		$.table.setData(tabledata);
		$.yearList.remove(actInd);
	}else{
		fetchYear()
	}
}
function fetchYear(){
	util.send('api/fetchYear', {email: Ti.App.Properties.getString("email"), password: Ti.App.Properties.getString("password")}, function(res){
		var data = JSON.parse(res);
		$.yearList.remove(actInd);
		if(data.type == "success"){
			items = data.items;
			var tabledata = [];
			for(key in items){
				var arg = {
			        month: key,
			        feeds: items[key]
				};
				var section = Alloy.createController('yearSection', arg).getView();
				tabledata.push(section);
			};
			$.table.setData(tabledata);
			Ti.App.Properties.setString("yearData",JSON.stringify(items));
		}else if(data.type == "fail"){
			alert('用户名或密码错误！');
		}else{
			alert('unknown error');
		}
	});
}

function preFetchYear(){
	if(!Ti.App.Properties.hasProperty("yearData")||Ti.App.Properties.getString("yearData")=="{}"){
		fetchYear()
	}
}

// 下拉刷新
var pullView = Alloy.createController('pullView', {table:$.table,fetch:fetchYear}).getView();
$.table.headerPullView = pullView