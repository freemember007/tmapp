var user = Alloy.createModel("user",{email: 'freemem@163.com', password: '666666'});
var feeds = Alloy.Collections.feed;

//login method
util.send('api/login', {email: user.get("email"), password: user.get("password")}, function(res){
	var data = JSON.parse(res);
	if(data.type == "success"){
		items = data.items;
		for(var i=0;i<items.length;i++){
			var feed = Alloy.createModel("feed",{content:items[i].content, date:items[i].date, image:items[i].image});
			//feed.save();
			feeds.add(feed);
		}
	}else if(data.type == "fail"){
		alert('用户名或密码错误！');
	}else{
		alert('unknown error');
	}
});

user.save();

function a(){
	var feed = Alloy.createModel("feed",{content:"测试", date:"2013/02/25", image:"http://www.baidu.com/img/shouye_b5486898c692066bd2cbaeda86d74448.gif"});
			//feed.save();
	feeds.add(feed,{at: 0})
}
