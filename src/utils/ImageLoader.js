function ImageLoader (url, options) {//图片加载器
  var img = new Image();
  img.addEventListener('load', function(){
    if (options && options.success != undefined){
      options.success.call();
    }
  });
  img.addEventListener('error', function () {
    if (options && options.error != undefined){
      options.error.call();
    }
  });
  img.src = url;
}

export default ImageLoader;
