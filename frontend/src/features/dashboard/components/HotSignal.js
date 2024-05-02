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
        // <TitleCard title={"Hot Signal"}>
        <div className="bg-gray-900 rounded-xl pb-[10px]">
            <header className="px-5  flex flex-row justify-between items-center dark:border-slate-900">
              <h2 className="font-semibold text-[32px] text-slate-300">Hot Signal</h2>
              <a href=""><p className="text-blue-800 font-bold hover:text-blue-500">All</p></a>
            </header>
             <div className="overflow-x-auto">
                <table className="flex flex-col">
                    <thead>
                    <tr className="grid grid-cols-3 gap-x-1">
                        {/* <th className="normal-case text-slate-300">No</th> */}
                        <th className="normal-case text-slate-300">Pairs</th>
                        <th className="normal-case text-slate-300">Price</th>
                        <th className="normal-case text-slate-300">Volume</th>
                    </tr>
                    </thead>
                    <div className="mt-[10px] ml-[10px] w-[95%] h-[3px]  bg-gray-500 mb-[4px]"></div>
                    <tbody>
                        {
                            data_update.length ? data_update.map((item, index) => {
                                var unKnown = item.symbol.slice(0, -4).toLowerCase();
                                hasBtc = binanceCryptoIcons.has(unKnown);
                                btcIcon = binanceCryptoIcons.get(unKnown);
                                if( index < 5 )
                                    return(
                                        <tr key={index} className="grid grid-cols-3 gap-x-1 mt-[5px] items-center">
                                            {/* <th className="text-slate-300">#{index+1}</th> */}
                                            <th className="ml-[20px] text-[12px] flex flex-col md:flex-row items-center  text-slate-300 uppercase">
                                                {
                                                    hasBtc ? 
                                                    <span dangerouslySetInnerHTML={{__html: btcIcon.replace('"32"', '"24"')}} />
                                                    :
                                                    <span dangerouslySetInnerHTML={{__html: default_btcIcon.replace('"32"', '"24"')}} />
                                                }{item.symbol.slice(0, -4)}/{item.symbol.slice(-4, )}
                                            </th>
                                            <td className="text-slate-300 text-center">{Number(item.price).toFixed(4)}</td>
                                            <td className="text-slate-300 text-center">$ {Number(item.volume).toFixed(4)}</td>
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
                </p>
            }
        {/* </TitleCard> */}
        </div>
    )
}

export default HotSignal