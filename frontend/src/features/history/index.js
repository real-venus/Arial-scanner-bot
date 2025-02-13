import { useState } from "react"
import { useDispatch } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { showNotification } from "../common/headerSlice"
import { binanceCryptoIcons } from 'binance-icons';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons'
import io from 'socket.io-client';
// var socket = io.connect("https://commune-predict-backend-1.onrender.com/");
// var socket = io.connect("https://168.119.36.145:4000");
var socket = io.connect(`${window.location.hostname}:4000`);

function History() {

    const [data, setData] = useState([]);
    var hasBtc = binanceCryptoIcons.has('');
    var btcIcon = binanceCryptoIcons.get('');
    const default_hasBtc = binanceCryptoIcons.has('cfx');
    const default_btcIcon = binanceCryptoIcons.get('cfx');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    var cnt = 0;
    const startWebsocket = () => {
        socket.on('token1min', (data) => {
            if (data.history) {
                setData(data.history);
            } else {
                setData([]);
            }
        });
        socket.onclose = () => {
            socket = null;
            setTimeout(startWebsocket, 5000);
        };
        socket.onerror = (error) => {
            socket = null;
            setTimeout(startWebsocket, 1000);
        };
    }
    startWebsocket();
    console.log(data);

    return (
        <>
            <div className="mt-[10px] grid grid-cols-1 md:grid-cols-1 min-h-[90vh] overflow-hidden ">
                <TitleCard title={"history"}>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th className="normal-case text-slate-300">No</th>
                                    <th className="normal-case text-slate-300">Pairs</th>
                                    <th className="normal-case text-slate-300">Open Time</th>
                                    <th className="normal-case text-slate-300">Open Price</th>
                                    <th className="normal-case text-slate-300">Close Time</th>
                                    <th className="normal-case text-slate-300">Close Price</th>
                                    <th className="normal-case text-slate-300">Change</th>
                                    <th className="normal-case text-slate-300">Volume</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.length ? data.map((item, index) => {
                                        cnt++;
                                        var unKnown = item.symbol.slice(0, -4).toLowerCase();
                                        hasBtc = binanceCryptoIcons.has(unKnown);
                                        btcIcon = binanceCryptoIcons.get(unKnown);
                                        return (
                                            <tr key={index}>
                                                <th className="text-slate-300">#{cnt}</th>
                                                <th className=" text-[16px] flex flex-col md:flex-row items-center  text-slate-300 uppercase">
                                                    {
                                                        hasBtc ? <span dangerouslySetInnerHTML={{ __html: btcIcon.replace('"32"', '"24"') }} /> 
                                                        :
                                                        <span dangerouslySetInnerHTML={{ __html: default_btcIcon.replace('"32"', '"24"') }} />
                                                    }{item.symbol}
                                                </th>
                                                <td className="text-slate-300">{item.openTime}</td>
                                                <td className="text-slate-300">{item.openPrice}</td>
                                                <td className="text-slate-300">{item.closeTime}</td>
                                                <td className="text-slate-300">{item.closePrice}</td>
                                                    {Number(item.change).toFixed(4) > 0 ?
                                                        <td className="text-emerald-500">{Number(item.change).toFixed(4)}</td>
                                                        :
                                                        <td className="text-red-300">{Number(item.change).toFixed(4)}</td>
                                                    }
                                                <td className="text-slate-300">{item.volume}</td>
                                            </tr>
                                        )
                                    })
                                        :
                                        <tr>

                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        !Object.keys(data).length && <p className="mt-[100px] text-center text-2xl font-bold m-auto">No Matching Data  😭<br />please wait.</p>
                    }
                </TitleCard>
            </div>
        </>
    )
}

export default History