// 给pub成功后用
Alloy.Globals.blogList = $.blogList;
Alloy.Globals.tableBlog = $.table;
Alloy.Globals.fetchBlog = fetchBlog;

// 设置头像
Alloy.Globals.avatar = $.avatar;
if(Ti.App.Properties.hasProperty("avatar")){
	$.avatar.image = Alloy.Globals.sitePath + Ti.App.Properties.getString("avatar");
}else{
	$.avatar.image = "avatar.png"
}

// 修改头像
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
			showPhoto(util.computeImageSize(e.media));
		},
		cancel: function(){
		},
		error: function(){
			alert("error");
		},
		allowEditing:true,
	});
}

function takePhoto(){
	Ti.Media.showCamera({
		success: function(e){
			showPhoto(util.computeImageSize(e.media));
		},
		cancel: function(){
		},
		error: function(){
			alert("error");
		},
		saveToPhotoGallery:true,
		allowEditing:true,
	});
}

function showPhoto(imgs){
	$.avatar.image = imgs.thumb.src;
	util.send('api/altAvatar', {email:Ti.App.Properties.getString("email"), 
		password:Ti.App.Properties.getString("password"), avatar:$.avatar.image}, function(res){
		var data = JSON.parse(res);
		if(data.type == "success"){
			Ti.App.Properties.setString("avatar", data.avatar); // 如果属性为空，将不会记录
		}else if(data.type == "fail"){
			alert('上传头像失败');
		}else{
			alert('unknown error');
		}
	});
}

// 添加actInd 
var actInd = Alloy.createController('actInd').getView();
actInd.style = Titanium.UI.iPhone.ActivityIndicatorStyle.DARK;
actInd.color = "black";
$.blogList.add(actInd);

// fetchBlog
var fetchOffset = 10;
var lastRow = 10;
	// 窗口打开时填充上次存储的数据，不刷新
function firstFetchBlog(){
	if(Ti.App.Properties.hasProperty("blogData")&&Ti.App.Properties.getString("blogData")!="{}"){
		var items = JSON.parse(Ti.App.Properties.getString("blogData"));
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
		$.blogList.remove(actInd);
	}else{
		fetchBlog()
	}
}
	// 窗口打开时主动刷新
var welcome = Alloy.createController('welcome').getView();
function fetchBlog(){
	util.send('api/fetchBlog', {email: Ti.App.Properties.getString("email"), password: Ti.App.Properties.getString("password"), offset: 0}, function(res){
		var data = JSON.parse(res);
		if(data.type == "success"){
			items = data.items;
			if (JSON.stringify(items) == "{}"){
				Alloy.Globals.tabGroup.add(welcome);
			}else{
				Alloy.Globals.tabGroup.remove(welcome);
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
				Ti.App.Properties.setString("blogData",JSON.stringify(items));
			}
		}else if(data.type == "fail"){
			alert('用户名或密码错误！');
		}else{
			alert('unknown error');
		}
		$.blogList.remove(actInd);
	});
}
	// 同一个seesion下（窗口打开后未关闭），每次窗口”激活“时判断是否初始状态，如果是将每次刷新。
function preFetchBlog(){
	if(!Ti.App.Properties.hasProperty("blogData")||Ti.App.Properties.getString("blogData")=="{}"){
		fetchBlog()
	}	
}

// show/hideNavBar
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
	//以下处理超出上下边界的极端情况：
	if(e.contentOffset.y <= 0){
		offset = 0;
	}
	if(e.contentOffset.y >= e.contentSize.height - e.size.height){
		offset = e.contentSize.height - e.size.height;
	}
}


// toggleMenu
function toggleMenu(){
	if(Alloy.Globals.slide){
		Alloy.Globals.tabGroup.animate({left:0});
		Alloy.Globals.menu.animate({left:-200});
		$.table.scrollable = true;
		Alloy.Globals.slide = false;
	}else{
		
		Alloy.Globals.tabGroup.animate({left:200});
		Alloy.Globals.menu.animate({left:0});
		$.table.scrollable = false;
		Alloy.Globals.slide = true;
	}
}

// 下拉刷新
var pullView = Alloy.createController('pullView', {table:$.table,fetch:fetchBlog}).getView();
$.table.headerPullView = pullView


// 底部刷新
var updating = false;
var loadingInd = Titanium.UI.createActivityIndicator({width:30,height:30,
	style:  Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
});
var loadingRow = Ti.UI.createTableViewRow({height:40});
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
	util.send('api/fetchBlog', {email: Ti.App.Properties.getString("email"), password: Ti.App.Properties.getString("password"), offset:fetchOffset}, function(res){
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
	if ((!updating) && e.contentSize.height>480*7 && (e.contentOffset.y + e.size.height + 100 > e.contentSize.height)) {
        beginUpdate();
    }
});


/* 数据绑定的实现方式 
var user = Alloy.createModel("user",{email: 'freemem@163.com', password: '666666'});
var feeds = Alloy.Collections.feed;

fetch feed via RestAPI.
function fetchBlog(){
	util.send('api/fetchBlog', {email: user.get("email"), password: user.get("password")}, function(res){
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
