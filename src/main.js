import Mars from './entry/Mars';

Mars.init({
  vertical: false,
  signature: {},
  vibrateCallback: function(){
  },
  music: {
    src: 'https://activity-res.imeihao.shop/bath/bg.mp3',
    pauseImage: 'https://activity-res.imeihao.shop/bath/mute.png',
    playImage: 'https://activity-res.imeihao.shop/bath/play.png',
  },
  mounted: function(){
    // this.setShareInfo({
    //   link: "",
    //   imgUrl: "",
    //   title: "",
    //   desc: "",
    //   success: function(){ },
    //   cancel: function(){ }
    // });
    // this.openShareDialog();
    //
    // setTimeout(_ => {
    //   this.closeShareDialog();
    // }, 2000);
  }
});
