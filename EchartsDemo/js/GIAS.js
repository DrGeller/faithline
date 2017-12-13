//GIAS JS库文件

//文件导入
var workbook;

function imFile(obj, fun) {
  if (!obj.files) {
    return
  }
  var f = obj.files[0];
  var reader = new FileReader();
  reader.readAsBinaryString(f);
  reader.onload = function (e) {
    e = e || window.event;
    var data = e.target.result;
    workbook = XLSX.read(data, {
      type: "binary"
    });
    workData01 = eval(JSON.stringify(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])));
    workData02 = eval(JSON.stringify(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]])));
    workData03 = eval(JSON.stringify(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[2]])));
    workData04 = eval(JSON.stringify(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[3]])));
    console.log("OK");
    fun();
  }
}

//文件导出
var tmpDown; //导出的二进制对象
function downloadExcel(json, type) {
  var tmpData = json[0];
  json.unshift({});
  var keyMap = []; //获取表头
  for (var k in tmpData) {
    keyMap.push(k);
    json[0][k] = k;
  }
  var tmpData = []; //用来保存转换好的json 
  json.map(
    (v, i) => keyMap.map(
      (k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
      }))).reduce(
    (prev, next) => prev.concat(next)
    ).forEach((v, i) => tmpData[v.position] = {
      v: v.v
    });
  var outputPos = Object.keys(tmpData); //设置区域,比如表格从A1到D10
  var tmpWB = {
    SheetNames: ['mySheet'], //保存的表标题
    Sheets: {
      'mySheet': Object.assign({},
        tmpData, //内容
        {
          '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
        })
    }
  }
  tmpDown = new Blob([s2ab(XLSX.write(tmpWB, {
    bookType: (type == undefined ? 'xlsx' : type),
    bookSST: false,
    type: 'binary' //这里的数据是用来定义导出的格式类型
  }))], {
      type: ""
    }); //创建二进制对象写入转换好的字节流
  var href = URL.createObjectURL(tmpDown); //创建对象超链接
  document.getElementById("hf").href = href; //绑定a标签
  document.getElementById("hf").click(); //模拟点击实现下载
  setTimeout(function () { //延时释放
    URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
  }, 100);
}

