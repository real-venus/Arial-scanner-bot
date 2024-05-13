import React, { useEffect, useRef, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { showNotification } from '../common/headerSlice'
import InputText from '../../components/Input/InputText'
import Datepicker from "react-tailwindcss-datepicker";
import SelectInput from "../../components/Input/SelectInput"
import { useState } from 'react'
import ConsumptionChart from "../../components/Chart/consumption-chart"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,

} from 'chart.js';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  // Tooltip,
  // Legend,
  ResponsiveContainer,
  Customized,
  Rectangle,
} from 'recharts';
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

// using Customized gives you access to all relevant chart props
const CustomizedRectangle = (props) => {
  const { formattedGraphicalItems } = props;
  // get first and second series in chart
  const firstSeries = formattedGraphicalItems[0];
  const secondSeries = formattedGraphicalItems[1];

  // render custom content using points from the graph
  return firstSeries?.props?.points.map((firstSeriesPoint, index) => {
    const secondSeriesPoint = secondSeries?.props?.points[index];
    const yDifference = firstSeriesPoint.y - secondSeriesPoint.y

    return (
      <Rectangle
        key={firstSeriesPoint.payload.name}
        width={10}
        height={30}
        x={secondSeriesPoint.x }
        y={secondSeriesPoint.y}
        fill={'red'}/>
           )
  })
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function Backtesting() {
  const container = useRef();
  const dispatch = useDispatch()
  const [dateValue, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date()
  });
  const symbol = "COINEX:COMAIUSDT";
  const Symboloptions = [
    { value: 'BTCUSDT', label: 'BTCUSDT' }
  ]
  const Intervaloptions = [
    { value: '1m', label: '1m' }
  ]

  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [initialBalance, setInitialBalance] = useState("");
  const [finalBalance, setFinalBalance] = useState("");
  const [profitloss, setProfitloss] = useState("");
  const [coinsymbol, setCoinsymbol] = useState("BTCUSDT");
  const [interval, setInterval] = useState("");

  const [historicConsumption, setHistoricConsumption] = useState([]);

  const updateProfile = () => {
    dispatch(showNotification({ message: "Back Testing", status: 1 }))

    console.log("data-------", [initialBalance, finalBalance, profitloss, coinsymbol, interval, dateValue]);
  }

  const handleDatePickerValueChange = (newValue) => {
    setStartDateTime(new Date(newValue.startDate).getTime());
    setEndDateTime(new Date(newValue.endDate).getTime());
    setDateValue(newValue.startDate, newValue.endDate);
  }

  // useEffect(() => {
    // fetch(`http://127.0.0.1:8000/${coinsymbol}/1m/${startDateTime}/${endDateTime}`)
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    // })
    // .then(data => {
      // Process the received data
    //   const macdValues = data.macd;
    //   const signalValues = data.signal;
    //   const profitloss1 = data.backTestResult.profit_loss
    //   const finalBalance1 = data.backTestResult.final_balance
    //   const transformedData = macdValues.map((value, index) => ({
    //     "group": data.backTestData[index].openTime,
    //     "ref_time": {
    //       "normal": value,
    //       "mandatory": signalValues[index]
    //     }
    //   }));
    //   setHistoricConsumption(transformedData);
    //   setProfitloss(profitloss1);
    //   setFinalBalance(finalBalance1);
    // })
    // .catch(error => {
    //   console.error('There was a problem with the fetch operation:', error);
    // });
  // }, [])
  const fetchData = async () => {
   
    try{
      const response = await fetch(`http://127.0.0.1:8000/${coinsymbol}/1m/${startDateTime}/${endDateTime}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // console.log(data);
      const macdValues = data.macd;
      const signalValues = data.signal;
      const profitloss1 = data.backTestResult.profit_loss
      const finalBalance1 = data.backTestResult.final_balance
      const transformedData = macdValues.map((value, index) => ({
        "group": data.backTestData[index].openTime,
        "ref_time": {
          "normal": value,
          "mandatory": signalValues[index],
           "position" :data.positions[index]
        }
      }));
      setHistoricConsumption(transformedData);
      // console.log(transformedData)
      setProfitloss(profitloss1);
      setFinalBalance(finalBalance1);
      return ;
    } catch(error) {
      console.error('There was a problem fetching data:', error);
    }
  }
  fetchData()
  useEffect(() => {
    // Initial fetch
    //  fetchData()
  }, []);
  // useEffect(()=> fetchData())

  useEffect(() => {
    const script = document.createElement("script");
    if (localStorage.getItem("state") !== "1") {
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
              {
                "autosize": true,
                "symbol": "${symbol}",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "en",
                "enable_publishing": true,
                "withdateranges": true,
                "range": "YTD",
                "hide_side_toolbar": false,
                "allow_symbol_change": true,
                "details": true,
                "hotlist": true,
                "calendar": false,
                "show_popup_button": true,
                "popup_width": "1000",
                "popup_height": "650",
                "support_host": "https://www.tradingview.com"
              }`;
      if (container.current.children.length === 1) {
        container.current.appendChild(script);
      } else {
      }
      localStorage.setItem("state", "1");
    }
    else {
      localStorage.setItem("state", "0");
    }
    // console.log('---------------', symbol)
  },
    [symbol]
  );

  return (
    <div className="flex flex-col gap-5">
      <TitleCard title={"Trading View"}>
        <div className="mt-[50px] h-[650px]" ref={container} >
          <div className=""></div>
        </div>
      </TitleCard>
      <TitleCard title="Backtesting Form" topMargin="mt-2">
        {/* <div className="grid grid-cols md:grid-cols-2 gap-2 ">
          <div className="grid grid-cols gap-2 w-[288px] ml-[100px]"> */}

        <div className="flex flex-row gap-10 mt-5">
          <InputText labelTitle="Initial Balance" defaultValue="" placeholder={100} updateFormValue={(value) => { setInitialBalance(value) }} disable={true} />
          <InputText labelTitle="USD Balance" defaultValue="" placeholder={finalBalance} updateFormValue={(value) => { setFinalBalance(value) }} disable={true} />
          <InputText labelTitle="Profit-Loss" defaultValue="" placeholder={profitloss} updateFormValue={(value) => { setProfitloss(value) }} disable={true} />
        </div>
        <div className="flex flex-row gap-10 mt-10">
          <SelectInput labelTitle="Symbol" updateFormValue={(value) => { setCoinsymbol(value) }} options={Symboloptions} />
          <SelectInput labelTitle="Interval" updateFormValue={(value) => { setInterval(value) }} options={Intervaloptions} />
          <div>
            <label className="label">
              <span className={"label-text text-base-content "}>Date</span>
            </label>
            <Datepicker
              containerClassName="w-72"
              value={dateValue}
              theme={"light"}
              inputClassName="input input-bordered w-72"
              popoverDirection={"down"}
              toggleClassName="invisible"
              onChange={handleDatePickerValueChange}
              showShortcuts={true}
              primaryColor={"white"}
            />
          </div>
        </div>

        {/* <div className="mt-[50px] mr-[100px]">
          <Line data={data} options={options} />
        </div> */}
        <div>

          <ConsumptionChart
            data={historicConsumption}   
            grouping={"hour"}
            refTimeDisplayed={true}
            proofSizeDisplayed={true}
          />

        </div>

        <div className="divider" ></div>

        <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => updateProfile()}>Run</button></div>
      </TitleCard>
      
    </div>
  )
}

export default (Backtesting)