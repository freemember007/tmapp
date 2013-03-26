// 添加actInd 
var actInd = Alloy.createController('actInd').getView();
$.yearList.add(actInd);

var offset = 0;
function hideNavBar(e){
	if(e.contentOffset.y - offset > 10){
		$.top.hide();
		$.table.top=0;
		offset = e.contentOffset.y
	}
	if(e.contentOffset.y - offset < -10){
		$.top.show() ;
		$.table.top=40,
		offset = e.contentOffset.y
	}
	if(e.contentOffset.y <= 0){
		offset = 0;
	}
	if(e.contentOffset.y >= e.contentSize.height - e.size.height){
		offset = e.contentSize.height - e.size.height;
	}
}

function fetchYear(){
	util.send('api/fetchYear', {email: "freemem@163.com", password: "666666"}, function(res){
		var data = JSON.parse(res);
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
		}else if(data.type == "fail"){
			alert('用户名或密码错误！');
		}else{
			alert('unknown error');
		}
		$.yearList.remove(actInd);
	});
}

// 下拉刷新
var pullView = Alloy.createController('pullView', {table:$.table,fetch:fetchYear}).getView();
$.table.headerPullView = pullView