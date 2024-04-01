import React, { useMemo } from "react"

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Customized,
  Rectangle
} from "recharts"

const data1 = [
  {
    name: 'Page A',
    d1: 4000,
    d2: 2400,
   
  },
  {
    name: 'Page B',
    d1: 3000,
    d2: 1398,
  
  },
  {
    name: 'Page C',
    d1: 2000,
    d2: 9800,
  
  },
  {
    name: 'Page D',
    d1: 2780,
    d2: 3908,
   
  },
  {
    name: 'Page E',
    d1: 1890,
    d2: 4800,
    
  },
  {
    name: 'Page F',
    d1: 2390,
    d2: 3800,
  
  },
  {
    name: 'Page G',
    d1: 3490,
    d2: 4300,
    
  },
];

// using Customized gives you access to all relevant chart props
const CustomizedRectangle = (props) => {

  const custom_data = (props) => {
    return props.map((datum) => ({
      name: datum.group,
      avgRefTimeNormal: datum.ref_time.normal ,
      avgRefTimeMandatory: datum.ref_time.mandatory
  
    }))
  }
  const { formattedGraphicalItems } = props;
  // get first and second series in chart
  const firstSeries = formattedGraphicalItems[0];
  const secondSeries = formattedGraphicalItems[1];

  // render custom content using points from the graph
  let temp_pos='Short';
  return firstSeries?.props?.points.map((firstSeriesPoint, index) => {
    const secondSeriesPoint = secondSeries?.props?.points[index];

    return (
      <Rectangle
        key={firstSeriesPoint.payload.name}
        width={4}
        height={20}
        x={secondSeriesPoint.x - 2}
        y={secondSeriesPoint.y-10}
        fill={firstSeriesPoint.payload.pos== 'Short'? 'green' : firstSeriesPoint.payload.pos== 'Long' ? 'red' : 'none'}
      />
    )
  })
};



const colors = {
  ref_time: {
    normal: "#D32F2F", // Red 700
    operational: "#1976D2", // Blue 700
    mandatory: "#388E3C", // Green 700
    total: "#FBC02D", // Yellow 700
  },
  proof_size: {
    normal: "#7B1FA2", // Purple 700
    operational: "#F57C00", // Orange 700
    mandatory: "#C2185B", // Pink 700
    total: "#00796B", // Teal 700
  },
}
const ProcessData =(data) => {
  let m_data = data;
  let count = 0;
  let first =''
  first=m_data[0].ref_time.position;
  console.log(m_data[0].ref_time.position)
  // let array =[];
  // for(let i = 1;i < data.length; i ++){
  //    if(data[i].ref_time.position == "Short"||data[i].ref_time.position == "Long"){
  //      if(first ==data[i].ref_time.position ){
  //           array.push(i)
  //      }
  //      else {

  //       for(let j = 0; j < array.length-1; j++)
  //         {
  //           data[array[j]].ref_time.position= '';
  //         }  
  //         data[array[array.length - 1]].ref_time.position= first; 
  //         first=data[i].ref_time.position
  //         array = [];
  //      }
  //    }
  // }
  return data;
}
const ConsumptionChart = ({
  data,
  refTimeDisplayed,
}) => {

  const formatData = (data) => {
    let prev_pos='';
    // let data1 = ProcessData(data);
    return data.map((datum) =>
   ({
      date: datum.group,
      avgRefTimeNormal: datum.ref_time.normal ,
      avgRefTimeMandatory: datum.ref_time.mandatory ,
      pos:datum.ref_time.position 
    }))
  }

  const formattedData = useMemo(() => formatData(data), [data])
 console.log(formattedData)
  const formatYAxisTick = (value) => `${(value).toFixed(4)}`
  const formatTooltip = (value, name) => {
    return `${(value).toFixed(4)}`
  }

  return (
    <div className="w-full rounded-lg p-4 shadow-md dark:bg-gray-900 dark:text-white text-white">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={formatYAxisTick} />
          <Tooltip
            formatter={formatTooltip}
            wrapperClassName="rounded-md text-black dark:text-white !bg-background p-2 shadow-md dark:shadow-lg"
            labelClassName="mb-2 p-0"
            itemStyle={{ padding: "0" }}
          />
          <Legend />
          {refTimeDisplayed && (
            <>
              <Line
                type="monotone"
                dataKey="avgRefTimeNormal"
                stroke={colors.ref_time.normal}
                name="MACD"
                activeDot={{ r: 6 }}
                dot={{ r: 0 }}
              />
              
              <Line
                type="monotone"
                dataKey="avgRefTimeMandatory"
                stroke={colors.ref_time.mandatory}
                name="SIGNAL"
                dot={{ r: 0 }}
                activeDot={{ r: 6 }}
              />
              <Customized component={CustomizedRectangle} />
            </>
          )}
          
        </LineChart>
      </ResponsiveContainer>
         {/* <ResponsiveContainer width="100%" height={500}>
      <LineChart
        width={500}
        height={300}
        data={formattedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="namew" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="avgRefTimeNormal"  stroke={colors.ref_time.mandatory}    name="SIGNAL"    activeDot={{ r: 6 }}/>
        <Line type="monotone" dataKey="avgRefTimeMandatory"  stroke={colors.ref_time.mandatory}   name="SIGNAL"    activeDot={{ r: 6 }}/>
        <Customized component={CustomizedRectangle} />
      </LineChart>
    </ResponsiveContainer> */}
    </div>
  )
}

export default ConsumptionChart
