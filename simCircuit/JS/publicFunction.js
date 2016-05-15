//公共函数

var hoverFun = function(evnt01,evnt02,mouseoverFun,mouseleaveFun) {
	evnt02.bind('mouseover',function() {
		mouseoverFun(evnt01);
	});
	evnt02.bind('mouseleave',function() {
		mouseleaveFun(evnt01);
	});
};

var addDivFun = function(oevnt,className,htmlString) {
    $('<div>'+'</div>').appendTo(oevnt).addClass(className).html(htmlString);
};
	
var tag01 = 0;
var addFormsFun = function(cevnt,eventHandler,oevnt,className,headlineString,htmlString,funName,multitermTagSwitcher,formsSwitcherEnable) {/*cevnt为点击元素,oevnt为对象元素即所添加元素的父级元素,funName为回调函数函数名,multitermTagSwitch为重复标记开关（1为打开,0为关闭）*/
    cevnt.bind(eventHandler,function() {
		if($projectNameBox.children('span').html()==''&&formsSwitcherEnable==1) {
			formsSwitcher=0;
		} else {
			formsSwitcher=1;
		};
        if(!$mainContainer.children().hasClass(className)&&formsSwitcher) {
			if(multitermTagSwitcher == 1) {
		        if(tag01 == 0) {
			        tag01 = 1;
		        } else {
			        return false;
		        };
			};
		    addDivFun(oevnt,className,htmlString);
	        var $classEvnt = $('.'+className);
		    $classEvnt.fadeIn(200);
		    addDivFun($classEvnt,'headline',headlineString);
	        addDivFun($classEvnt,'cancelButton');
			$cancelButton = $('.'+className+' '+'.cancelButton')
		    $cancelButton.bind('click',function() {
			    tag01 = 0;
			    $classEvnt.fadeOut(200,function()　{
				    $classEvnt.remove();
			    });
            });
		    funName();
        };
    });
};
	
var getCSSNumFun = function(oevnt,cssItem) {
	var a = oevnt.css(cssItem);
	var b = a.indexOf('p');
    var c = a.substring(0,b);
	var d = parseInt(c);
	return d;
};
	
