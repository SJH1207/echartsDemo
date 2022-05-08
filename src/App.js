import "./App.css";
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import geoJson from "./china.json";
import valueData from "./valueData.json";
import picture1 from './picture1.jpg'
import picture2 from './picture2.jpg'
import picture3 from './picture3.jpg'
import picture4 from './picture4.jpg'
import picture5 from './picture5.jpg'
import picture6 from './picture6.jpg'
import './App.css'
const App = () => {
  const data =
    "男性绝育 女性绝育 宫内节育器 皮下埋植 口服及注射避孕药 避孕套 外用药 其他";
  const vData = {
    全国: "3.32 24.93 52.18 0.19 0.82 18.04 0.15 0.37",
    北京: "0.02 0.44 16.82 0.06 1.33 80.77 0.10 0.48",
    天津: "0.07 3.55 41.11 0.09 1.09 52.60 0.31 1.20",
    河北: "2.50 18.24 66.78 0.09 0.44 10.52 0.03 1.41",
    山西: "0.30 26.79 68.89 0.05 0.31 3.18 0.00 0.48",
    内蒙古: "0.05 10.77 66.19 0.18 0.52 22.13 0.01 0.15",
    辽宁: "0.00 1.77 79.59 0.09 1.36 16.82 0.22 0.16",
    吉林: "0.01 2.88 82.37 0.31 0.17 14.24 0.03 0.00",
    黑龙江: "0.02 5.75 80.97 0.09 1.27 11.48 0.08 0.35",
    上海: "0.21 2.70 40.88 0.14 2.60 51.19 0.56 1.72",
    江苏: "0.69 7.64 65.38 0.07 0.77 24.90 0.26 0.30",
    浙江: "0.18 17.90 45.00 0.09 0.44 35.93 0.12 0.32",
    安徽: "1.04 34.66 45.79 0.17 0.83 17.28 0.02 0.21",
    福建: "4.66 39.58 39.52 0.14 0.21 15.81 0.02 0.07",
    江西: "0.09 43.78 33.68 0.03 0.24 21.81 0.14 0.23",
    山东: "5.56 16.23 52.23 0.12 0.03 25.80 0.01 0.03",
    河南: "11.27 39.37 43.29 0.27 0.37 5.21 0.07 0.15",
    湖北: "2.32 27.25 52.48 0.36 1.17 16.17 0.03 0.23",
    湖南: "0.94 36.58 44.62 0.17 0.09 16.94 0.24 0.41",
    广东: "5.88 35.66 23.10 0.04 0.39 34.75 0.08 0.09",
    广西: "7.63 29.72 53.49 0.01 0.97 7.41 0.65 0.12",
    海南: "0.41 36.39 49.67 0.02 0.14 13.18 0.09 0.09",
    重庆: "4.53 1.29 73.71 0.18 3.38 16.37 0.41 0.13",
    四川: "3.05 2.24 75.64 0.67 2.06 14.54 0.09 1.70",
    贵州: "10.58 50.72 32.29 0.05 0.14 6.00 0.02 0.19",
    云南: "2.37 23.33 64.20 0.31 2.14 7.03 0.28 0.33",
    西藏: "0.02 10.07 24.33 12.28 25.51 24.52 2.67 0.61",
    陕西: "1.56 36.65 50.44 0.62 1.74 8.57 0.27 0.14",
    甘肃: "0.04 53.61 39.45 0.21 0.98 5.54 0.02 0.16",
    青海: "0.21 32.52 54.07 0.56 3.49 7.43 0.70 1.02",
    宁夏: "0.01 26.04 48.26 0.13 2.18 22.39 0.31 0.68",
    新疆: "0.16 4.44 75.76 0.12 0.73 17.88 0.42 0.49",
  };

  const keyList = data.split(" ");
  const res = [];
  Object.keys(vData).map((region, i) => {
    // console.log(region,i);
    Object.values(vData).map((data1, j) => {
      if (i === j) {
        const data = {};
        keyList.map((title, k) => {
          data1.split(" ").map((numData, l) => {
            if (k === l) {
              data[title] = numData;
            }
          });
        });
        res.push({ name: region, value: data });
      }
    });
  });

  const drawCharts1 = () => {
    // 基于准备好的dom，初始化echarts实例
    var chinaMap = echarts.init(document.getElementById("china-map"));
    window.onresize = chinaMap.resize; // 窗口或框架被调整大小时执行chinaMap.resize

    chinaMap.setOption({
      // 进行相关配置
      tooltip: {}, // 鼠标移到图里面的浮动提示框
      title: {
        text: "中国地图",
        textStyle: {
          color: "rgba(211, 66, 66, 0.4)",
        },
      },
      dataRange: {
        show: false,
        min: 0,
        max: 1000,
        text: ["High", "Low"],
        realtime: true,
        calculable: true,
        color: ["orangered", "#FF9B52", "#FFD068"],
      },
      geo: {
        // 这个是重点配置区
        map: "map", // 表示中国地图
        roam: true,
        label: {
          normal: {
            show: true, // 是否显示对应地名
            textStyle: {
              color: "rgba(211, 66, 66, 0.7)",
            },
          },
        },
        itemStyle: {
          normal: {
            borderColor: "rgba(211, 66, 66, 0.4)",
            borderWidth: "2",
            areaColor: "rgba(211, 66, 66, 0.2)",
          },
          emphasis: {
            areaColor: null,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
      series: [
        {
          type: "scatter",
          coordinateSystem: "geo", // 对应上方配置
        },
        {
          type: "map",
          geoIndex: 0,

          // data: res
        },
      ],
    });
    // echarts.off("click")
    chinaMap.off("click");
    chinaMap.on("click", (data) => {
      data.vData = vData;
      drawCharts2(data);
    });
  };

  const drawCharts2 = (props) => {
    const myChart = echarts.init(document.getElementById("myChart"));
    var option;
    console.log(props, props?.vData?.[props.name]);
    option = {
      title: {
        text: props.name,
        textStyle: {
          color: "rgba(211, 66, 66, 0.4)",
        },
      },
      xAxis: {
        type: "category",
        data: [
          "男性绝育",
          "女性绝育",
          "宫内节育器",
          "皮下埋植",
          "口服及注射避孕药",
          "避孕套",
          "外用药",
          "其他",
        ],
        axisLabel: { interval: 0 },
        textStyle: {
          fontSize: 8,
        },
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data:
            props?.vData?.[props.name].split(" ").map((item) => Number(item)) ||
            vData["全国"].split(" ").map((item) => Number(item)),
          type: "bar",
          showBackground: true,
          color: "rgba(211, 66, 66, 0.5)",
          backgroundStyle: {
            color: "rgba(211, 66, 66, 0.1)",
          },
          label: {
            show: true,
          },
        },
      ],
    };

    option && myChart.setOption(option, true);
  };

  const drawCharts3 = () => {
    const myChart = echarts.init(document.getElementById("myLineChart"));
    const option = {
      title: {
        text: "采取各种避孕措施分布比例",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: [
          "男性绝育",
          "女性绝育",
          "宫内节育器",
          "皮下埋植",
          "口服及注射避孕药",
          "避孕套",
          "外用药",
          "其他",
        ],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: [
            "2007",
            "2008",
            "2009",
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
          ],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "外用药",
          type: "line",
          areaStyle: {},
          data: [
            0.21, 0.2, 0.18, 0.18, 0.17, 0.17, 0.15, 0.14, 0.14, 0.15, 0.15,
          ],
        },
        {
          name: "其他",
          type: "line",
          data: [
            0.17, 0.17, 0.19, 0.22, 0.27, 0.27, 0.3, 0.32, 0.32, 0.34, 0.37,
          ],
        },
        {
          name: "皮下埋植",
          type: "line",
          data: [
            0.33, 0.31, 0.32, 0.29, 0.28, 0.32, 0.25, 0.23, 0.19, 0.23, 0.19,
          ],
        },
        {
          name: "口服及注射避孕药",
          type: "line",
          data: [1.22, 1.11, 1.01, 0.96, 0.9, 0.91, 0.86, 0.82, 0.9, 0.8, 0.82],
        },
        {
          name: "男性绝育",
          type: "line",
          data: [
            6.14, 5.7, 5.46, 5.19, 4.92, 4.65, 4.32, 4.11, 3.85, 3.45, 3.32,
          ],
        },
        {
          name: "避孕套",
          type: "line",
          data: [
            7.38, 7.92, 8.32, 8.89, 9.75, 10.34, 11.29, 12.65, 13.8, 16.16,
            18.04,
          ],
        },
        {
          name: "女性绝育",
          type: "line",
          data: [
            32.25, 31.62, 31.08, 30.78, 30.02, 29.14, 28.35, 27.3, 26.24, 25.83,
            24.93,
          ],
        },
        {
          name: "宫内节育器",
          type: "line",
          data: [
            52.3, 52.97, 53.45, 53.5, 53.68, 54.2, 54.48, 54.43, 54.56, 53.03,
            52.18,
          ],
        },
      ]
        .reverse()
        .map((item) => {
          item.emphasis = {
            focus: "series",
          };
          item.areaStyle = {};
          return item;
        }),
    };
    option && myChart.setOption(option);
  };

  useEffect(() => {
    echarts.registerMap("map", geoJson);
    drawCharts1();
    drawCharts2({ name: "全国" });
    drawCharts3();
  }, []);
  return (
    <>
      <div style={{ height: '100px', width: '100%' }}></div>
      <h1 className='title'>“如果当初没有这个孩子，现在会不会更自由”</h1>
      <p className='txt'>下午四点半，林佳佳跟直播间的观众说了再见之后匆忙下播，阿姨休假回了孝感老家，女儿幼儿园四点四十放学，她得自己去接孩子。</p>
      <p className='txt'>这是她来到武汉的第五年，也是独自抚养孩子的第五年。</p>
      <p className='txt'>2015年她跟家里吵架跑了出来，辗转各地，在潍坊一家便利店打工。碰到了那个自称家境良好正在北京电影学院上学的青年，很自然地，他们恋爱了。</p>
      <p className='txt'>“我平常月经就不准，再加上我太瘦了根本不显怀，等发现怀孕的时候已经快三个月了，那时候我们已经分手了。我很穷，没有钱去做手术，只能一拖再拖，等到月份很大了才回去找我妈，就已经不能引产了，只好把她生了下来。”</p>
      <p className='txt'>也想过把孩子送出去，但最终还是留了下来。</p>
      <p className='txt'>林佳佳来到武汉，请了阿姨照顾小孩，自己出去挣钱。家里开销很大，租房、阿姨工资、生活费、养孩子的钱，每个月要一万五打底。她做过夜场，今年想试试直播。“我想尽快攒到钱，回老家买个房子，不然到时候女儿没有武汉户口，上小学可能是个问题。”林佳佳说。</p>
      <div style={{ textAlign: 'center' }}>
        <img style={{
          width: "300px",
          height: "auto",
        }} src={picture1} />
      </div>
      <p style={{ textAlign: "center" }}>（受访者供图）</p>
      <p className='txt'>其实像林佳佳这样的未婚妈妈并不少见。传统上，婚姻被认为是唯一适合生育的制度环境。然而，20世纪70年代以来，婚姻和生育之间曾经牢固的联系开始逐渐削弱，未婚生育特别是同居关系中怀孕和生育现象变得更加广泛，被学者们视为“第二次人口转型”和“婚姻去制度化”的关键指标之一。</p>
      <p className='txt'>据《十城市单亲妈妈生活状况及需求调研报告》统计，未婚妈妈占到单亲妈妈比例的6.0%。</p>
      <div style={{ textAlign: 'center' }}>
        <img style={{
          width: "700px",
          height: "auto",
        }} src={picture2} />
      </div>
      <p className='txt'>尽管单亲妈妈独自承担抚育孩子照顾家庭的重担，仍自强自立追求更好的生活，但遗憾的是，这一群体不仅常常为社会刻板印象所累，而且未能从社会公共服务体系中获得足够的支持。“当妈妈后最经常的感受就是缺钱……那个时候我太小了，才十七八岁，根本不懂避孕。”林佳佳站在幼儿园门外，等着女儿出来，扑进怀里甜甜地叫一声“妈妈”。</p>
      <p className='txt'>20世纪60年代以来，避孕技术的进步使控制生育变得更加容易。但大量的经验证据表明，女性意外怀孕的比例还是相当高的，因此选择合适的避孕方式显得更加重要。中国家庭都用什么方式避孕？</p>
      <div
        id="china-map"
        style={{ height: "450px", width: "50%", display: "inline-block" }}
      ></div>
      <div
        id="myChart"
        style={{
          height: "450px",
          width: "50%",
          display: "inline-block",
        }}
      ></div>
      <div id="myLineChart" style={{ height: "600px", width: "1200px" }}></div>
      <p className='txt'>随着社会思想的改变，我国青年尤其是大学生群体对于“性”的看法已经悄然发生变化，对于这一话题，并不像传统文化如此讳莫如深。大学生群体的首次性行为发生时间在18至19岁之间，超过半数的超过半数的大学生可以接受婚前性行为（男生75.14%，女生55.03%），对开房或同居持接受态度（男生83.85%，女生60.97%）。而到大学本科毕业时，有超过一半的大学生（52.85%）已经发生过插入式性行为。然而，在性观念的快速开放的转变中，与之相配的性知识水平尤其是避孕知识的掌握，并没有跟上大学生群体思想观念的改变。</p>
      <div style={{ textAlign: 'center' }}>
        <img style={{
          width: "700px",
          height: "auto",
        }} src={picture3} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <img style={{
          width: "700px",
          height: "auto",
        }} src={picture4} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <img style={{
          width: "700px",
          height: "auto",
        }} src={picture5} />
      </div>
      <p className='txt'>数据显示，接近一半的大学生（43.02%）无法做到每次性行为采取避孕措施，40.37%的大学生会选择体外射精或安全期避孕法，而这两种避孕方法失败率较高。而在有过性行为的大学生中，5%左右的大学生经历过意外怀孕。在这些经历过意外怀孕的人中，13.21%的人首次性行为后就遭遇了意外怀孕，更有17.49%的人有过多次意外怀孕经历，而九成以上的人最后都选择了人工流产作为处理方式。大多数大学生缺乏心理准备和经济能力迎接新生命的降临，而人工流产不仅会造成女方的心理压力，也容易导致生殖道感染、宫腔粘连、慢性盆腔炎等疾病的发生，严重危害女生的身心健康。因此，选择科学有效的避孕措施尤为重要。</p>
      <div style={{ textAlign: 'center' }}>
        <img style={{
          width: "700px",
          height: "auto",
        }} src={picture6} />
      </div>
      <p className='txt'>一个新生命的降临，父母生理上的成熟只是第一步，更多的是需要双方心理和经济上的独立，在没有准备好成为父母之前，科学的避孕方式是最佳选择。林佳佳有时也会想到以前的日子。“孩子健康快乐地长大现在是我最大的愿望，工作和生活也有了动力，下班后看着她就算忙了一天也不觉得累。但是有时候我也会想起没有孩子的日子，如果当初没有留下她，是不是会更自由。”</p>
      <p style={{ textAlign: "right"}}>（文中人物为化名）</p>
      <p className='txt'>数据来源：</p>
      <p className='txt'>《2006-2017中国人口与就业统计年鉴》</p>
      <p className='txt'>《十城市单亲妈妈生活状况及需求调研报告》</p>
      <p className='txt'>《2019-2020全国大学生性与生殖健康调查报告》</p>
      <p className='txt'>丁香医生、第十一诊室、界面新闻</p>
    </>
  );
};

export default App;
