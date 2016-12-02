//Core.js
var clientData = {
  scrW: screen.width,
  scrH: screen.height,
  winW: $('body').width(),
  winH: $('body').height(),
  aspectRatio: Math.round(screen.width/screen.height*10)/10,
  winAspectRation: Math.round($('body').width()/$('body').height()*10)/10 
}
if(clientData.aspectRatio=="1.33") {
  //屏幕宽高比为4:3
} else if(clientData.aspectRatio=="1.78") {
  //屏幕宽高比为16:9
} else if(clientData.aspectRatio=="1.6") {
  //屏幕宽高比为16:10
}
//核心函数
Core = {
  AJAXcon: function(obj,progressStatus,callbackFun) {
    obj.projectName = $('title').text();
    obj.progressStatus = progressStatus;
    $.ajax({
      url: '../faithline Core/Core.php',
      type: 'POST',
      data: obj,
      success: callbackFun
    })
  }
}
//初始化
Core.AJAXcon(clientData,'init',function(data) {
  console.log(data);
});