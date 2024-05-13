
import Pair from '../pair';
import HotSignal from './components/HotSignal'
import LongSignal from './components/LongSignal';
import ShortSignal from './components/ShortSignal';
import { useState } from 'react'
import io from'socket.io-client';
var socket = io.connect(`${window.location.hostname}:4000`);
// var socket = io.connect("https://commune-predict-backend-1.onrender.com/");
// var socket = io.connect("http://168.119.36.145:4000");

function Dashboard(){
    const [hot_data, setData] = useState([]);
    const [long_data, setData1] = useState([]);
    const [short_data, setData2] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const startWebsocket = () => {
      socket.on('backTestData', (data) =>{
        // console.log('backTestData', data.backTestData);
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
          <div className='flex flex-row justify-between'>
            <div className='w-[30%]'>
              <div className="grid grid-cols-1 gap-5">
                  <HotSignal hot={hot_data}/>
                  <LongSignal long={long_data}/>
                  <ShortSignal short={short_data}/>
              </div>
            </div>
            <div className='grid grid-rows-2 gap-y-5 w-[68%]'>
              <div className=''>
                <Pair />
              </div>
              <div>
                <div className="bg-gray-900 rounded-xl pb-[10px] h-[255px]">
                  <header className="px-5  flex flex-row justify-between items-center dark:border-slate-900">
                    <div className='flex flex-row justify-between items-center'>
                      <h2 className="font-semibold text-[32px] text-slate-300">Position</h2>
                      <div className='ml-[40px] mt-[10px] grid grid-cols-4 gap-x-2'>
                        <a href=""><p className="text-blue-800 font-bold hover:text-blue-500">Open Orders</p></a>
                        <a href=""><p className="text-blue-800 font-bold hover:text-blue-500">Open History</p></a>
                        <a href=""><p className="text-blue-800 font-bold hover:text-blue-500">Realized PnL</p></a>
                        <a href=""><p className="text-blue-800 font-bold hover:text-blue-500">Wallet Balance</p></a>
                      </div>
                    </div>
                    
                    <a href=""><p className="text-blue-800 font-bold hover:text-blue-500">All</p></a>
                  </header>
                  <div className="mx-auto mt-[10px] w-[95%] h-[3px]  bg-gray-500 mb-[4px]"></div>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

export default Dashboard