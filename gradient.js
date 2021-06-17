
const colorBreakPoint = 3000;
const TinyLineChart = () => ({
	render () {
  	const { min, max } = data.reduce((result, dataPoint) => ({
    	min: (dataPoint.pv < result.min || result.min === 0) ? dataPoint.pv : result.min,
    	max: (dataPoint.pv > result.max || result.max === 0) ? dataPoint.pv : result.max,
  	}), { min: 0, max: 0 });
    const colorBreakPointPercentage = `${(1 - ((colorBreakPoint - min) / (max - min))) * 100}%`;

  	return (
    	<LineChart width={300} height={100} data={data}>
      	<defs>
          <linearGradient id="colorUv" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="green" />
            <stop offset={colorBreakPointPercentage} stopColor="green" />
            <stop offset={colorBreakPointPercentage} stopColor="red" />
            <stop offset="100%" stopColor="red" />
          </linearGradient>
        </defs>
        <Line type='monotone' dataKey='pv' stroke='url(#colorUv)' strokeWidth={2} dot={false} activeDot={false} />
        <Tooltip />
      </LineChart>
    );
  }
})









import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const gradientOffset = () => {
  const dataMax = Math.max(...data.map((i) => i.uv));
  const dataMin = Math.min(...data.map((i) => i.uv));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};
const off = gradientOffset();

const expectedValueUV = (key) => {
  let sum = 0;
  data.forEach((item) => {
    sum += item[key];
  });
  sum = sum / data.length;
  return sum;
};

const averagePV = expectedValueUV("pv");
const averageUV = expectedValueUV("uv");
// const averageAMT = expectedValueUV('amt');

const dispersion = (key, averageValue) => {
  let disp = 0;
  data.forEach((item) => {
    disp += Math.pow(item[key] - averageValue, 2);
  });
  disp = disp / (data.length - 1);
  disp = Math.sqrt(disp);
  return disp;
};

const dispPV = dispersion("pv", averagePV);
const dispUV = dispersion("uv", averageUV);
// const dispAMT = dispersion('amt', averageAMT);

const zChar = (average, standDisp) => {
  return average + standDisp;
};

const xPV = zChar(dispPV, averagePV);
const xUV = zChar(dispUV, averageUV);
// const xAMT = zChar(dispAMT, averageAMT);

const pvChar = "PV";
// const amtChar = 'AMT';
const uvChar = "UV";

const App = () => {
  return (
    <ComposedChart
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
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <ReferenceLine
        y={xPV}
        label={"z-score = 1 " + pvChar + xPV}
        stroke="#8884d8"
      />
      <ReferenceLine
        y={xUV}
        label={"z-score = 1 " + uvChar + xUV}
        stroke="#82ca9d"
      />
      {/* <ReferenceLine y={xUV} label="Max" stroke="#31ca9d" /> */}
      {/* <Line type="monotone" dataKey="uv" stroke="#31ca9d" /> */}
      <defs>
        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="37.5%">
          <stop offset={off} stopColor="green" stopOpacity={1} />
          <stop offset={off} stopColor="red" stopOpacity={1} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="uv"
        stroke="#82ca9d"
        fill="url(#splitColor)"
      />
    </ComposedChart>
  );
};

export default App;
