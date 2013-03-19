// 给pub成功后用
Alloy.Globals.tableBlog = $.table;
Alloy.Globals.fetchBlog = fetchBlog;

// 添加actInd 
var actInd = Alloy.createController('actInd').getView();
actInd.style = Titanium.UI.iPhone.ActivityIndicatorStyle.DARK;
actInd.color = Alloy.Globals.GUI_FC;
$.blogList.add(actInd);

// fetchBlog
var fetchOffset = 10;
var lastRow = 10;
function fetchBlog(){
	util.send('api/login', {email: "freemem@163.com", password: "666666", offset: 0}, function(res){
		var data = JSON.parse(res);
		if(data.type == "success"){
			items = data.items;
			var tabledata = [];
			for(key in items){
				var arg = {
			        day: key,
			        feeds: items[key]
				};
				var section = Alloy.createController('blogSection', arg).getView();
				tabledata.push(section);
			};
			Alloy.Globals.tableBlog.setData(tabledata);
			fetchOffset = 10;
			lastRow = 10;
		}else if(data.type == "fail"){
			alert('用户名或密码错误！');
		}else{
			alert('unknown error');
		}
		$.blogList.remove(actInd);
	});
}

// show/hideNavBar
var offset = 0;
function hideNavBar(e){
	if(e.contentOffset.y - offset > 10){
		$.blogList.hideNavBar();
		offset = e.contentOffset.y
	}
	if(e.contentOffset.y - offset < -10){
		$.blogList.showNavBar() ;
		offset = e.contentOffset.y
	}
	//以下处理超出上下边界的极端情况：
	if(e.contentOffset.y <= 0){
		offset = 0;
	}
	if(e.contentOffset.y >= e.contentSize.height - e.size.height){
		offset = e.contentSize.height - e.size.height;
	}
}

// 下拉刷新
var pullView = Alloy.createController('pullView', {table:$.table,fetch:fetchBlog}).getView();
$.table.headerPullView = pullView


// 底部刷新
var updating = false;
var loadingInd = Titanium.UI.createActivityIndicator({bottom: 5,width:30,height:30,
	style:  Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
});
var loadingRow = Ti.UI.createTableViewRow();
var loadingSection = Ti.UI.createTableViewSection();
loadingSection.add(loadingRow);
loadingRow.add(loadingInd);
function beginUpdate(){
	updating = true;
	$.table.appendSection(loadingSection);
	loadingInd.show();
	setTimeout(endUpdate,2000);
}
function endUpdate(){
	updating = false;
	lastRow += 10;
	util.send('api/login', {email: "freemem@163.com", password: "666666", offset:fetchOffset}, function(res){
		var data = JSON.parse(res);
		if(data.type == "success"){
			$.table.deleteSection($.table.data.length-1,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});
			loadingInd.hide();
			items = data.items;
			var tabledata = [];
			for(key in items){
				var arg = {
			        day: key,
			        feeds: items[key]
				};
				var section = Alloy.createController('blogSection', arg).getView();
				$.table.appendSection(section,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});
			};
			$.table.scrollToIndex(lastRow-10,{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
			fetchOffset += 10;
		}else if(data.type == "fail"){
			alert('用户名或密码错误！');
		}else{
			alert('unknown error');
		}
	});
}
$.table.addEventListener('scroll',function(e){
	if ((!updating) && (e.contentOffset.y + e.size.height + 100 > e.contentSize.height)) {
        beginUpdate();
    }
});


/* touch事情监听实现hideNavBar，有诸多问题，如不包括scroll，事情不能在空的区域触发。
var start, move;
function touchStart(e){
	start = e.globalPoint.y;
}
function touchMove(e){
	move = e.globalPoint.y;
	if(start>move){
		$.blogList.hideNavBar();
	}
	if(start<move){
		$.blogList.showNavBar();
	}
}
*/

/* 数据绑定的实现方式 
var user = Alloy.createModel("user",{email: 'freemem@163.com', password: '666666'});
var feeds = Alloy.Collections.feed;

fetch feed via RestAPI.
function fetchBlog(){
	util.send('api/login', {email: user.get("email"), password: user.get("password")}, function(res){
		var data = JSON.parse(res);
		if(data.type == "success"){
			items = data.items;
			for(var i=0;i<items.length;i++){
				var feed = Alloy.createModel("feed",{content:items[i].content, date:items[i].date, image:items[i].image, the:items[i].index});
				feed.save();
				feeds.add(feed);
			}
		}else if(data.type == "fail"){
			alert('用户名或密码错误！');
		}else{
			alert('unknown error');
		}
	});
}
//对于使用了数据绑定的controller，毁掉一些东西，防内存泄露。
$.blogList.addEventListener('close', function() {
    $.destroy();
});
*/
