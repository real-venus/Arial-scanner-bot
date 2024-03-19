import { useState } from "react"
import { useDispatch } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { showNotification } from "../common/headerSlice"
import { binanceCryptoIcons } from 'binance-icons';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons'
import io from 'socket.io-client';
// var socket = io.connect(`${"window.location.hostname"}:4000`);
var socket = io.connect("https://commune-predict-backend-1.onrender.com/");
// var socket = io.connect("https://168.119.36.145:4000");

function Hot() {

    // const dispatch = useDispatch()
    // const updateIntegrationStatus = (index) => {
    //     let integration = integrationList[index]
    //     setIntegrationList(integrationList.map((i, k) => {
    //         if(k===index)return {...i, isActive : !i.isActive}
    //         return i
    //     }))
    //     dispatch(showNotification({message : `${integration.name} ${integration.isActive ? "disabled" : "enabled"}` , status : 1}))
    // }
    const [hot_data, setData3] = useState([]);
    const [requestFlag, setRequestFlag] = useState(false);
    var hasBtc = binanceCryptoIcons.has('');
    var btcIcon = binanceCryptoIcons.get('');
    const default_hasBtc = binanceCryptoIcons.has('cfx');
    const default_btcIcon = binanceCryptoIcons.get('cfx');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    var fnial_data = hot_data.filter(item => item.volume > 1000000).sort((a, b) => Number(b.volume) - Number(a.volume));

    const startWebsocket = () => {
        socket.on('realTimeData', (data) => {
            if (data.status == "ok") {
                if (data.realTimeData) {
                    // console.log(data.realTimeTokens);
                    setData3(data.realTimeData);
                } else {
                    setData3([]);
                }
            } else {
                console.log('status : error');
            }
        })
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

    return (
        <>
            <div className="mt-[10px] grid grid-cols-1 md:grid-cols-1 min-h-[90vh] overflow-hidden ">
                <TitleCard title={"Hot Signal"}>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th className="normal-case text-slate-300">No</th>
                                    <th className="normal-case text-slate-300">Pairs</th>
                                    <th className="normal-case text-slate-300">Price</th>
                                    <th className="normal-case text-slate-300">Volume</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    fnial_data.length ? fnial_data.map((item, index) => {
                                        var unKnown = item.symbol.slice(0, -4).toLowerCase();
                                        hasBtc = binanceCryptoIcons.has(unKnown);
                                        btcIcon = binanceCryptoIcons.get(unKnown);
                                        return (
                                            <tr key={index}>
                                                <th className="text-slate-300">#{index + 1}</th>
                                                <th className=" text-[16px] flex flex-col md:flex-row items-center  text-slate-300 uppercase">
                                                    {
                                                        hasBtc ?
                                                            <span dangerouslySetInnerHTML={{ __html: btcIcon.replace('"32"', '"24"') }} />
                                                            :
                                                            <span dangerouslySetInnerHTML={{ __html: default_btcIcon.replace('"32"', '"24"') }} />
                                                    }{item.symbol.slice(0, -4)}/{item.symbol.slice(-4,)}
                                                </th>
                                                <td className="text-slate-300">{Number(item.price).toFixed(4)}</td>
                                                <td className="text-slate-300">$ {Number(item.volume).toFixed(4)}</td>
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
                        !fnial_data.length && <p className="mt-[100px] text-center text-2xl font-bold m-auto">No Matching Data  😭<br />There are currently no Short Signals showing a 0.5% difference in token price over 3 minutes.</p>
                    }
                </TitleCard>
            </div>
        </>
    )
}

export default Hot