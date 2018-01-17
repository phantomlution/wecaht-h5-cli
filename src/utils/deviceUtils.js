const imageWidth = 750;
const imageHeight = 1206;

export default {
  getBrowserWidth: function(){
    return document.documentElement.clientWidth;
  },
  getBrowserHeight: function(){
    return document.documentElement.clientHeight;
  },
  getDeviceWidth: function(){
    return window.screen.width;
  },
  getDeviceImageHeight: function(){//获取图片在屏幕上面的真实高度
    var imageRatio = imageHeight * 1.0 / imageWidth;
    return imageRatio * this.getDeviceWidth();
  },
  getTopPadding: function(){//获取顶部的padding
    var paddingHeight = this.getBrowserHeight() - this.getDeviceImageHeight();
    return parseInt(paddingHeight / 2.0);
  }
}