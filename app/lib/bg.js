Ti.API.info("hello from a background service!"); 
 
function demo(){
    Ti.API.info("hello from a background service!");
}
 
// Kick off a timer to trigger a function called 'checkFeed' every 10 seconds (= 10000 ms)
var timer = setInterval(demo, 10000);