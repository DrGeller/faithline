var bmapChart = echarts.init(document.getElementById('map-wrap'));
var option = {
    bmap: {
        center: [116.307698, 40.056975],
        zoom: 20,
        roam: true
    },
    visualMap: {	// 视觉映射组件
		type: 'continuous',
		min: 0,
		max: 200,
		calculable: true,
		inRange: {
             	color: ['#50a3ba','#eac736','#d94e5d']
          },
		textStyle: {
			color: '#fff'
		}
    },
	series: [
		{
			name: '销量',
			type: 'scatter',

			coordinateSystem: 'bmap', // 坐标系使用bmap

			
		}
	]
}

bmapChart.setOption(option);