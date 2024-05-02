import TitleCard from "../../../components/Cards/TitleCard"
import React from 'react';
import { binanceCryptoIcons} from 'binance-icons';
import { LoadingOutlined } from '@ant-design/icons'

function ShortSignal(short){
    const data = short.short;
    var cnt = 0;
    var hasBtc = binanceCryptoIcons.has('');
    var btcIcon = binanceCryptoIcons.get('');
    const default_hasBtc = binanceCryptoIcons.has('cfx');
    const default_btcIcon = binanceCryptoIcons.get('cfx');
    return(
        // <TitleCard title={"Short Signal"}>
        <div className="bg-gray-900 rounded-xl pb-[10px]">
            <header className="px-5  flex flex-row justify-between items-center dark:border-slate-900">
              <h2 className="font-semibold text-[32px] text-slate-300">Short Signal</h2>
              <a href=""><p className="text-blue-800 font-bold hover:text-blue-500">All</p></a>
            </header>
             <div className="overflow-x-auto">
                <table className="flex flex-col">
                    <thead>
                    <tr className="grid grid-cols-3 gap-x-1 ">
                        {/* <th className="normal-case text-slate-300">No</th> */}
                        <th className="normal-case text-slate-300">Pairs</th>
                        <th className="normal-case text-slate-300">Price</th>
                        <th className="normal-case text-slate-300">Last 3min</th>
                        {/* <th className="normal-case text-slate-300">1h high</th> */}
                        {/* <th className="normal-case text-slate-300">1h low</th> */}
                        {/* <th className="normal-case text-slate-300">Open</th> */}
                    </tr>
                    </thead>
                    <div className="mt-[10px] ml-[10px] w-[95%] h-[3px]  bg-gray-500 mb-[4px]"></div>
                    <tbody>
                        {
                            Object.keys(data).length ? Object.keys(data).map((keyName) => {
                            cnt++;
                            const cryptoItem = data[keyName];
                            var unKnown = Object.keys(data)[0].slice(0,-4);
                            hasBtc = binanceCryptoIcons.has(unKnown);
                            btcIcon = binanceCryptoIcons.get(unKnown);
                            if( cnt <= 5 )
                                return(
                                    <tr key={keyName} className="grid grid-cols-3 gap-x-1 mt-[5px] items-center">
                                        {/* <th className="text-slate-300">#{cnt}</th> */}
                                        <th className="ml-[20px] text-[16px] flex flex-col md:flex-row items-center  text-slate-300 uppercase">
                                            {
                                                hasBtc ? 
                                                <span dangerouslySetInnerHTML={{__html: btcIcon.replace('"32"', '"24"')}} />
                                                :
                                                <span dangerouslySetInnerHTML={{__html: default_btcIcon.replace('"32"', '"24"')}} />
                                            }{Object.keys(data)[cnt-1].slice(0,-4)}/{Object.keys(data)[cnt-1].slice(-4, )}
                                        </th>
                                        <td className="text-slate-300 text-center">{Number(cryptoItem.closePrice).toFixed(4)}</td>
                                        <td className="text-slate-300 text-center">{Number(cryptoItem.change).toFixed(4)} %</td>
                                        {/* <td className="text-slate-300">{Number(cryptoItem.high).toFixed(4)}</td> */}
                                        {/* <td className="text-slate-300">{Number(cryptoItem.low).toFixed(4)}</td> */}
                                        {/* <td className="font-semibold text-white badge badge-danger mb-[13px]">short</td> */}
                                    </tr>
                                )
                            })
                            :
                            <tr></tr>
                        }
                    </tbody>
                </table>
            </div>
            {
                !Object.keys(data).length && 
                <p className="mt-[100px] text-center text-2xl font-bold m-auto">
                    No Matching Data  😭<br />
                </p>
            }
        {/* </TitleCard> */}
        </div>
    )
}

export default ShortSignal