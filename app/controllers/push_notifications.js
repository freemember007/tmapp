var apns = function(){
  Titanium.Network.registerForPushNotifications({
    types: [
        Titanium.Network.NOTIFICATION_TYPE_BADGE,
        Titanium.Network.NOTIFICATION_TYPE_ALERT
    ],
    success:function(e)
    {
        var deviceToken = e.deviceToken;
        Ti.API.info("Push notification device token is: "+deviceToken);
        Ti.API.info("Push notification types: "+Titanium.Network.remoteNotificationTypes);
        Ti.API.info("Push notification enabled: "+Titanium.Network.remoteNotificationsEnabled);
        var http = Ti.Network.createHTTPClient();
        http.onload = function(){
          // do nothing.
        };
        http.open('GET', "https://gateway.sandbox.push.apple.com:2195" + "?deviceuid=" + escape(Titanium.Platform.id)+"&devicetoken="+escape(e.deviceToken));
        http.send();
    },
    error:function(e)
    {
        Ti.API.info("Error during registration: "+e.error);
    },
    callback:function(e)
    {
        // called when a push notification is received.
      Titanium.Media.vibrate();
      var data = JSON.parse(e.data);
      var badge = data.badge;
      if(badge > 0){
        Titanium.UI.iPhone.appBadge = badge;
      }
      var message = data.message;
      if(message != ''){
        var my_alert = Ti.UI.createAlertDialog({title:'', message:message});
        my_alert.show();
      }
    }
  }); 
};
exports = {apns:apns};