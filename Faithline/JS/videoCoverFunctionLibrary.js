function scaleVideoContainer() {
  var height = $(window).height();
  var unitHeight = parseInt(height) + 'px';
  $('.welcomeScreen').css('height',unitHeight);
}

function initBannerVideoSize(element) {
  $(element).each(function(){
    $(this).data('height', $(this).height());
    $(this).data('width', $(this).width());
  });
  scaleBannerVideoSize(element);
}

function scaleBannerVideoSize(element) {
  var windowWidth = $(window).width(),
  windowHeight = $(window).height(),
  videoWidth,
  videoHeight;
  $(element).each(function(){
    var videoAspectRatio = $(this).data('height')/$(this).data('width');
    $(this).width(windowWidth);
    if(windowWidth < 1000){
      videoHeight = windowHeight;
      videoWidth = videoHeight / videoAspectRatio;
      $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});
      $(this).width(videoWidth).height(videoHeight);
      $('.welcomeScreen .video-container video').addClass('no-video');
    } else {
      $(this).width(windowWidth);
      $(this).css({'margin-left' : '0px'});
    }
    $('.welcomeScreen .video-container video').addClass('fadeIn animated');
  });
}