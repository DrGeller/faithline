/*菜单按钮函数*/
var menuFunction = function(evnt,motionFunctionName) {
	evnt.bind('mouseover',function() {
		$(this).css({"background-color":"#434343"});
	});
	evnt.bind('mouseleave',function() {
		$(this).css({"background-color":"transparent"});
	});
	motionFunctionName();
};
/*垂直居中函数*/
verticalCenterFunction = function(evnt01,evnt02) {
	/*evnt01为父元素,evnt02为子元素*/
	evnt01Height = Math.round(evnt01.css("height").substring(0,evnt01.css("height").indexOf('p')));
	evnt02Height = Math.round(evnt02.css("height").substring(0,evnt01.css("height").indexOf('p')));
	evnt02.css({"top":Math.round((evnt01Height-evnt02Height)/2)+'px'});
};