function s2ab(s) { //字符串转字符流
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
function getCharCol(n) {
  let temCol = '',
    s = '',
    m = 0;
  while (n > 0) {
    m = n % 26 + 1
    s = String.fromCharCode(m + 64) + s
    n = (n - m) / 26
  }
  return s;
}

//表格显示数据
function displayTable() {
  thead = document.createElement("thead");
  tr = document.createElement("tr");
  th = document.createElement("th");
  th.appendChild(document.createTextNode("用户名称"));
  tr.appendChild(th);
  th = document.createElement("th");
  th.appendChild(document.createTextNode("用户编码"));
  tr.appendChild(th);
  th = document.createElement("th");
  th.appendChild(document.createTextNode("用电类别"));
  tr.appendChild(th);
  th = document.createElement("th");
  th.appendChild(document.createTextNode("用电地址"));
  tr.appendChild(th);
  thead.appendChild(tr);
  fileTable.appendChild(thead);
  tbody = document.createElement("tbody");
  fileTable.appendChild(tbody);
  for (var i = 0; i < 1000; i++) {
    tr = document.createElement("tr");
    td = document.createElement("td");
    td.appendChild(document.createTextNode(workData01[i].用户名称));
    tr.appendChild(td);
    td = document.createElement("td");
    td.appendChild(document.createTextNode(workData01[i].用户编码));
    tr.appendChild(td);
    td = document.createElement("td");
    td.appendChild(document.createTextNode(workData01[i].用电类别));
    tr.appendChild(td);
    td = document.createElement("td");
    td.appendChild(document.createTextNode(workData01[i].用电地址));
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
  stage03();
}

//获取地理信息
var int, doneFlag;
var currentIndex = 0;

function getGeoInfo() {
  var c = 1;
  var i = currentIndex;
  if (doneFlag == 0) {
    return;
  }
  doneFlag = 0;

  function ajaxRequest() {
    var urlStr = "http://api.map.baidu.com/geocoder/v2/?address=" + encodeURIComponent(workData01[i].用电地址) + "&output=json&ak=hniwPVgo49ixnxQW4DOIUppE9PFLQgnz&callback=showLocation";
    $.ajax({
      url: urlStr,
      type: "GET",
      dataType: "JSONP",
      success: function (returnData) {
        if (returnData.status == 0) {
          workData01[i].状态值 = returnData.status;
          workData01[i].经度值 = returnData.result.location.lng;
          workData01[i].纬度值 = returnData.result.location.lat;
          workData01[i].模式 = returnData.result.precise;
          workData01[i].可信度 = returnData.result.confidence;
          workData01[i].详细级别 = returnData.result.level;
        }
        console.log(i + 1);
        console.log(workData01[i]);
        i++;
        if (i == workData01.length) {
          window.clearInterval(int);
          console.log("OK");
          downloadExcel(workData01);
          return;
        }
        if (c == 2900) {
          currentIndex = i;
          doneFlag = 1;
          console.log("pause");
          return;
        }
        c++;
        ajaxRequest();
      }
    });
  }
  ajaxRequest();
}

//获取异动信息
getProblemKey = function (dataArray) {
  var key01 = []; //低电压异常键
  var key02 = []; //过电压异常键
  var key03 = []; //公变表计断流异常键
  var key04 = []; //重载台区异常键
  var key05 = []; //重载台区异常键
  var key06 = []; //过载台区异常键
  for (let i = 0; i < dataArray[1].length; i++) {
    if (dataArray[1][i].A相电压 < 198) {
      key01.push({
        相序: 1,
        key: i,
        type: "低电压"
      });
    }
    if (dataArray[1][i].B相电压 < 198) {
      key01.push({
        相序: 2,
        key: i,
        type: "低电压"
      });
    }
    if (dataArray[1][i].C相电压 < 198) {
      key01.push({
        相序: 3,
        key: i,
        type: "低电压"
      });
    }
    if (dataArray[1][i].A相电压 > 250) {
      key02.push({
        相序: 1,
        key: i,
        type: "过电压"
      });
    }
    if (dataArray[1][i].B相电压 > 250) {
      key02.push({
        相序: 2,
        key: i,
        type: "过电压"
      });
    }
    if (dataArray[1][i].C相电压 > 250) {
      key02.push({
        相序: 3,
        key: i,
        type: "过电压"
      });
    }
    if (dataArray[1][i].A相电流 * dataArray[1][i].B相电流 * dataArray[1][i].C相电流 == 0) {
      if (dataArray[1][i].A相电流 + dataArray[1][i].B相电流 + dataArray[1][i].C相电流 != 0) {
        key03.push({
          key: i,
          type: "断流"
        })
      }
    }
    if (dataArray[1][i].A相电压 * dataArray[1][i].B相电压 * dataArray[1][i].C相电压 == 0) {
      if (dataArray[1][i].A相电压 + dataArray[1][i].B相电压 + dataArray[1][i].C相电压 != 0) {
        key04.push({
          key: i,
          type: "失压"
        })
      }
    }
    for (let j = 0; j < dataArray[0].length; j++) {
      if (dataArray[1][i].台区编码 == dataArray[0][j].台区编码) {
        let a = (dataArray[1][i].A相电流 * dataArray[1][i].A相电压 +
          dataArray[1][i].B相电流 * dataArray[1][i].B相电压 +
          dataArray[1][i].C相电流 * dataArray[1][i].C相电压) / 1000 / dataArray[0][j].铭牌容量
        if (a > 0.8 && a < 1) {
          key05.push({
            key: i,
            type: "重载",
          })
        } else if (a > 1) {
          key06.push({
            key: i,
            type: "过载"
          })
        }
      }
    }
  }
  var keyData01 = []; //低电压异常键筛选数据
  var keyData02 = []; //过电压异常键筛选数据
  var keyData03 = []; //断流异常键筛选数据
  var keyData04 = []; //失压异常键筛选数据
  var keyData05 = []; //重载异常键筛选数据
  var keyData06 = []; //过载异常键筛选数据
  filterData = function (key) {
    for (let i = 0; i < key.length; i++) {
      if (i > 1 && parseInt(key[i].key / 96) == parseInt(key[i - 1].key / 96)) {
        if (key[i].type == "低电压" && key[i].key != key[i - 1].key && key[i].key % 96 - key[i - 1].key % 96 <= 2) {
          keyData01.push({
            type: "低电压",
            tgNo: dataArray[1][key[i].key].台区编码,
            key: key[i].key
          })
        } else if (key[i].type == "过电压" && key[i].key != key[i - 1].key && key[i].key % 96 - key[i - 1].key % 96 <= 2) {
          keyData02.push({
            type: "过电压",
            tgNo: dataArray[1][key[i].key].台区编码,
            key: key[i].key
          })
        } else if (key[i].type == "断流" && key[i].key != key[i - 1].key && key[i].key % 96 - key[i - 1].key % 96 <= 2) {
          keyData03.push({
            type: "断流",
            tgNo: dataArray[1][key[i].key].台区编码,
            key: key[i].key
          })
        } else if (key[i].type == "失压" && key[i].key != key[i - 1].key && key[i].key % 96 - key[i - 1].key % 96 <= 2) {
          keyData04.push({
            type: "失压",
            tgNo: dataArray[1][key[i].key].台区编码,
            key: key[i].key
          })
        } else if (key[i].type == "重载" && key[i].key != key[i - 1].key && key[i].key % 96 - key[i - 1].key % 96 <= 2) {
          keyData05.push({
            type: "重载",
            tgNo: dataArray[1][key[i].key].台区编码,
            key: key[i].key
          })
        } else if (key[i].type == "过载" && key[i].key != key[i - 1].key && key[i].key % 96 - key[i - 1].key % 96 <= 2) {
          keyData06.push({
            type: "过载",
            tgNo: dataArray[1][key[i].key].台区编码,
            key: key[i].key
          })
        }
      }
    }
  }
  filterData(key01);
  filterData(key02);
  filterData(key03);
  filterData(key04);
  filterData(key05);
  filterData(key06);
  return [keyData01, keyData02, keyData03, keyData04, keyData05, keyData06]
}

//生成日历图
function createCalMap() {
  var option = {
    tooltip: {
      position: 'top'
    },
    grid: {
      height: '50%',
      y: '10%'
    },
    visualMap: {
      min: 0,
      max: 60,
      calculable: true,
      orient: 'vertical',
      top: 40,
      right: 10
    },
    calendar: {
      top: 40,
      left: 60,
      right: 80,
      bottom: 40,
      cellSize: ['auto', 13],
      range: ['2017-01-01', '2017-03-31'],
      itemStyle: {
        normal: {
          borderWidth: 0.5
        }
      },
      dayLabel: {
        show: true,
        firstDay: 1,
        nameMap: "cn"
      },
      monthLabel: {
        nameMap: "cn"
      },
      yearLabel: {
        show: false
      }
    },
    series: [{
      name: 'Punch Card',
      type: 'heatmap',
      coordinateSystem: "calendar",
      label: {
        normal: {
          show: true,
          formatter: function (params) {
            return params.value[1]
          },
          textStyle: {
            color: '#000'
          }
        }
      },
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  }
  var calendarMap = echarts.init(document.getElementById('calendarMap'));
  calendarMap.setOption(option);
  calendarMap.on('click', function (params) {

  });
  return calendarMap;
}

//生成地理图
function createGeoMap() {
  var option = {
    title: {
      text: "GIAS",
      textStyle: {
        fontSize: "24"
      },
      left: "center",
      top: "20"
    },
    bmap: {
      center: [109.033301, 32.697319],
      zoom: 13,
      roam: true,
      mapStyle: {
        style: "normal"
      }
    },
    series: [{
      name: "台区",
      type: 'scatter',
      coordinateSystem: 'bmap',
      symbol: "circle",
      symbolSize: 5,
      itemStyle: {
        normal: {

        }
      },
      dimensions: ['经度', '纬度']
    }]
  }
  var mapChart = echarts.init(document.getElementById('mapContainer'));
  mapChart.setOption(option);
  var bmap = mapChart.getModel().getComponent('bmap').getBMap();
  bmap.addControl(new BMap.NavigationControl());
  bmap.addControl(new BMap.ScaleControl());
  return mapChart;
}

//生成折线图
function createLineMap(obj) {
  var option = {
    title: {

    },
    legdend: {
      data: ['A相', 'B相', 'C相']
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: "time"
    },
    yAxis: {
      splitLine: {
        show: false
      },
    },
    toolbox: {
      left: 'center',
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: [{
      type: "slider",
      xAxisIndex: [0],
      start: 0,
      end: 10,
      filterMode: 'filter'
    }, {
      type: "slider",
      yAxisIndex: [0],
      start: 80,
      end: 100,
      filterMode: 'filter',
      right: 20
    }],
    /*visualMap: {
      top: 10,
      right: 10,
      pieces: [{
        gt: 0,
        lte: 50,
        color: '#096'
      }, {
        gt: 50,
        lte: 100,
        color: '#ffde33'
      }, {
        gt: 100,
        lte: 150,
        color: '#ff9933'
      }, {
        gt: 150,
        lte: 200,
        color: '#cc0033'
      }, {
        gt: 200,
        lte: 300,
        color: '#660099'
      }, {
        gt: 300,
        color: '#7e0023'
      }],
      outOfRange: {
        color: '#999'
      }
    }, */
    series: [{
      name: 'A相',
      type: 'line',
      showSymbol: false,
      markLine: {
        silent: true,
        data: [{
          yAxis: 216
        }, {
          yAxis: 224
        }]
      }
    }, {
      name: 'B相',
      type: 'line',
      showSymbol: false
    }, {
      name: 'C相',
      type: 'line',
      showSymbol: false
    }]
  }
  var lineChart = echarts.init(obj);
  lineChart.setOption(option);
  return lineChart;
}