var addSelectBoxFun = function(oevnt,selectBoxClassName,selectBoxItemContainerClassName,selectBoxItemClassName,itemNum,itemHeight,selectBoxHtmlString,tagDivClass,funName,callbackFunName) {
	addDivFun(oevnt,selectBoxClassName);
	if(!$mainContainer.children().hasClass(tagDivClass)) {
		addDivFun($mainContainer,tagDivClass);
	};
	$tagDiv = $('.' + tagDivClass);
	$tagDiv.addClass('tagDiv');
	$selectBox = $('.' + selectBoxClassName);
	addDivFun($selectBox,selectBoxItemContainerClassName,selectBoxHtmlString);
	$selectBoxItemContainer = $('.' + selectBoxItemContainerClassName);
	var a = parseInt(itemNum,10);
	var b = a * itemHeight;
	$selectBoxItemContainer.css({"height":b+'px'});
	for(var i=1;i<=itemNum;i++) {
		$selectBoxItemContainer.children().eq(i).css({"top":(i*itemHeight)+'px'});
	};
	$selectBoxItem = $('.' + selectBoxItemClassName);
	selectBoxItemClickFun = function() {
		$selectBoxItem.unbind('click');
		$selectBoxItemContainer.animate({top:0},200);
		$selectBox.animate({height:b},200,function() {
		    $selectBoxItem.bind('click',function() {
				$selectBoxItem.unbind('click');
				for(var j=1;j<=itemNum;j++) {
					if($(this).hasClass(j)) {
						var temp01 = j+'px';
						var temp02 = temp01.indexOf('p');
					    var temp03 = temp01.substring(0,temp02);
						$tagDiv.html("<div class='tagContent'>"+temp03+"</div>");
					};
					funName();
				};
			    var c = $(this).css('top');
	            var d = c.indexOf('p');
		        var e = c.substring(0,b);
			    var f = parseInt(e);
			    $selectBoxItemContainer.animate({top:-f},{duration:200});
			    $selectBox.animate({height:itemHeight},200,function() {
					$selectBoxItem.bind('click',selectBoxItemClickFun);
				});
		    });
		});
    };
	$selectBoxItem.bind('click',selectBoxItemClickFun);
	callbackFunName();
};
var tagNum01 = 1;
var elementBoxContentItemDraggable = function(cevnt,oevnt,rangeArray,elementClassName,elementInnerHtmlString,elementInnerHtmlFun,elementSettingBoxClassName,elementSettingBoxHeadlineString,elementSettingBoxHtmlString,elementSettingBoxFun,multitermSwitcher) {
	cevnt.draggable({
	    helper:'clone',
		appendTo:oevnt,
		containment:rangeArray,
		stop:function(event,ui) {
			if(ui.position.left<220||ui.position.left>930) {
				if(!oevnt.children().hasClass(elementClassName)&&multitermSwitcher==0) {
				    addDivFun(oevnt,elementClassName,elementInnerHtmlString);
					var $tempElement01 = $('.' + elementClassName);
					elementInnerHtmlFun();
					$tempElement01.addClass('element');
					$tempElement01.css({"left":ui.offset.left,"top":ui.offset.top});
					$tempElement01.draggable({containment:rangeArray});
					tempFun01 = function() {
				        $tempElement02 = $('.' + elementSettingBoxClassName);
						var aa = $tempElement01.css('left');
						var bb = aa.indexOf('p');
						var cc = aa.substring(0,bb);
						var dd = parseInt(cc);
						if(dd<500) {
						    var ee = dd + 220;
					    } else if(dd>=500&&dd<=850) {
							var ee = dd - 100;
						} else if(dd>850) {
							var ee = dd - 520;
						};
						$tempElement02.css({"left":ee+'px'});
					    $tempElement02.addClass('draggableElement');
						$tempElement02.draggable({containment:'window'});
						elementSettingBoxFun();
					};
					addFormsFun($tempElement01,'dblclick',oevnt,elementSettingBoxClassName,elementSettingBoxHeadlineString,elementSettingBoxHtmlString,tempFun01,0,0);
				} else if(multitermSwitcher==1) {
					addDivFun(oevnt,'element'+tagNum01.toString(),elementInnerHtmlString+"<div class='elementID'>"+tagNum01+"</div>");
					var $tempElement01 = $('.'+'element'+tagNum01.toString());
					$tempElement01.children().eq(0).css({"left":"-6px","top":"24px"});
					$tempElement01.children().eq(1).css({"right":"-6px","top":"24px"});
					$tempElement01.addClass(elementClassName);
					$tempElement01.addClass('element');
					$tempElement01.css({"left":ui.offset.left,"top":ui.offset.top});
					$tempElement01.draggable({containment:rangeArray});
					$tempElement01.bind('dblclick',function() {
						tempElementID = $(this).children('.elementID').html();
					    addDivFun(oevnt,elementSettingBoxClassName+tempElementID,elementSettingBoxHtmlString);
	                    var $classEvnt = $('.'+elementSettingBoxClassName+tempElementID);
		                $classEvnt.addClass(elementSettingBoxClassName).fadeIn(200);
		                addDivFun($classEvnt,'headline',elementSettingBoxHeadlineString+'<span>'+tempElementID+'</span>');
	                    addDivFun($classEvnt,'cancelButton');
			            $cancelButton = $('.'+elementSettingBoxClassName+tempElementID+' '+'.cancelButton')
		                $cancelButton.bind('click',function() {
			                $classEvnt.fadeOut(200,function()　{
				                $classEvnt.remove();
			                });
                        });
						$RValue = $('#RValue');
					    $XValue = $('#XValue');
						$RValue.focus();
					    $electricityTransmationModuleSettingBoxSubmitButton = $('.electricityTransmationModuleSettingBoxSubmitButton');
						$element_electricityTransmationModule = $('.'+'element'+tempElementID+'.'+'element_electricityTransmationModule');
					    $electricityTransmationModuleSettingBoxSubmitButton.bind('click',function() {
						    if($RValue.val()!=''&&$XValue.val()!='') {
								var elementPosition = [$element_electricityTransmationModule.css("left"),$element_electricityTransmationModule.css("top")];
						        $.ajax({
						            url:'Data_manage.php',
					                type:'POST',
					                data:{RValue:$RValue.val(),XValue:$XValue.val(),elementID:tempElementID,projectData_name:$projectNameBox.children('span').html(),elementPositionLeft:elementPosition[0],elementPositionTop:elementPosition[1],progressStatus:'electricityTransmationModuleDataCache'},
					                success: function(data,status) {
								        $cancelButton.click();
								        console.log(data);
					                }
					            })
					        }
					    });
						var aa = $tempElement01.css('left');
						var bb = aa.indexOf('p');
						var cc = aa.substring(0,bb);
						var dd = parseInt(cc);
						if(dd<500) {
						    var ee = dd + 220;
					    } else if(dd>=500&&dd<=850) {
							var ee = dd - 100;
						} else if(dd>850) {
							var ee = dd - 520;
						};
						$classEvnt.css({"left":ee+'px'});
					    $classEvnt.addClass('draggableElement');
						$classEvnt.draggable({containment:'window'});
						elementSettingBoxFun();
					});
					tagNum01++;
				} else {
					addDivFun(oevnt,'warning','<span>该模块已经存在</span>');
					$warning = $('.warning');
					$warning.delay(1500).fadeOut(200,function() {
						$warning.remove();
					});
				};
			};
		},
	});
};
restoringDataFun = function(oevnt,elementClassName,elementInnerHtmlString,elementInnerHtmlFun,left,top,ID,rangeArray,elementSettingBoxClassName,elementSettingBoxHeadlineString,elementSettingBoxHtmlString,elementSettingBoxFun,multitermSwitcher) {
	if(!oevnt.children().hasClass(elementClassName)&&multitermSwitcher==0) {
		addDivFun(oevnt,elementClassName,elementInnerHtmlString);
		var $tempElement01 = $('.' + elementClassName);
		elementInnerHtmlFun();
		$tempElement01.addClass('element');
		$tempElement01.css({"left":left,"top":top});
		$tempElement01.draggable({containment:rangeArray});
		tempFun01 = function() {
			$tempElement02 = $('.' + elementSettingBoxClassName);
			var aa = $tempElement01.css('left');
			var bb = aa.indexOf('p');
			var cc = aa.substring(0,bb);
			var dd = parseInt(cc);
			if(dd<500) {
				var ee = dd + 220;
			} else if(dd>=500&&dd<=850) {
				var ee = dd - 100;
			} else if(dd>850) {
				var ee = dd - 520;
			};
			$tempElement02.css({"left":ee+'px'});
			$tempElement02.addClass('draggableElement');
			$tempElement02.draggable({containment:'window'});
			elementSettingBoxFun();
		};
		addFormsFun($tempElement01,'dblclick',oevnt,elementSettingBoxClassName,elementSettingBoxHeadlineString,elementSettingBoxHtmlString,tempFun01,0,0);
	} else if(multitermSwitcher==1) {
		addDivFun(oevnt,'element'+ID,elementInnerHtmlString+"<div class='elementID'>"+ID+"</div>");
		var $tempElement01 = $('.'+'element'+ID);
		$tempElement01.children().eq(0).css({"left":"-6px","top":"24px"});
		$tempElement01.children().eq(1).css({"right":"-6px","top":"24px"});
		$tempElement01.addClass(elementClassName);
		$tempElement01.addClass('element');
		$tempElement01.draggable({containment:rangeArray});
		$tempElement01.css({"left":left,"top":top});
		$tempElement01.draggable({containment:rangeArray});
		$tempElement01.bind('dblclick',function() {
		    tempElementID = $(this).children('.elementID').html();
			addDivFun(oevnt,elementSettingBoxClassName+tempElementID,elementSettingBoxHtmlString);
	        var $classEvnt = $('.'+elementSettingBoxClassName+tempElementID);
		    $classEvnt.addClass(elementSettingBoxClassName).fadeIn(200);
		    addDivFun($classEvnt,'headline',elementSettingBoxHeadlineString+'<span>'+tempElementID+'</span>');
	        addDivFun($classEvnt,'cancelButton');
			$cancelButton = $('.'+elementSettingBoxClassName+tempElementID+' '+'.cancelButton')
		    $cancelButton.bind('click',function() {
			    $classEvnt.fadeOut(200,function()　{
				    $classEvnt.remove();
			    });
            });
			$RValue = $('#RValue');
			$XValue = $('#XValue');
			$RValue.focus();
			$electricityTransmationModuleSettingBoxSubmitButton = $('.electricityTransmationModuleSettingBoxSubmitButton');
			$element_electricityTransmationModule = $('.'+'element'+tempElementID+'.'+'element_electricityTransmationModule');
			$electricityTransmationModuleSettingBoxSubmitButton.bind('click',function() {
			if($RValue.val()!=''&&$XValue.val()!='') {
				var elementPosition = [$element_electricityTransmationModule.css("left"),$element_electricityTransmationModule.css("top")];
				$.ajax({
				    url:'Data_manage.php',
					type:'POST',
					data:{RValue:$RValue.val(),XValue:$XValue.val(),elementID:tempElementID,projectData_name:$projectNameBox.children('span').html(),elementPositionLeft:elementPosition[0],elementPositionTop:elementPosition[1],progressStatus:'electricityTransmationModuleDataCache'},
					success: function(data,status) {
					    $cancelButton.click();
						console.log(data);
					}
				})
			}
		});
		var aa = $tempElement01.css('left');
		var bb = aa.indexOf('p');
		var cc = aa.substring(0,bb);
		var dd = parseInt(cc);
		if(dd<500) {
		    var ee = dd + 220;
		} else if(dd>=500&&dd<=850) {
			var ee = dd - 100;
		} else if(dd>850) {
			var ee = dd - 520;
		};
		$classEvnt.css({"left":ee+'px'});
		$classEvnt.addClass('draggableElement');
		$classEvnt.draggable({containment:'window'});
		elementSettingBoxFun();
		});
	};
};
controlBoxFun = function() {
	$startButton = $('.startButton');
	$stopButton = $('.stopButton');
	$startButton.bind('click',function() {
		$startButton.css({"background-color":"#920000"});
		$stopButton.css({"background-color":"transparent"});
		if($mainContainer.children().hasClass('element_measuringScope')) {
			$element_measuringScope = $('.element_measuringScope');
			$element_measuringScope.dblclick();
		};
	});
	$stopButton.bind('click',function() {
		$stopButton.css({"background-color":"#920000"});
		$startButton.css({"background-color":"transparent"});
		$.ajax({
			 url:'Data_manage.php',
			 type:'POST',
		     data:{progressStatus:'stop'},
			 success: function(data,status) {
		     }
		});
	});
}
/*connectFun = function(evnt) {
	evnt.bind('click',function(e){
		if(!$mainContainer.children().hasClass('connectingLine')) {
		    var a = e.pageX;
			var b = e.pageY;
		    addDivFun($mainContainer,'connectingLine01');
		    $connectingLine01 = $('.connectingLine01');
		    $connectingLine01.css({"position":"absolute","left":a+"px","top":e.pageY+"px","height":"2px","background-color":"#920000"});
		    $(document).bind('mousemove',function(e) {
		        console.log(e.pageX+' '+e.pageY);
			    if(a>e.pageX) {
				    $connectingLine01.css({"left":e.pageX+'px',"width":(a-e.pageX)+'px'});
					if(e.pageY-a>10) {
						addDivFun($mainContainer,'connectingLine02');
						$connectingLine02 = $('.connectingLine02');
						$connectingLine02.css({"position":"absolute","left":e.pageX+"px","top":e.pageY+"px","height":"2px","background-color":"#920000"});
					} else if(a-e.pageY>10) {
					}
			    } else if(a<e.pageX) {
				    $connectingLine01.width(e.pageX-a);
			    }
	        });
		}
	});
}*/
/*connectFun = function() {
	$connectNode = $('.connectNode');
    $connectNode.bind('click',function() {
		mouseLeft01 = $(this).offset().left;
		mouseTop01 = $(this).offset().top;
		tempElementName01 = $(this).parent().children('span').html();
		if(mouseLeft01-$(this).offset().left!=0&&mouseTop01-$(this).offset().top!=0&&tempElementName01) {
			$tempElementName01 = $(this).parent().children('span').html();
		    window.mouseLeft01 = $(this).offset().left;
		    window.mouseTop01 = $(this).offset().top;
		    $connectNode.bind('click',function() {
				if(($(this).parent().children('span').html()!=$tempElementName01)&&$(this).hasClass('connectNode')) {
			        window.mouseLeft02 = $(this).offset().left;
		            window.mouseTop02 = $(this).offset().top;
			        addDivFun($mainContainer,'connectingLine'+i);
				    lineWidth01 = (window.mouseLeft02 - window.mouseLeft01)/2;
				    $connectingLine01 = $('.connectingLine01');
				    $connectingLine01.css({"left":(window.mouseLeft01+3)+'px',"top":(window.mouseTop01+3)+'px',"height":"2px","width":lineWidth01+'px',"position":"absolute","background-color":"#920000"});
				    if(window.mouseTop01!=window.mouseTop02) {
					    addDivFun($mainContainer,'connectingLine'+(i+1));
					    $connectingLine02 = $('.connectingLine02');
					    if(window.mouseTop01>window.mouseTop02) {
						    lineHeight01 = window.mouseTop01-window.mouseTop02;
							$connectingLine02.css({"left":(window.mouseLeft01+1+lineWidth01)+"px","top":(window.mouseTop01+3-lineHeight01)+"px","width":"2px","height":(lineHeight01)+"px","position":"absolute","background-color":"#920000"});
					    } else if(window.mouseTop01<window.mouseTop02) {
						    lineHeight01 = window.mouseTop02-window.mouseTop01;
							$connectingLine02.css({"left":(window.mouseLeft01+3+lineWidth01)+"px","top":(window.mouseTop01+3)+"px","width":"2px","height":lineHeight01+"px","position":"absolute","background-color":"#920000"});
					    };
						addDivFun($mainContainer,'connectingLine'+(i+2));
					    $connectingLine03 = $('.connectingLine03');
					    $connectingLine03.css({"position":"absolute","width":lineWidth01+"px","height":"2px","left":(window.mouseLeft01+lineWidth01+3)+"px","top":(window.mouseTop02+3)+"px","background-color":"#920000"});
				    } else if(window.mouseTop01==window.mouseTop02) {
					    addDivFun($mainContainer,'connectingLine04');
					    $connectingLine04 = $('.connectingLine04');
					    $connectingLine04.css({"left":(window.mouseLeft01+3+lineWidth01)+"px","top":(window.mouseTop01+3)+"px","height":"2px","width":lineWidth01+'px'});
				    }
				}
				$connectNode.bind('click',achieveNodePositionFun);
		    });
	    });
};*/
measuringScopeDisplayBoxChartFunction = function(chartType,animationDuration,chartName,xAxisName,yAxisName,exportingSwitch,seriesName) {
	$.ajax({
	    url:'Data_manage.php',
		type:'POST',
		data:{projectData_name:$projectNameBox.children('span').html(),progressStatus:'start'},
		success: function(data,status) {
			APhaseProperty = eval(data);
			APhaseAmplitude = APhaseProperty[0];
			ID1RValue = APhaseProperty[1];
			ID1XValue = APhaseProperty[2];
			ID4RValue = APhaseProperty[3];
			ID4XValue = APhaseProperty[4];
			triggerDelay = APhaseProperty[5];
			faultType = APhaseProperty[6];
			Im0 = APhaseAmplitude/Math.sqrt(Math.pow(ID1RValue+ID4RValue,2)+Math.pow(100*Math.PI*(ID1XValue+ID4XValue),2));
			q0 = Math.atan((100*Math.PI*(ID1XValue+ID4XValue))/(ID1RValue+ID4RValue));
			Im = APhaseAmplitude/Math.sqrt(Math.pow(ID1RValue,2)+Math.pow(100*Math.PI*ID1XValue,2));
			q = Math.atan(100*Math.PI*ID1XValue/ID1RValue);
			Ta = 1;
			var chart;                                                                  
            $chartContainer.highcharts({                                                
                chart: {                                                                
                    type: chartType,                                                     
                    animation: {
				        duration: animationDuration
			        },               
                    marginRight: 10,                                                
                    events: {                                                           
                        load: function() {
				            var series = this.series[0];  
	                        var	t = 0.1;                              
                            var int = setInterval(function() {
						        t = t + 0.001;
							    if(faultType='三相短路'&&t<=triggerDelay) {
							        var y = Im0*Math.sin(100*Math.PI*(t)-q0);
	                                series.addPoint([t, y], true, true);
						        } else if(faultType='三相短路'&&t>triggerDelay) {
									var ipa = Im*Math.sin(100*Math.PI*t-q);
									var iaa = (Im0*Math.sin(-q0)-Im*Math.sin(-q))*Math.exp(-5*t)
									var v = ipa + iaa;
									series.addPoint([t, v], true, true);
								}
	                        },100);
	                        $cancelButton.bind('click',function() {
		                        window.clearInterval(int);
	                        });
				        }
                    }                                                                   
                },                                                                      
                title: {                                                                
                    text: chartName
		        },                                                                      
                xAxis: {                                                                
                    type: 'linear',
			        title: {
				        text: xAxisName
			        }                                                 
                },                                                                      
                yAxis: {                                                                
                    title: {                                                            
                        text: yAxisName                                                   
                    },                                                                  
                    plotLines: [{                                                       
                        value: 0,                                                       
                        width: 1,                                                       
                        color: '#808080'                                                
                    }]                                                                  
                },                                                                      
                tooltip: {                                                              
                    formatter: function() {                                             
                        return '<b>'+ this.series.name +'</b><br/>'+                
                        Highcharts.numberFormat(this.x, 2) +'<br/>'+
                        Highcharts.numberFormat(this.y, 2);                         
                    }                                                                   
                },                                                                      
                legend: {                                                               
                    enabled: false                                                      
                },                                                                      
                exporting: {                                                            
                    enabled: exportingSwitch                                                    
                }, 
		        plotOptions: {
                    spline: {
                        lineWidth: 4,
                        states: {
                            hover: {
                                lineWidth: 5
                            }
                        },
                        marker: {
                            enabled: false
                        },
                    }
                },                                                                     
                series: [{                                                              
                    name: 'A相电流',                                                
                    data: (function() {
		                var data = [];
				        for (i = 0; i <= 0.1; i=i+0.001) {                                   
                            data.push({                                                 
                                x: i,                                     
                                y: Im0*Math.sin(100*Math.PI*(i)-q0)    
                            });                                                        
                        };
				        return data;  
                    })()                                                                
                }]                                                                      
            });
        }
    });	
};