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

  const symbol = "COINEX:COMAIUSDT";
  const historicConsumption = [{ "group": "2024-03-29T05:00", "ref_time": { "normal": 0.044, "operational": 0.0, "mandatory": 0.055 }, "proof_size": { "normal": 0.038999997, "operational": 0.0, "mandatory": 0.010000001 }, "count": 5 }, { "group": "2024-03-29T05:01", "ref_time": { "normal": 0.042, "operational": 0.0, "mandatory": 0.044 }, "proof_size": { "normal": 0.037, "operational": 0.0, "mandatory": 0.008 }, "count": 4 }, { "group": "2024-03-29T05:02", "ref_time": { "normal": 0.031999998, "operational": 0.0, "mandatory": 0.055 }, "proof_size": { "normal": 0.026, "operational": 0.0, "mandatory": 0.010000001 }, "count": 5 }, { "group": "2024-03-29T05:03", "ref_time": { "normal": 0.051999997, "operational": 0.0, "mandatory": 0.055 }, "proof_size": { "normal": 0.046, "operational": 0.0, "mandatory": 0.010000001 }, "count": 5 }, { "group": "2024-03-29T05:04", "ref_time": { "normal": 0.041, "operational": 0.0, "mandatory": 0.055 }, "proof_size": { "normal": 0.038, "operational": 0.0, "mandatory": 0.010000001 }, "count": 5 }, { "group": "2024-03-29T05:05", "ref_time": { "normal": 0.042999998, "operational": 0.0, "mandatory": 0.022 }, "proof_size": { "normal": 0.041, "operational": 0.0, "mandatory": 0.004 }, "count": 2 }]
  const Symboloptions = [
    { value: 'btc', label: 'BTC' },
    { value: 'usdt', label: 'USDT' },
    { value: 'bnb', label: 'BNB' }
  ]
  const Intervaloptions = [
    { value: '1m', label: '1m' },
    { value: '1h', label: '1h' },
  ]
  
  const [dateValue, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date()
  });

  const [initialBalance, setInitialBalance] = useState("");
  const [usedBalance, setUsedBalance] = useState("");
  const [profitloss, setProfitloss] = useState("");
  const [coinsymbol, setCoinsymbol] = useState("");
  const [interval, setInterval] = useState("");

  // Call API to update profile settings changes
  const updateProfile = () => {
    dispatch(showNotification({ message: "Back Testing", status: 1 }))

    console.log("data-------", [initialBalance, usedBalance, profitloss, coinsymbol, interval, dateValue]);
  }

  const handleDatePickerValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setDateValue(newValue);
  }

  useEffect(
    () => {
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
          <InputText labelTitle="Initial Balance" defaultValue="" updateFormValue={(value) => {setInitialBalance(value)}} disable={true} />
          <InputText labelTitle="Used Balance" defaultValue="" updateFormValue={(value) => {setUsedBalance(value)}} disable={true} />
          <InputText labelTitle="Profit-Loss" defaultValue="" updateFormValue={(value) => {setProfitloss(value)}} disable={true} />
        </div>
        <div className="flex flex-row gap-10 mt-10">
          <SelectInput labelTitle="Symbol" updateFormValue={(value) => {setCoinsymbol(value)}} options={Symboloptions} />
          <SelectInput labelTitle="Interval" updateFormValue={(value) => {setInterval(value)}} options={Intervaloptions} />
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

        <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => updateProfile()}>Update</button></div>
      </TitleCard>
    </div>
  )
}

export default memo(Backtesting)