//GIAS JS库文件

//文件导入
var workbook;
function imFile(obj) {
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
    workData = eval(JSON.stringify(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])));
    stage02();
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
  var tmpData = [];//用来保存转换好的json 
  json.map(
    (v, i) => keyMap.map(
      (k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
      }))).reduce(
    (prev, next) => prev.concat(next)
    ).forEach((v, i) => tmpData[v.position] = { v: v.v });
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
    type: 'binary'  //这里的数据是用来定义导出的格式类型
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
  let temCol = '', s = '', m = 0;
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
    td.appendChild(document.createTextNode(workData[i].用户名称));
    tr.appendChild(td);
    td = document.createElement("td");
    td.appendChild(document.createTextNode(workData[i].用户编码));
    tr.appendChild(td);
    td = document.createElement("td");
    td.appendChild(document.createTextNode(workData[i].用电类别));
    tr.appendChild(td);
    td = document.createElement("td");
    td.appendChild(document.createTextNode(workData[i].用电地址));
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
    var urlStr = "http://api.map.baidu.com/geocoder/v2/?address=" + encodeURIComponent(workData[i].用电地址) + "&output=json&ak=hniwPVgo49ixnxQW4DOIUppE9PFLQgnz&callback=showLocation";
    $.ajax({
      url: urlStr,
      type: "GET",
      dataType: "JSONP",
      success: function (returnData) {
        if (returnData.status == 0) {
          workData[i].状态值 = returnData.status;
          workData[i].经度值 = returnData.result.location.lng;
          workData[i].纬度值 = returnData.result.location.lat;
          workData[i].模式 = returnData.result.precise;
          workData[i].可信度 = returnData.result.confidence;
          workData[i].详细级别 = returnData.result.level;
        }
        console.log(i + 1);
        console.log(workData[i]);
        i++;
        if (i == workData.length) {
          window.clearInterval(int);
          console.log("OK");
          downloadExcel(workData);
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