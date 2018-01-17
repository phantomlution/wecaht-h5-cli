import './assets/js/third/zepto.fullpage.min';
import audioUtils from './utils/audioUtils';
import deviceUtils from './utils/deviceUtils';
import wx from './assets/js/third/jweixin-1.2.0';

var Mars = {
  resetHeightClass: '.sl-page-reset',
  init: function({ signature }){
    this.initFullPagePlugin();//初始化全屏控件
    this.initAudioPlayer({//初始化音频控件
      src: 'https://activity-res.imeihao.shop/bath/bg.mp3',
      pauseImage: 'https://activity-res.imeihao.shop/bath/mute.png',
      playImage: 'https://activity-res.imeihao.shop/bath/play.png',
    });
    this.computeUI();

    if(signature){
      this.initSignature();
    }
  },
  initFullPagePlugin: function(){
    $('.fullPage-container').fullpage({
      page: '.fullPage-page',
      dir: 'v',
    });
  },
  initAudioPlayer: function(config){//初始化音频播放器
    audioUtils.init(config);
  },
  computeUI: function(){
    $(this.resetHeightClass).css({//初始化自定义div的高度
      width: '100%',
      height: deviceUtils.getDeviceImageHeight() + 'px'
    });
  },
  initSignature: function(signature){//初始化微信签名
    if(!signature){
      console.log('请传入微信签名');
      return;
    }
    signature.debug = false;
    signature.jsApiList = [ "onMenuShareAppMessage", "onMenuShareTimeline", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"];
    wx.config(signature);

    wx.error(function(res){
      console.log(res);
    });
  },
  setShareInfo: function(share){
    let { link, imgUrl, title, desc, success, cancel } = share;
    const shareSuccessCallback = function(){
      if(success && typeof success == 'function'){
        success();
      }
    };

    const shareCancelCallback = function(){
      if(cancel && typeof cancel == 'function'){
        cancel();
      }
    };

    wx.ready(function(){
      wx.onMenuShareAppMessage({//朋友
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: function(){
          shareSuccessCallback();
        },
        cancel: function(){
          shareCancelCallback();
        }
      });

      wx.onMenuShareTimeline({//朋友圈
        title: title,
        link: link,
        imgUrl: imgUrl,
        success: function(){
          shareSuccessCallback();
        },
        cancel: function(){
          shareCancelCallback();
        }
      });

      wx.onMenuShareQQ({//QQ
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: function(){
          shareSuccessCallback();
        },
        cancel: function(){
          shareCancelCallback();
        }
      });
      wx.onMenuShareWeibo({//腾讯微博
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: function(){
          shareSuccessCallback();
        },
        cancel: function(){
          shareCancelCallback();
        }
      });
      wx.onMenuShareQZone({//QQ空间
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: function(){
          shareSuccessCallback();
        },
        cancel: function(){
          shareCancelCallback();
        }
      });
    });
  }
};


Mars.init({
  signature: {}
});

Mars.setShareInfo({});