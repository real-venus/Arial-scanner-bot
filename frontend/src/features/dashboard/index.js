
import HotSignal from './components/HotSignal'
import LongSignal from './components/LongSignal';
import ShortSignal from './components/ShortSignal';
import { useState } from 'react'
import io from'socket.io-client';
// var socket = io.connect(`${"window.location.hostname"}:4000`);
// var socket = io.connect("https://commune-predict-backend-1.onrender.com/");
var socket = io.connect("http://168.119.36.145:4000");

function Dashboard(){
    const [hot_data, setData] = useState([]);
    const [long_data, setData1] = useState([]);
    const [short_data, setData2] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const startWebsocket = () => {
      socket.on('backTestData', (data) =>{
        console.log('backTestData', data.backTestData);
      })
      socket.on('realTimeData',(data) =>{
        if(data.status == "ok"){
          if(data.realTimeData){
            setData(data.realTimeData);
          }else{
            setData([]);
          }
        }else{
          console.log('status : Error');
        }
      })
      socket.on('token1min', (data) => {
        if(data.shortTokens){
          setData2(data.shortTokens);
        }
        else{
          setData2([]);
        }
        if(data.longTokens){
          setData1(data.longTokens);
        }
        else{
          setData1([]);
        }
      });
      socket.onclose = () => {
        socket = null;
        setTimeout(startWebsocket, 1000);
      };
      socket.onerror = (error) => {
        socket = null;
        setTimeout(startWebsocket, 1000);
      };
    }
    startWebsocket();
    return(
        <>
        {/** ---------------------- User source channels table  ------------------------- */}
        
            <div className="grid mt-4 grid-cols-1 gap-5">
                <HotSignal hot={hot_data}/>
                <LongSignal long={long_data}/>
                <ShortSignal short={short_data}/>
            </div>
        </>
    )
}

export default Dashboard