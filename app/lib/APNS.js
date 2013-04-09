exports.apns = function(){
  Titanium.Network.registerForPushNotifications({
    types: [
        Titanium.Network.NOTIFICATION_TYPE_BADGE,
        Titanium.Network.NOTIFICATION_TYPE_ALERT,
        Titanium.Network.NOTIFICATION_TYPE_SOUND
    ],
    success:function(e){
        var deviceToken = e.deviceToken;
        //util.send("https://gateway.sandbox.push.apple.com:2195" + "?deviceuid=" + escape(Titanium.Platform.id)+"&devicetoken="+escape(e.deviceToken));
    },
    error:function(e){
        Ti.API.info("Error during registration: "+e.error);
    },
    callback:function(e){
      Alloy.Globals.tabGroup.setActiveTab(Alloy.Globals.tab5);
    }
  })
}