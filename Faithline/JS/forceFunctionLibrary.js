function initFunction() {
  $mainContainer.hide();
  $bannerTitle.css('top', parseInt($bannerLogo.css('top'))+100+'px');
  if(browser.versions.ios) {
    $('.video-container').addClass('touch');
    
  }
}

function newCardFun() {
  $userCard.after('<div id="01" class="mdl-card mdl-cell mdl-cell--12-col mdl-shadow--2dp"></div>');
  $('#01').hide();
  $('#01').fadeIn(300);
  if($layoutContent.scrollTop()<=250) {
    $layoutContent.animate({scrollTop: 373}, 500);
  } else {
    $layoutContent.animate({scrollTop: 373}, 500);
  }
}

function newButtonControlFun() {
  $layoutContent.scroll(function() {
    if($layoutContent.scrollTop()>250) {
      $newButton.hide();
      var a=$functionArea.width()+(parseInt($functionArea.css('margin-left')));
      if($mainContainer.width()>=(a+142)) {
        $newButton_scrolled.css({
          'left': a+86+'px',
          'top': '10%'
        }).fadeIn(300);
      } else if($mainContainer.width()<(a+142)) {
        $newButton_scrolled.css({
          'left': a-90+'px',
          'top': $mainContainer.height()-106+'px'
        }).addClass('mdl-shadow--2dp').fadeIn(300);
      };
    } else if($layoutContent.scrollTop()<=250) {
      $newButton_scrolled.hide();
      $newButton.fadeIn(300);
    };
  });
  $newButton.bind('click', newCardFun);
  $newButton_scrolled.bind('click', newCardFun);
}

function forceZoneControlFun() {
  var $media = $('.forceZone .mdl-card__media');
  var $supportingText = $('.forceZone .mdl-card__supporting-text');

}
    
function userCardControlFun() {

}

var browser = {    
  versions: function() {            
    var u = navigator.userAgent, app = navigator.appVersion;            
    return {                
      trident: u.indexOf('Trident') > -1, //IE内核                
      presto: u.indexOf('Presto') > -1, //opera内核                
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核                
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核                
      mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端                
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端                
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器                
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器                
      iPad: u.indexOf('iPad') > -1, //是否iPad                
      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部            
    }
  }()
}