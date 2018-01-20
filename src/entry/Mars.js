import '../assets/js/third/zepto.fullpage.min';
import audioUtils from '../utils/audioUtils';
import deviceUtils from '../utils/deviceUtils';
import vibrationUtils from '../utils/vibrationUtils';

export default {
  containerSelector: '.fullPage-container',
  pageSelector: '.fullPage-page',
  resetHeightSelector: '.sl-page-reset',
  loadingWrapperSelector: '.fullPage-loading-wrapper',
  shareWrapperSelector: '#sl-dialog-share',//consistent with share.html
  configObject: {},
  init: function(config){
    this.configObject = config;
    this.initFullPagePlugin();//初始化全屏控件
    this.initAudioPlayer();
    this.initSignature();
    this.initVibration();
    this.initShareDialog();
    this.computeUI();
    this.mounted();
  },
  initFullPagePlugin: function(){
    let { vertical = true } = this.configObject;
    $(this.containerSelector).fullpage({
      page: this.pageSelector,
      dir: vertical ? 'v' : 'h',
    });
  },
  initAudioPlayer: function(){//初始化音频播放器
    let { music } = this.configObject;
    audioUtils.init(music);
  },
  initShareDialog: function(){
    var $this = this;
    var shareDialog = document.querySelector(this.shareWrapperSelector);
    if(shareDialog){
      $("body").on("touchstart", this.shareWrapperSelector, function(){
        $this.closeShareDialog();
      });
    }
  },
  initVibration: function(){//初始化手机晃动相关事件
    let { vibrateCallback } = this.configObject;
    if(vibrateCallback && typeof vibrateCallback == 'function'){
      vibrationUtils.bindEvent(vibrateCallback);
    }
  },
  computeUI: function(){
    $(this.resetHeightSelector).css({//初始化自定义div的高度
      width: '100%',
      height: deviceUtils.getDeviceImageHeight() + 'px'
    });
  },
  initSignature: function(){//初始化微信签名
    let { signature } = this.configObject;
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
  openShareDialog(){
    var shareDialog = document.querySelector(this.shareWrapperSelector);
    if(shareDialog){
      shareDialog.style.display = "block";
    }else{
      this.log('请设置 useShare 为 true')
    }
  },
  closeShareDialog(){
    var shareDialog = document.querySelector(this.shareWrapperSelector);
    if(shareDialog){
      shareDialog.style.display = "none";
    }
  },
  log: function(str){
    if(console && console.log){
      console.log(str);
    }
  },
  mounted: function(){
    let { mounted } = this.configObject;
    var loadingWrapper = document.querySelector(this.loadingWrapperSelector);
    if(loadingWrapper){
      loadingWrapper.style.display = "none";
    }

    if(mounted && typeof mounted){
      mounted.call(this);
    }
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