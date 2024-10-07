am5.ready(function() {


    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv2");
    
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
      paddingLeft: 0
    }));
    
    
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);
    
    
    // Generate random data
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    var value = 1000;
    var volume = 100000;
    
    function generateData() {
      value = Math.round((Math.random() * 10 - 5) + value);
      volume = Math.round((Math.random() * 1000 - 500) + volume);
    
      am5.time.add(date, "day", 1);
      // add another if it's saturday
      if (date.getDay() == 6) {
        am5.time.add(date, "day", 1);
      }
      // add another if it's sunday
      if (date.getDay() == 0) {
        am5.time.add(date, "day", 1);
      }
    
      return {
        date: date.getTime(),
        value: value,
        volume: volume
      };
    }
    
    function generateDatas(count) {
      var data = [];
      for (var i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }
    
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
      maxDeviation: 0,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      extraMin: 0.2,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));
    
    
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));
    
    // y axis for volume
    var volumeAxisRenderer = am5xy.AxisRendererY.new(root, {});
    volumeAxisRenderer.grid.template.set("forceHidden", true);
    volumeAxisRenderer.labels.template.set("forceHidden", true);
    
    var volumeAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      height: am5.percent(25),
      y: am5.percent(100),
      centerY: am5.percent(100),
      panY: false,
      renderer: volumeAxisRenderer
    }));
    
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var volumeSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Volume Series",
      xAxis: xAxis,
      yAxis: volumeAxis,
      valueYField: "volume",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));
    
    volumeSeries.columns.template.setAll({ fillOpacity: 0.8, strokeOpacity: 0, width: am5.percent(40) })
    
    
    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));
    
    
    // Set data
    var data = generateDatas(200);
    series.data.setAll(data);
    volumeSeries.data.setAll(data);
    
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
    
    });