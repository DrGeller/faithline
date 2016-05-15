/*初始化函数*/
var initializeFunction　= function(pageWidth,pageHeight,dateObj,Y,M,D) {
	var myDate = new Date(Y,M,1);
	var myDateWeekNum = myDate.getDay();
	if(myDateWeekNum>4) {
		$temp01 = pageHeight.indexOf('p');
	    $calendarBoxHeight = pageHeight.substring(0,$temp01);
	    $mainContainer.css({"width":pageWidth + 'px',"height":pageHeight + 'px'});
	    $calendarBox.css({"height":$calendarBoxHeight - 100 + 'px'});
	    $dateBoxWidth = (pageWidth - 7)/7;
	    $weekContainer.children().eq(0).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	    $weekContainer.children().eq(1).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	    $weekContainer.children().eq(2).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	    $weekContainer.children().eq(3).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	    $weekContainer.children().eq(4).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	    $weekContainer.children().eq(5).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	    $weekContainer.children().eq(6).css({"width":pageWidth/7 + 'px'});
	    $("<div id='dateContainer06' class='dateContainer'><div id='dateBox01' class='dateBox'><span></span></div><div id='dateBox02' class='dateBox'><span></span></div><div id='dateBox03' class='dateBox'><span></span></div><div id='dateBox04' class='dateBox'><span></span></div><div id='dateBox05' class='dateBox'><span></span></div><div id='dateBox06' class='dateBox'><span></span></div><div id='dateBox07' class='dateBox'><span></span></div></div>").appendTo($calendarBox);
	    $dateContainer = $('.dateContainer');
		$dateContainer06 = $('#dateContainer06');
		$dateBoxHeight = ($calendarBoxHeight - 132)/6;
	    $dateContainer.css({"height":Math.floor($dateBoxHeight) + 'px'});
	    $dateContainer01.css({"top":30 + 'px'});
	    $dateContainer02.css({"top":Math.floor($dateBoxHeight) + 30 + 'px'});
	    $dateContainer03.css({"top":Math.floor($dateBoxHeight)*2 + 30 + 'px'});
	    $dateContainer04.css({"top":Math.floor($dateBoxHeight)*3 + 30 + 'px'});
	    $dateContainer05.css({"top":Math.floor($dateBoxHeight)*4 + 30 + 'px'});
		$dateContainer06.css({"top":Math.floor($dateBoxHeight)*5 + 30 + 'px'});
		$dateBox = $('.dateBox');
	    $dateBox.css({"height":$dateBoxHeight - 1 + 'px',"border-top":"solid 1px #FFF"});
	    for(var a=0;a<=5;a++) { 
	        $dateContainer.eq(a).children('.dateBox').eq(0).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	        $dateContainer.eq(a).children('.dateBox').eq(1).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	        $dateContainer.eq(a).children('.dateBox').eq(2).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	        $dateContainer.eq(a).children('.dateBox').eq(3).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	        $dateContainer.eq(a).children('.dateBox').eq(4).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	        $dateContainer.eq(a).children('.dateBox').eq(5).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	        $dateContainer.eq(a).children('.dateBox').eq(6).css({"width":pageWidth/7 + 'px'});
		};
	    for(var a=0;a<=5;a++) {
		    for(var b=0;b<=6;b++) {
			    $dateContainer.eq(a).children('.dateBox').eq(b).children('span').html('test');
		    };
	    };
	} else {
		$temp01 = pageHeight.indexOf('p');
	    $calendarBoxHeight = pageHeight.substring(0,$temp01);
	    $mainContainer.css({"width":pageWidth + 'px',"height":pageHeight + 'px'});
	    $calendarBox.css({"height":$calendarBoxHeight - 100 + 'px'});
	    $dateBoxWidth = (pageWidth - 7)/7;
	    $weekContainer.children().eq(0).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	    $weekContainer.children().eq(1).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	    $weekContainer.children().eq(2).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	    $weekContainer.children().eq(3).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	    $weekContainer.children().eq(4).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	    $weekContainer.children().eq(5).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	    $weekContainer.children().eq(6).css({"width":pageWidth/7 + 'px'});
	    $dateBoxHeight = ($calendarBoxHeight - 132)/5;
	    $dateContainer.css({"height":Math.floor($dateBoxHeight) + 'px'});
	    $dateContainer01.css({"top":30 + 'px'});
	    $dateContainer02.css({"top":Math.round($dateBoxHeight) + 30 + 'px'});
	    $dateContainer03.css({"top":Math.round($dateBoxHeight)*2 + 30 + 'px'});
	    $dateContainer04.css({"top":Math.round($dateBoxHeight)*3 + 30 + 'px'});
	    $dateContainer05.css({"top":Math.round($dateBoxHeight)*4 + 30 + 'px'});
	    $dateBox.css({"height":$dateBoxHeight - 1 + 'px',"border-top":"solid 1px #FFF"});
	    for(var a=0;a<=4;a++) { 
	        $dateContainer.eq(a).children('.dateBox').eq(0).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	        $dateContainer.eq(a).children('.dateBox').eq(1).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	        $dateContainer.eq(a).children('.dateBox').eq(2).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	        $dateContainer.eq(a).children('.dateBox').eq(3).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	        $dateContainer.eq(a).children('.dateBox').eq(4).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	        $dateContainer.eq(a).children('.dateBox').eq(5).css({"width":$dateBoxWidth - 1 + 'px',"border-right":"solid 1px #FFF"});
	        $dateContainer.eq(a).children('.dateBox').eq(6).css({"width":pageWidth/7 + 'px'});
		};
	    for(var a=0;a<=4;a++) {
		    for(var b=0;b<=6;b++) {
			    $dateContainer.eq(a).children('.dateBox').eq(b).children('span').html('test');
		    };
	    };
	};
};
/*新建项目按钮函数*/
var newButtonFunction = function() {
	$newButton.bind('click',function() {
		if(!$mainContainer.children().hasClass('newButtonSettingBox')) {
			$('<div>'+'</div>').appendTo($mainContainer).addClass('newButtonSettingBox');
	        $newButtonSettingBox = $('.newButtonSettingBox');
		    $('<div>'+'</div>').appendTo($newButtonSettingBox).css({"width":"100%","height":"4px","position":"absolute","top":"0px","background-color":"#1e6c6d"});
		    $('<div>'+'<span>新建工单</span>'+'</div>').appendTo($newButtonSettingBox).addClass('boxTitle');
		    $("<div id='clientTypeDiv' class='selectInputDiv'><div class='selectInputName'><span>客户类型</span></div><div class='selectInputContainer'><div class='selectInputItemContainer'><div class='selectInputItem 1'><span>居民用户</span></div><div class='selectInputItem 2'><span>非居民用户</span></div></div></div><div class='selectInputItemNumber'>1</div></div>").appendTo($newButtonSettingBox);
		    $("<div id='clientNumberInputTextDiv' class='inputTextDiv'><div class='inputTextName'><span>客户编号</span></div><div class='inputTextContainer'><input type='text' id='clientNumberInput' class='inputText' /></div></div>").appendTo($newButtonSettingBox);
		    $("<div id='clientNameInputTextDiv' class='inputTextDiv'><div class='inputTextName'><span>客户名称</span></div><div class='inputTextContainer'><input type='text' id='clientNameInput' class='inputText' /></div></div>").appendTo($newButtonSettingBox);
		    $("<div id='clientAddressInputTextDiv' class='inputTextDiv'><div class='inputTextName'><span>客户地址</span></div><div class='inputTextContainer'><input type='text' id='clientAddressInput' class='inputText' /></div></div>").appendTo($newButtonSettingBox);
		    $("<div id='measuringTypeInputTextDiv' class='inputTextDiv'><div class='inputTextName'><span>计量方式</span></div><div class='inputTextContainer'><input type='text' id='measuringTypeInput' class='inputText' /></div></div>").appendTo($newButtonSettingBox);
		    $("<div id='voltageRankInputTextDiv' class='inputTextDiv'><div class='inputTextName'><span>电压等级</span></div><div class='inputTextContainer'><input type='text' id='voltageRankInput' class='inputText' /></div></div>").appendTo($newButtonSettingBox);
			$("<div id='workerNameInputTextDiv' class='inputTextDiv'><div class='inputTextName'><span>工单受理人</span></div><div class='inputTextContainer'><input type='text' id='workerNameInput' class='inputText' /></div></div>").appendTo($newButtonSettingBox);
			$selectInputContainer = $('.selectInputContainer');
			$selectInputItemContainer = $('.selectInputItemContainer');
			$selectInputItem = $('.selectInputItem');
			$selectInputItemNumber = $('.selectInputItemNumber');
			$selectInputItemContainer.children().eq(0).css({"top":"0px"});
			$selectInputItemContainer.children().eq(1).css({"top":"23px"});
			selectInputFunction  = function() {
				$selectInputItem.unbind('click');
				$selectInputItemContainer.animate({top:0},200);
				$selectInputContainer.animate({height:46},200,function() {
				    $selectInputItem.bind('click',function() {
						$selectInputItem.unbind('click');
					    if($(this).hasClass('1')) {
						    $selectInputItemNumber.html('1');
							$selectInputItemContainer.animate({top:0},200);
					    } else if($(this).hasClass('2')) {
						    $selectInputItemNumber.html('2');
							$selectInputItemContainer.animate({top:-23},200);
							
					    };
						$selectInputContainer.animate({height:23},200,function() {
							$selectInputItem.bind('click',selectInputFunction);
						});
				    });
			    });
			};
			$selectInputItem.bind('click',selectInputFunction);
	        $newButtonSettingBox.css({"left":(document.body.offsetWidth - 800)/2 + 'px'});
		    $newButtonSettingBox.fadeIn(200);
		    $('<div></div>').appendTo($newButtonSettingBox).addClass('cancelButton');
		    $('<div></div>').appendTo($newButtonSettingBox).addClass('submitButton');
		    $cancelButton = $('.cancelButton');
		    $cancelButton.bind('click',function() {
			    $newButtonSettingBox.fadeOut(200,function() {
				    $(this).remove();
			    });		
		    });
		    $submitButton = $('.submitButton');
		    $('<span>'+'提交'+'</span>').appendTo($submitButton);
		    $submitButton.bind('click',function() {
				$workerNameInput = $('#workerNameInput');
		        $clientNumberInput = $('#clientNumberInput');
		        $clientNameInput = $('#clientNameInput');
		        $clientAddressInput = $('#clientAddressInput');
		        $measuringTypeInput = $('#measuringTypeInput');
		        $voltageRankInput = $('#voltageRankInput');
	            $workerName = $workerNameInput.val();
	            $clientNumber = $clientNumberInput.val();
	            $clientName = $clientNameInput.val();
		        $clientAddress = $clientAddressInput.val();
	            $measuringType = $measuringTypeInput.val();
		        $voltageRank = $voltageRankInput.val();
				$clientType = $selectInputItemNumber.html();
		        if($workerName!=''&&$clientNumber!=''&&$clientName!=''&&$clientAddress!=''&&$measuringType!=''&&$voltageRank!=''&&$clientType!='') {
					var dateObj = new Date();
	                var thisYear = dateObj.getFullYear();
	                var thisMonth = dateObj.getMonth();
	                var thisDate = dateObj.getDate();
                    workInfoArray = [$workerName,$clientNumber,$clientName,$clientAddress,$measuringType,$voltageRank,$clientType,thisYear,thisMonth,thisDate];
					$cancelButton = $('.cancelButton');
	                $.ajax({
	                    url:"CalendarDataMange.php",
		                type:"POST",
			            data:{workerName:workInfoArray[0],clientNumber:workInfoArray[1],clientName:workInfoArray[2],clientAddress:workInfoArray[3],measuringType:workInfoArray[4],voltageRank:workInfoArray[5],clientType:workInfoArray[6],year:thisYear,month:thisMonth+1,day:thisDate,progressStatus:'dataSaveProgress'},
			            success: function(data,status) {
				            ajaxStatus = data;
							$.ajax({
	                            url:"CalendarDataMange.php",
		                        type:"POST",
	                            data:{dateBoxYear:thisYear,dateBoxMonth:thisMonth+1,dateBoxDay:thisDate,progressStatus:'achieveDataBaseLengthProgress'},
	                            success: function(data,status) {
			                        var eventDataLength = data;
									if(ajaxStatus == 'dataSaveOK') {
						                $cancelButton.click();
								        $today = $('.today');
								        if(!$today.children().hasClass('eventInfo')) {
									        $("<div class='eventInfo'>"+$clientName+"等"+eventDataLength+"位客户工单需要处理"+"</div>").appendTo($today);
											if($clientType=='1') {
												$("<div class='tipInfo_citizen'>"+"居民客户距超期还有2天"+"</div>").appendTo($today);
											    $("<div class='tipInfo_notCitizen'>"+"无非居民客户"+"</div>").appendTo($today);
											} else if($clientType=='2') {
												$("<div class='tipInfo_citizen'>"+"无居民客户"+"</div>").appendTo($today);
											    $("<div class='tipInfo_notCitizen'>"+"非居民客户距超期还有3天"+"</div>").appendTo($today);
											};
											$eventInfo = $today.children('.eventInfo');
										    $tipInfo_citizen = $today.children('.tipInfo_citizen');
										    $tipInfo_notCitizen = $today.children('.tipInfo_notCitizen');
								        } else {
											$eventInfo.html($clientName+"等"+eventDataLength+"位客户工单需要处理");
											if($clientType=='1') {
												$tipInfo_citizen.html("居民客户距超期还有2天");
											} else if($clientType=='2') {
												$tipInfo_notCitizen.html("非居民客户距超期还有3天");
											};
										};
										$eventInfo.css({"color":"#FFF"});
										$tipInfo_citizen.css({"color":"#FFF"});
										$tipInfo_notCitizen.css({"color":"#FFF"});
				                    };
		                        }
                            });
			            }
		            });
	            };
	        });
        };
	});
};
/*事件函数*/
eventFunction = function(Y,M,D,T,dateContainerEvnt,headle) {
	$.ajax({
	    url:"CalendarDataMange.php",
		type:"POST",
	    data:{dateBoxYear:Y,dateBoxMonth:M,dateBoxDay:D,todayDate:T,progressStatus:'achieveEventDataLengthProgress'},
	    success: function(data,status) {
			var eventDataLength = data;
			$tempDateNum=dateContainerEvnt.children().eq(headle).children('span').html().substring(0,dateContainerEvnt.children().eq(headle).children('span').html().indexOf('日'));
			if(eventDataLength!=0) {
	            //console.log(data);
			    $.ajax({
	                url:"CalendarDataMange.php",
		            type:"POST",
	                data:{dateBoxYear:Y,dateBoxMonth:M,dateBoxDay:D,progressStatus:'achieveEventProgress'},
	                success: function(data,status) {
						var eventData = $.parseJSON(data);
						//console.log(data);
						if(!dateContainerEvnt.children().eq(headle).children().hasClass('eventInfo')) {
							$("<div class='eventInfo'></div>").appendTo(dateContainerEvnt.children().eq(headle));
							$("<div class='tipInfo_citizen'>无居民客户工单</div>").appendTo(dateContainerEvnt.children().eq(headle));
							$("<div class='tipInfo_notCitizen'>无非居民客户工单</div>").appendTo(dateContainerEvnt.children().eq(headle));
						} else {
							dateContainerEvnt.children().eq(headle).children('.tipInfo_citizen').html('无居民客户工单');
							dateContainerEvnt.children().eq(headle).children('.tipInfo_notCitizen').html('无非居民客户工单');
						};
						$eventInfo = dateContainerEvnt.children().eq(headle).children('.eventInfo');
					    $eventInfo.html(eventData[eventDataLength-1]['clientName']+"等"+eventDataLength+"位客户工单需要处理");
						$tipInfo_citizen = dateContainerEvnt.children().eq(headle).children('.tipInfo_citizen');
						$tipInfo_notCitizen = dateContainerEvnt.children().eq(headle).children('.tipInfo_notCitizen');
						if(document.body.offsetWidth<1600&&document.body.offsetWidth>1366) {
							$dateContainer = $('.dateContainer');
		                    $dateContainer.children().css({"font-size":"11px"});
		                    $eventInfo.css({"height":"15px","top":"25px"});
		                    $tipInfo_citizen.css({"height":"15px","top":"45px"});
		                    $tipInfo_notCitizen.css({"height":"15px","top":"65px"});
	                    } else if(document.body.offsetWidth==1152) {
							$dateContainer = $('.dateContainer');
		                    $dateContainer.children().css({"font-size":"10px"});
		                    $eventInfo.css({"height":"15px","top":"25px"});
		                    $tipInfo_citizen.css({"height":"15px","top":"45px"});
		                    $tipInfo_notCitizen.css({"height":"15px","top":"65px"});
						} else if(document.body.offsetWidth==1024) {
							$dateContainer = $('.dateContainer');
		                    $dateContainer.children().css({"font-size":"10px"});
		                    $eventInfo.css({"height":"15px","top":"25px"});
		                    $tipInfo_citizen.css({"height":"15px","top":"50px"});
		                    $tipInfo_notCitizen.css({"height":"15px","top":"75px"});
						}
						if(!dateContainerEvnt.children().eq(headle).hasClass('today')) {
							$eventInfo.css({"color":"#666"});
							$tipInfo_citizen.css({"color":"#666"});
							$tipInfo_notCitizen.css({"color":"#666"});
						} else {
							$eventInfo.css({"color":"#FFF"});
							$tipInfo_citizen.css({"color":"#FFF"});
							$tipInfo_notCitizen.css({"color":"#FFF"});
						};
						for(var i=0;i<eventDataLength;i++) {
							if(eventData[i]['clientType']==1) {
							    if(eventData[i]['deadlineNumber']==0){
									if(eventData[i]['completeStatus']=='yes') {
										$tipInfo_citizen.html('居民客户工单已完成');
									} else if(eventData[i]['completeStatus']=='no') {
										$tipInfo_citizen.html('居民客户工单已超时限请立即处理');
										dateContainerEvnt.children().eq(headle).css({"background-color":"#e53031"});
							            dateContainerEvnt.children().eq(headle).children().css({"color":"#FFF"});
									};
						        } else if(eventData[i]['deadlineNumber']==1) {
									if(eventData[i]['completeStatus']=='yes') {
										$tipInfo_citizen.html('居民客户工单已完成');
									} else if(eventData[i]['completeStatus']=='no') {
										$tipInfo_citizen.html('居民客户工单超时限剩余'+eventData[i]['deadlineNumber']+'天');
										dateContainerEvnt.children().eq(headle).css({"background-color":"#e9c20f"});
							            dateContainerEvnt.children().eq(headle).children().css({"color":"#FFF"});
									};
						        } else {
									if(eventData[i]['completeStatus']=='yes') {
										$tipInfo_citizen.html('居民客户工单已完成');
									} else if(eventData[i]['completeStatus']=='no') {
										$tipInfo_citizen.html('居民客户工单超时限剩余'+eventData[i]['deadlineNumber']+'天');
									};
						        };
						    } else if(eventData[i]['clientType']==2) {
							    if(eventData[i]['deadlineNumber']==0){
									if(eventData[i]['completeStatus']=='yes') {
										$tipInfo_notCitizen.html('非居民客户工单已完成');
									} else if(eventData[i]['completeStatus']=='no') {
										$tipInfo_notCitizen.html('非居民客户工单已超时限请立即处理');
							            dateContainerEvnt.children().eq(headle).css({"background-color":"#e53031"});
							            dateContainerEvnt.children().eq(headle).children().css({"color":"#FFF"});
									};
						        } else if(eventData[i]['deadlineNumber']==1) {
									if(eventData[i]['completeStatus']=='yes') {
										$tipInfo_notCitizen.html('非居民客户工单已完成');
									} else if(eventData[i]['completeStatus']=='no') {
										$tipInfo_notCitizen.html('非居民客户工单超时限剩余'+eventData[i]['deadlineNumber']+'天');
							            dateContainerEvnt.children().eq(headle).css({"background-color":"#e9c20f"});
							            dateContainerEvnt.children().eq(headle).children().css({"color":"#FFF"});
									};
						        } else {
									if(eventData[i]['completeStatus']=='yes') {
										$tipInfo_notCitizen.html('非居民客户工单已完成');
									} else if(eventData[i]['completeStatus']=='no') {
										$tipInfo_notCitizen.html('非居民客户工单超时限剩余'+eventData[i]['deadlineNumber']+'天');
									};
						        };
						    };
						};
		            }
                });
			};
		}
    });
};
/*日历函数*/
var calendarFunction = function(dateObj,Y,M,D) {
	var myDate = new Date(Y,M,1);
	var myDateWeekNum = myDate.getDay();
	$dateContainer01.children().eq(myDateWeekNum).children('span').html(myDate.getDate() + '日');
    $calendarInfoBox_yearValue.html(Y);
    $calendarInfoBox_yearValue.css({"top":(50 - $calendarInfoBox_yearValue.height())/2 + 'px'});
    $calendarInfoBox_monthValue.html(M+1);
	$calendarInfoBox_monthValue.css({"top":(50 - $calendarInfoBox_monthValue.height())/2 + 'px'});
	$calendarInfoBox_month.css({"left":$calendarInfoBox_monthValue.width()-1+105+'px'});
	$dateBox = $('.dateBox');
	$dateBox.children('div').empty();
	$lastMonth = $('.lastMonth');
	$today = $('.today');
	$nextMonth = $('.nextMonth');
	$lastMonth.removeClass('lastMonth');
	$today.removeClass('today');
	$lastMonth.removeClass('nextMonth');
	if(myDateWeekNum>4) {
		aa=5;
	} else {
		aa=4;
	};
	for(var a=0;a<=aa;a++) {
		if(a==0) {
			$dateContainerTemp = $('#dateContainer0'+(a+1));
			var c=1;
			var d=1;
		    for(var b=0;b<=6;b++) {
				if(b<myDateWeekNum) {
					if(M==4||M==6||M==9||M==11) {
				        $dateContainerTemp.children().eq(myDateWeekNum-1-b).children('span').html(30 - b + '日');
						$dateContainerTemp.children().eq(myDateWeekNum-1-b).css({"background-color":"#e9e9e9"});
						$dateContainerTemp.children().eq(myDateWeekNum-1-b).children('span').css({"color":"#666"});
						$dateContainerTemp.children().eq(myDateWeekNum-1-b).addClass('lastMonth');
						$weekContainer.children().eq(myDateWeekNum-1-b).css({"background-color":"#e9e9e9"});
					} else if(M==0||M==1||M==3||M==5||M==7||M==8||M==10) {
						$dateContainerTemp.children().eq(myDateWeekNum-1-b).children('span').html(31 - b + '日');
						$dateContainerTemp.children().eq(myDateWeekNum-1-b).css({"background-color":"#e9e9e9"});
						$dateContainerTemp.children().eq(myDateWeekNum-1-b).children('span').css({"color":"#666"});
						$dateContainerTemp.children().eq(myDateWeekNum-1-b).addClass('lastMonth');
						$weekContainer.children().eq(myDateWeekNum-1-b).css({"background-color":"#e9e9e9"});
					} else if(M==2) {
						if((Y%4==0&&Y%100!=0)||(Y%400==0)) {
						    $dateContainerTemp.children().eq(myDateWeekNum-1-b).children('span').html(29 - b + '日');
						    $dateContainerTemp.children().eq(myDateWeekNum-1-b).css({"background-color":"#e9e9e9"});
							$dateContainerTemp.children().eq(myDateWeekNum-1-b).children('span').css({"color":"#666"});
							$dateContainerTemp.children().eq(myDateWeekNum-1-b).addClass('lastMonth');
							$weekContainer.children().eq(myDateWeekNum-1-b).css({"background-color":"#e9e9e9"});
						} else {
							$dateContainerTemp.children().eq(myDateWeekNum-1-b).children('span').html(28 - b + '日');
						    $dateContainerTemp.children().eq(myDateWeekNum-1-b).css({"background-color":"#e9e9e9"});
							$dateContainerTemp.children().eq(myDateWeekNum-1-b).children('span').css({"color":"#666"});
							$dateContainerTemp.children().eq(myDateWeekNum-1-b).addClass('lastMonth');
							$weekContainer.children().eq(myDateWeekNum-1-b).css({"background-color":"#e9e9e9"});
						};
					};
	                $temp03 = $dateContainerTemp.children().eq(b).children('span').html().substring(0,$dateContainerTemp.children().eq(b).children('span').html().indexOf('日'));
					if($calendarInfoBox_monthValue.html()=='1') {
						$yearValue=$calendarInfoBox_yearValue.html()-1;
						$monthValue='12';
					} else {
						$yearValue=$calendarInfoBox_yearValue.html();
						$monthValue=$calendarInfoBox_monthValue.html()-1;
					};
					eventFunction($yearValue,$monthValue,$temp03,dateObj.getDate(),$dateContainerTemp,b);
				} else if(b==myDateWeekNum) {
				    temp01 = $dateContainerTemp.children().eq(6).children('span').html();
					temp02 = temp01.substring(0,temp01.indexOf('日'));
					var temp04 = $dateContainerTemp.children().eq(b).children('span').html();
				    var temp05 = temp04.substring(0,temp04.indexOf('日'));
				    if(temp05==dateObj.getDate()&&M==dateObj.getMonth()&&Y==dateObj.getFullYear()) {
					    $dateContainerTemp.children().eq(b).css({"background-color":"#999"});
					    $dateContainerTemp.children().eq(b).children('span').css({"color":"#FFF"});
						$dateContainerTemp.children().eq(b).addClass('today');
				    } else {
						$dateContainerTemp.children().eq(b).css({"background-color":"#dbdbdb"});
						$dateContainerTemp.children().eq(b).children('span').css({"color":"#666"});
						$weekContainer.children().eq(b).css({"background-color":"#dbdbdb"});
					};
	                temp03 = $dateContainerTemp.children().eq(b).children('span').html().substring(0,$dateContainerTemp.children().eq(b).children('span').html().indexOf('日'));
					eventFunction($calendarInfoBox_yearValue.html(),$calendarInfoBox_monthValue.html(),temp03,dateObj.getDate(),$dateContainerTemp,b);
				} else if(b>myDateWeekNum) {
					$dateContainerTemp.children().eq(b).css({"background-color":"#dbdbdb"});
					$dateContainerTemp.children().eq(b).children('span').css({"color":"#666"});
					$weekContainer.children().eq(b).css({"background-color":"#dbdbdb"});
					$dateContainerTemp.children().eq(b).children('span').html(myDate.getDate()+c+'日');
					c++;
					temp01 = $dateContainerTemp.children().eq(6).children('span').html();
					temp02 = temp01.substring(0,temp01.indexOf('日'));
					d++;
					var temp04 = $dateContainerTemp.children().eq(b).children('span').html();
				    var temp05 = temp04.substring(0,temp04.indexOf('日'));
				    if(temp05==dateObj.getDate()&&M==dateObj.getMonth()&&Y==dateObj.getFullYear()) {
					    $dateContainerTemp.children().eq(b).css({"background-color":"#999"});
					    $dateContainerTemp.children().eq(b).children('span').css({"color":"#FFF"});
						$dateContainerTemp.children().eq(b).addClass('today');
				    };
	                temp06 = $dateContainerTemp.children().eq(b).children('span').html().substring(0,$dateContainerTemp.children().eq(b).children('span').html().indexOf('日'));
					eventFunction($calendarInfoBox_yearValue.html(),$calendarInfoBox_monthValue.html(),temp06,dateObj.getDate(),$dateContainerTemp,b);
				};
		    };
		} else if(a!=0) {
			var c = 1;
			var e = 1;
			$dateContainerTemp = $('#dateContainer0'+(a+1));
			var temp03 = temp02;
			for(var b=0;b<=6;b++) {
				if(M==0||M==2||M==4||M==6||M==7||M==9||M==11) {
					if(d<31) {
				        $dateContainerTemp.children().eq(b).children('span').html(temp03-1+1+c +'日');
					    $dateContainerTemp.children().eq(b).css({"background-color":"#dbdbdb"});
						$dateContainerTemp.children().eq(b).children('span').css({"color":"#666"});
				        var temp04 = $dateContainerTemp.children().eq(b).children('span').html();
				        var temp05 = temp04.substring(0,temp04.indexOf('日'));
				        if(temp05==dateObj.getDate()&&M==dateObj.getMonth()&&Y==dateObj.getFullYear()) {
					        $dateContainerTemp.children().eq(b).css({"background-color":"#999"});
					        $dateContainerTemp.children().eq(b).children('span').css({"color":"#FFF"});
							$dateContainerTemp.children().eq(b).addClass('today');
				        };
						c++;
				        d++;
	                    temp06=$dateContainerTemp.children().eq(b).children('span').html().substring(0,$dateContainerTemp.children().eq(b).children('span').html().indexOf('日'));
						eventFunction($calendarInfoBox_yearValue.html(),$calendarInfoBox_monthValue.html(),temp06,dateObj.getDate(),$dateContainerTemp,b);
				    } else {
						$dateContainerTemp.children().eq(b).children('span').html( e + '日');
					    $dateContainerTemp.children().eq(b).css({"background-color":"#e9e9e9"});
						$dateContainerTemp.children().eq(b).addClass('nextMonth');
				        d++;
						e++;
	                    temp06=$dateContainerTemp.children().eq(b).children('span').html().substring(0,$dateContainerTemp.children().eq(b).children('span').html().indexOf('日'));
						if($calendarInfoBox_monthValue.html()=='12') {
						    $yearValue=$calendarInfoBox_yearValue.html()-1+2;
						    $monthValue='1';
					    } else {
						    $yearValue=$calendarInfoBox_yearValue.html();
						    $monthValue=$calendarInfoBox_monthValue.html()-1+2;
					    };
						eventFunction($yearValue,$monthValue,temp06,dateObj.getDate(),$dateContainerTemp,b);
					};
		        } else if(M==3||M==5||M==8||M==10) {
					if(d<30) {
						$dateContainerTemp.children().eq(b).children('span').html(temp03-1+1+c+'日');
				        $dateContainerTemp.children().eq(b).css({"background-color":"#dbdbdb"});
						$dateContainerTemp.children().eq(b).children('span').css({"color":"#666"});
				        var temp04 = $dateContainerTemp.children().eq(b).children('span').html();
				        var temp05 = temp04.substring(0,temp04.indexOf('日'));
				        if(temp05==dateObj.getDate()&&M==dateObj.getMonth()&&Y==dateObj.getFullYear()) {
					        $dateContainerTemp.children().eq(b).css({"background-color":"#999"});
					        $dateContainerTemp.children().eq(b).children('span').css({"color":"#FFF"});
							$dateContainerTemp.children().eq(b).addClass('today');
				        };
						c++;
				        d++;
	                    temp06=$dateContainerTemp.children().eq(b).children('span').html().substring(0,$dateContainerTemp.children().eq(b).children('span').html().indexOf('日'));
						eventFunction($calendarInfoBox_yearValue.html(),$calendarInfoBox_monthValue.html(),temp06,dateObj.getDate(),$dateContainerTemp,b);
					} else {
						$dateContainerTemp.children().eq(b).children('span').html( e + '日');
						$dateContainerTemp.children().eq(b).css({"background-color":"#e9e9e9"});
						$dateContainerTemp.children().eq(b).addClass('nextMonth');
				        d++;
						e++;
	                    temp06=$dateContainerTemp.children().eq(b).children('span').html().substring(0,$dateContainerTemp.children().eq(b).children('span').html().indexOf('日'));
						$yearValue=$calendarInfoBox_yearValue.html();
						$monthValue=$calendarInfoBox_monthValue.html()-1+2;
						eventFunction($yearValue,$monthValue,temp06,dateObj.getDate(),$dateContainerTemp,b);
					};
				} else if(M==1) {
				    if((Y%4==0&&Y%100!=0)||(Y%400==0)) {
						if(d<29) {
						    $dateContainerTemp.children().eq(b).children('span').html(temp03-1+1+c+'日');
						    $dateContainerTemp.children().eq(b).css({"background-color":"#dbdbdb"});
							$dateContainerTemp.children().eq(b).children('span').css({"color":"#666"});
				            var temp04 = $dateContainerTemp.children().eq(b).children('span').html();
				            var temp05 = temp04.substring(0,temp04.indexOf('日'));
				            if(temp05==dateObj.getDate()&&M==dateObj.getMonth()&&Y==dateObj.getFullYear()) {
					            $dateContainerTemp.children().eq(b).css({"background-color":"#999"});
					            $dateContainerTemp.children().eq(b).children('span').css({"color":"#FFF"});
								$dateContainerTemp.children().eq(b).addClass('today');
				            };
						    c++;
				            d++;
	                        temp06=$dateContainerTemp.children().eq(b).children('span').html().substring(0,$dateContainerTemp.children().eq(b).children('span').html().indexOf('日'));
							eventFunction($calendarInfoBox_yearValue.html(),$calendarInfoBox_monthValue.html(),temp06,dateObj.getDate(),$dateContainerTemp,b);
					    } else {
						    $dateContainerTemp.children().eq(b).children('span').html( e + '日');
						    $dateContainerTemp.children().eq(b).css({"background-color":"#e9e9e9"});
							$dateContainerTemp.children().eq(b).addClass('nextMonth');
				            d++;
						    e++;
	                        temp06=$dateContainerTemp.children().eq(b).children('span').html().substring(0,$dateContainerTemp.children().eq(b).children('span').html().indexOf('日'));
							eventFunction($calendarInfoBox_yearValue.html(),$calendarInfoBox_monthValue.html()-1+2,temp06,dateObj.getDate(),$dateContainerTemp,b);
					    };
					} else {
					    if(d<28) {
						    $dateContainerTemp.children().eq(b).children('span').html(temp03 - 1 + 1 + c +'日');
						    $dateContainerTemp.children().eq(b).css({"background-color":"#dbdbdb"});
							$dateContainerTemp.children().eq(b).children('span').css({"color":"#666"});
				            var temp04 = $dateContainerTemp.children().eq(b).children('span').html();
				            var temp05 = temp04.substring(0,temp04.indexOf('日'));
				            if(temp05==dateObj.getDate()&&M==dateObj.getMonth()&&Y==dateObj.getFullYear()) {
					            $dateContainerTemp.children().eq(b).css({"background-color":"#999"});
					            $dateContainerTemp.children().eq(b).children('span').css({"color":"#FFF"});
								$dateContainerTemp.children().eq(b).addClass('today');
				            };
						    c++;
				            d++;
	                        temp06=$dateContainerTemp.children().eq(b).children('span').html().substring(0,$dateContainerTemp.children().eq(b).children('span').html().indexOf('日'));
							eventFunction($calendarInfoBox_yearValue.html(),$calendarInfoBox_monthValue.html(),temp06,dateObj.getDate(),$dateContainerTemp,b);
					    } else {
						    $dateContainerTemp.children().eq(b).children('span').html( e + '日');
						    $dateContainerTemp.children().eq(b).css({"background-color":"#e9e9e9"});
							$dateContainerTemp.children().eq(b).addClass('nextMonth');
				            d++;
						    e++;
							temp06=$dateContainerTemp.children().eq(b).children('span').html().substring(0,$dateContainerTemp.children().eq(b).children('span').html().indexOf('日'));
							eventFunction($calendarInfoBox_yearValue.html(),$calendarInfoBox_monthValue.html()-1+2,temp06,dateObj.getDate(),$dateContainerTemp,b);
					    };
					    
				    };
				};
				var temp01 = $dateContainerTemp.children().eq(6).children('span').html();
				var temp02 = temp01.substring(0,temp01.indexOf('日'));
		    };
	    };
	};
};
/*日历按钮函数*/
var monthButtonFunction = function() {
	$lastMonthButton.bind('mouseover',function() {
		$(this).css({"border-right-color":"#434343"});
	});
	$lastMonthButton.bind('mouseleave',function() {
		$(this).css({"border-right-color":"#999"});
	});
	$nextMonthButton.bind('mouseover',function() {
		$(this).css({"border-left-color":"#434343"});
	});
	$nextMonthButton.bind('mouseleave',function() {
		$(this).css({"border-left-color":"#999"});
	});
};