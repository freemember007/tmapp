exports.register = function(){
  Titanium.Network.registerForPushNotifications({
    types: [
        Titanium.Network.NOTIFICATION_TYPE_BADGE,
        Titanium.Network.NOTIFICATION_TYPE_ALERT,
        Titanium.Network.NOTIFICATION_TYPE_SOUND
    ],
    success:function(e){
        var device_token = e.deviceToken;
        Ti.App.Properties.setString("device_token",device_token)
    },
    error:function(e){
        Ti.API.info("Error during registration: "+e.error);
    },
    callback:function(e){
      Alloy.Globals.sharetome.open();
    }
  })
}

exports.unregister = function(){
  Titanium.Network.unregisterForPushNotifications()
}