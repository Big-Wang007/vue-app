<template>
  <div class="dashboard">
    <div id="line-chart-main"></div>
    <div id="bar-chart-main"></div>
    <div id="pie-chart-main"></div>
    <div id="gauge-chart-main"></div>
  </div>
</template>

<script setup>
import echarts from "@/utils/echarts";
import { onMounted } from "vue";
onMounted(() => {
  initLineChart();
  initBarChart();
  initPieChart();
  initGaugeChart();
});

function initLineChart() {
  const lineChartDom = document.getElementById("line-chart-main");
  const lineChart = echarts.init(lineChartDom);
  const lineChartOption = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
      },
    ],
  };
  lineChart.setOption(lineChartOption);
}

function initBarChart() {
  const barChartDom = document.getElementById("bar-chart-main");
  const barChart = echarts.init(barChartDom);
  const barChartOption = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  };
  barChart.setOption(barChartOption);
}

function initPieChart() {
  var pieChartDom = document.getElementById("pie-chart-main");
  var pieChart = echarts.init(pieChartDom);
  var pieChartOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };

  pieChart.setOption(pieChartOption);
}

function initGaugeChart() {
  var gaugeChartDom = document.getElementById("gauge-chart-main");
  var gaugeChart = echarts.init(gaugeChartDom);
  var gaugeChartOption = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },
    series: [
      {
        name: "Pressure",
        type: "gauge",
        progress: {
          show: true,
        },
        detail: {
          valueAnimation: true,
          formatter: "{value}",
        },
        data: [
          {
            value: 50,
            name: "SCORE",
          },
        ],
      },
    ],
  };
  gaugeChart.setOption(gaugeChartOption);
}
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 50% 50%;
  justify-items: center;
  align-items: center;
}

#line-chart-main {
  width: 100%;
  height: 100%;
}

#bar-chart-main {
  width: 600px;
  height: 400px;
}

#pie-chart-main {
  width: 600px;
  height: 400px;
}

#gauge-chart-main {
  width: 600px;
  height: 400px;
}
</style>
