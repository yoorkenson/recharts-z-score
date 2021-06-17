import "./App.css";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
// Функция нахождения среднего значения
const expectedValueUV = (key) => {
  let sum = 0;
  data.forEach(item => {
    sum += item[key];    
  });
  sum = sum / data.length;
  return sum;
} 

const averagePV = expectedValueUV('pv');
const averageUV = expectedValueUV('uv');

//Ф-я нахождения дисперсии и стандартного отклонения
const dispersion = (key, averageValue) => {
  let disp = 0;
  data.forEach(item => {
    disp += Math.pow((item[key] - averageValue) , 2);   
  });
  disp = disp / (data.length - 1);
  disp = Math.sqrt(disp);
  return disp;
}

const dispPV = dispersion('pv', averagePV);
const dispUV = dispersion('uv', averageUV);

// Ф-я нахождения значения числа, у которого z-score == 1
const zChar = (average, standDisp) => {
  return average + standDisp;
}

const xPV = zChar(dispPV, averagePV);
const xUV = zChar(dispUV, averageUV);

//Находим, на каком проценте от высоты графика находится значение z-score == 1 для конккретного графика
const dataMinUV = Math.min(...data.map((i) => i.uv));
const dataMaxUV = Math.max(...data.map((i) => i.uv));
const lineUV = `${(1 - ((xUV - dataMinUV) / (dataMaxUV - dataMinUV))) * 100}%`; 

const dataMinPV = Math.min(...data.map((i) => i.pv));
const dataMaxPV = Math.max(...data.map((i) => i.pv));
const linePV = `${(1 - ((xPV - dataMinPV) / (dataMaxPV - dataMinPV))) * 100}%`; 

const CustomizedDot = (props) => {
  const { cx, cy, value, color, xV} = props;

  if (value > xV) {
    return (
      <svg
        x={cx - 5}
        y={cy - 5}
        width={10}
        height={10}
        fill="red"
        viewBox="0 0 1024 1024"
      >
         <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
      </svg>
    );
  }
  return (
    <svg
      x={cx - 5}
      y={cy - 5}
      width={10}
      height={10}
      fill={color}
      viewBox="0 0 1024 1024"
    >
      <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
    </svg>
  );
};

const App = () => {
  return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <defs>
          <linearGradient id="splitColorPV" x1="0" y1="0" x2="0" y2={linePV}>
            <stop offset={1} stopColor="red" stopOpacity={1} />
            <stop offset={1} stopColor="#8884d8" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Line
          type="monotone"
          dataKey="pv"
          stroke="url(#splitColorPV)"
          dot={<CustomizedDot xV={xPV} color='#8884d8'/>}
          strokeWidth={3}
          activeDot={false}
        />
        <defs>
          <linearGradient id="splitColorUV" x1="0" y1="5%" x2="0" y2={lineUV}>
            <stop offset={1} stopColor="red" stopOpacity={1} />
            <stop offset={1} stopColor="#82ca9d" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Line
          type="monotone"
          dataKey="uv"
          stroke="url(#splitColorUV)"
          strokeWidth={3}
          activeDot={false}
          dot={<CustomizedDot xV={xUV} color="#82ca9d"/>}
        />
      </LineChart>
  );
}

export default App;