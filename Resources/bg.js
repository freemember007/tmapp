function demo() {
    Ti.API.info("hello from a background service!");
}

Ti.API.info("hello from a background service!");

var timer = setInterval(demo, 1e4);