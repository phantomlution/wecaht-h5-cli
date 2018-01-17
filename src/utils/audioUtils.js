import ImageLoader from './ImageLoader';
import deviceUtils from './deviceUtils';
const audioWrapper = "sl-audio-wrapper";
const audioId = "music";
var audioConfig = {};
export default {
  init(config) {
    //内容校验
    let { src, playImage, pauseImage } = config;
    if(!src || !playImage || !pauseImage){
      throw new Error('参数不完整');
      return;
    }
    audioConfig = config;

    //预先下载图片，使页面点击效果更流畅
    new ImageLoader(playImage);
    new ImageLoader(pauseImage);

    this.initUI();//初始化UI
    this.bindEvent();//绑定点击事件
    this.startAutoPlay();//开启自动播放音乐
  },
  initUI() {
    let { src } = audioConfig;
    var offsetTop = (deviceUtils.getTopPadding() + 10) + 'px';
    var html = `<div class="${audioWrapper}" style="top: ${offsetTop}">
        <audio loop="loop" id="${audioId}">
          <source src="${src}" type="audio/mpeg">
        </audio>
      </div>`;
    $('body').append(html);
  },
  bindEvent: function(){
    const $this = this;
    $("body").on('touchstart', `.${audioWrapper}`, function(){
      if($this.getTarget().paused){
        $this.play();
      }else{
        $this.pause();
      }
    });
  },
  getTarget: function(){
    return document.querySelector(`#${audioId}`);
  },
  startAutoPlay: function(){
    const $this = this;
    $this.play();
    document.addEventListener("touchstart", function () { }, false);
    document.addEventListener("WeixinJSBridgeReady", function () {
      $this.play();
    }, false);
  },
  play: function(){
    let { playImage } = audioConfig;
    $(`.${audioWrapper}`).css({
      background: `url(${ playImage }) no-repeat`
    });
    this.getTarget().play();
  },
  pause() {
    let { pauseImage } = audioConfig;
    $(`.${audioWrapper}`).css({
      background: `url(${ pauseImage }) no-repeat`
    });
    this.getTarget().pause();
  }


}