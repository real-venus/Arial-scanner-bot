import React, { useEffect, useRef, memo } from "react"
import TitleCard from "../../components/Cards/TitleCard"
  


function Pair() {
    const container = useRef();
    const symbol = "COINEX:ETHUSDT";

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
        <>
            <TitleCard title={"Trading View"}>
              <div className="h-[480px] " ref={container} >
                  <div className=""></div>
              </div>
            </TitleCard>
        </>
    )
}

export default memo(Pair)