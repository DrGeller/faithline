function initFunction() {
  $mainContainer.hide();
  $bannerTitle.css('top', parseInt($bannerLogo.css('top'))+100+'px');
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