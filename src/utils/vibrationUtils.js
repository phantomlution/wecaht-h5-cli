const SHAKE_THRESHOLD = 300;
var last_update = 0, x = 0, y = 0, z = 0, last_x = 0, last_y = 0, last_z = 0;
var callbackList = [];

function deviceMotionHandler(e) {
  var acceleration = e.accelerationIncludingGravity;
  var curTime = new Date().getTime();
  if ((curTime - last_update) > 500) {
    var diffTime = curTime - last_update;
    last_update = curTime;
    x = acceleration.x;
    y = acceleration.y;
    z = acceleration.z;
    var dist = Math.sqrt((x - last_x) * (x - last_x) + (y - last_y) * (y - last_y) + (z - last_y) * (z - last_y))
    var speed = dist / diffTime * 10000;
    if (speed > SHAKE_THRESHOLD) {
      callbackList.forEach(function(callback){
        callback();
      })
    }
    last_x = x;
    last_y = y;
    last_z = z;
  }
}
window.addEventListener('devicemotion',deviceMotionHandler);
const vibration = {
  bindEvent(callback) {
    if(callback && typeof callback == "function"){
      callbackList.push(callback);
    }
  },
  unBind() {
     callbackList = [];
  }
}
module.exports = vibration;