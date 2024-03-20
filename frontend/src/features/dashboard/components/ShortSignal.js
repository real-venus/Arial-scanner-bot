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
        <TitleCard title={"Short Signal"}>
             <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th className="normal-case text-slate-300">No</th>
                        <th className="normal-case text-slate-300">Pairs</th>
                        <th className="normal-case text-slate-300">Price</th>
                        <th className="normal-case text-slate-300">Change</th>
                        <th className="normal-case text-slate-300">1h high</th>
                        <th className="normal-case text-slate-300">1h low</th>
                        <th className="normal-case text-slate-300">Open</th>
                    </tr>
                    </thead>
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
                                    <tr key={keyName}>
                                        <th className="text-slate-300">#{cnt}</th>
                                        <th className=" text-[16px] flex flex-col md:flex-row items-center  text-slate-300 uppercase">
                                            {
                                                hasBtc ? 
                                                <span dangerouslySetInnerHTML={{__html: btcIcon.replace('"32"', '"24"')}} />
                                                :
                                                <span dangerouslySetInnerHTML={{__html: default_btcIcon.replace('"32"', '"24"')}} />
                                            }{Object.keys(data)[cnt-1].slice(0,-4)}/{Object.keys(data)[cnt-1].slice(-4, )}
                                        </th>
                                        <td className="text-slate-300">{Number(cryptoItem.closePrice).toFixed(4)}</td>
                                        <td className="text-slate-300">{Number(cryptoItem.change).toFixed(4)} %</td>
                                        <td className="text-slate-300">{Number(cryptoItem.high).toFixed(4)}</td>
                                        <td className="text-slate-300">{Number(cryptoItem.low).toFixed(4)}</td>
                                        <td className="font-semibold text-white badge badge-danger mb-[13px]">short</td>
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
                    No Matching Data  😭<br />There are currently no Short Signals showing a 0.5% difference in token price over 3 minutes.<br />please wait.
                </p>
            }
        </TitleCard>
    )
}

export default ShortSignal