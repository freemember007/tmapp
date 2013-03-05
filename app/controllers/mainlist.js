/*非数据绑定的实现*/
var user = Alloy.createModel("user",{email: 'freemem@163.com', password: '666666'});
function fetchFeed(){
	util.send('api/login', {email: user.get("email"), password: user.get("password")}, function(res){
		var data = JSON.parse(res);
		if(data.type == "success"){
			items = data.items;
			var tabledata = [];
			for(key in items){
				var arg = {
			        day: key,
			        feeds: items[key]
				};
				var section = Alloy.createController('_section', arg).getView();
				tabledata.push(section);
			};
			$.table.setData(tabledata);

		}else if(data.type == "fail"){
			alert('用户名或密码错误！');
		}else{
			alert('unknown error');
		}
	});
}

/* 数据绑定的实现方式 
var user = Alloy.createModel("user",{email: 'freemem@163.com', password: '666666'});
var feeds = Alloy.Collections.feed;

fetch feed via RestAPI.
function fetchFeed(){
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
$.mainlist.addEventListener('close', function() {
    $.destroy();
});
*/
