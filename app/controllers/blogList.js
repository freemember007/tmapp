Alloy.Globals.tableBlog = $.table

// scroll事情监听实现hideNavBar
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
var pullView = Alloy.createController('pullView', {table:Alloy.Globals.tableBlog,fetch:util.fetchBlog}).getView();
$.table.headerPullView = pullView



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
