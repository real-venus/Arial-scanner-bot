import TitleCard from "../../../components/Cards/TitleCard"
import React from 'react';
import { binanceCryptoIcons} from 'binance-icons';
import { LoadingOutlined } from '@ant-design/icons'

function HotSignal(hot){
    const data = hot.hot;
    var data_update = data.filter(item => item.volume > 1000000).sort((a, b) => Number(b.volume) - Number(a.volume));
    var hasBtc = binanceCryptoIcons.has('');
    var btcIcon = binanceCryptoIcons.get('');
    const default_hasBtc = binanceCryptoIcons.has('cfx');
    const default_btcIcon = binanceCryptoIcons.get('cfx');
    return(
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
                            data_update.length ? data_update.map((item, index) => {
                                var unKnown = item.symbol.slice(0, -4).toLowerCase();
                                hasBtc = binanceCryptoIcons.has(unKnown);
                                btcIcon = binanceCryptoIcons.get(unKnown);
                                if( index < 5 )
                                    return(
                                        <tr key={index}>
                                            <th className="text-slate-300">#{index+1}</th>
                                            <th className=" text-[16px] flex flex-col md:flex-row items-center  text-slate-300 uppercase">
                                                {
                                                    hasBtc ? 
                                                    <span dangerouslySetInnerHTML={{__html: btcIcon.replace('"32"', '"24"')}} />
                                                    :
                                                    <span dangerouslySetInnerHTML={{__html: default_btcIcon.replace('"32"', '"24"')}} />
                                                }{item.symbol.slice(0, -4)}/{item.symbol.slice(-4, )}
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
                !data_update.length && 
                <p className="mt-[100px] text-center text-2xl font-bold m-auto">
                    Now, No Matching Data  😭<br />
                    if there are long signal data,it will display.
                    please wait. 
                </p>
            }
        </TitleCard>
    )
}

export default HotSignal