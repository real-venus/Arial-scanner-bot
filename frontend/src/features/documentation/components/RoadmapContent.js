import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Subtitle from '../../../components/Typography/Subtitle'
import { setPageTitle } from '../../common/headerSlice'

function RoadmapContent() {

  const dispatch = useDispatch()



  return (
    <>
      <article className="prose">
        <h1 className="">Comscanner Docs</h1>

        {/* Introduction */}
        <h2 className="" id="getstarted1">Introduction</h2>
        <p >
          <span className='font-bold'>Welcome to Comscanner </span>
          <br />
          where we bring you real-time insights and predictive analytics to empower 
          your cryptocurrency trading decisions.<br />
          Our platform collects and analyzes data from Binance, delivering hot, short, 
          and long signals alongside predictive 
          price forecasts.<br />
          Here's how our platform works and how you can get started:
        </p>
        <div className='flex flex-row gap-4'>
          <p>
            📄   
          </p>
          <a 
            href='https://docs.google.com/presentation/d/1fRBrMuBbPZD8f-t_RIfGbso2_2fcnQ85XFUhXNwFqcs/edit?pli=1#slide=id.p2'
            target='_blink'
          >
            <p className='text-slate-400'>
              Comscanner Whitepaper version 0.0.0
            </p>
          </a>
          <p>
            📄   
          </p>
        </div>
        
        {/* Signal collection and Prediction */}
        <h2 id="getstarted2">Signal collection and Prediction</h2>
        <ul>
          <li>
            We monitor Binance in real-time, collecting hot, short, and<br />
            long signals based on our proprietary logic.
          </li>
          <li>
            Our predictive model analyzes historical data and market trends to<br />
            forecast future price movements for each signal.
          </li>
        </ul>

        {/* Data Collection Logic*/}
        <h2 id="getstarted3">Data Collection Logic</h2>
        <ul>
          <li>
           Token price pairs are intelligently categorized into long and short <br />
           positions using a sophisticated algorithm.
          </li>
          <li>
            We divide the price change percentage between the initial and closing <br/>
            prices over a specified time period to determine the signal's direction.
          </li>
        </ul>

        {/* AI-Powered Price Prediction */}
        <h2 id="getstarted4">AI-Powered Price Prediction</h2>
        <ul>
          <li>
            Our AI algorithms process vast amounts of data to predict future prices<br/> 
            with high accuracy.
          </li>
          <li>
            By leveraging machine learning, we provide insights into potential price <br/>
            movements, helping you stay ahead of the market.
          </li>
        </ul>
        <div className="alert mt-4 alert-success shadow-lg">
          <div>
            <span>
              <span className='font-bold'>
                Note
              </span>
              : Please read guideline.The logic may change depending on the user.
            </span>
          </div>
        </div>
        
        {/* Signal Prioritization */}
        <h2 id="getstarted6">Signal Prioritization</h2>
        <p>
          Hot signals are prioritized based on current trading volume on Binance, <br/>
          ensuring you receive timely and relevant information.
        </p>
        <div className="alert mt-4 alert-warning shadow-lg">
          <div>
            <span>
              <span className='font-bold'>
                Note
              </span>
              : Please read guideline.The logic may change depending on the user.
            </span>
          </div>
        </div>
      
        {/* Access and Features */}
        <h2 id="getstarted8">Access and Features</h2>
        <ul>
          <li>
            Basic features are available to all users free of charge.
          </li>
          <li>
            Unlock premium functionalities by connecting your wallet and holding <br />
            a minimum of 1000 COMAI or WCOMAI tokens.
          </li>
        </ul>
        <div className="alert mt-4 alert-success shadow-lg">
          <div>
            <span>
              <span className='font-bold'>
                Note
              </span>
              : Please read guideline.There are ways to hold your comai tokens or wcomai tokens.
            </span>
          </div>
        </div>

        {/* Getting Started */}
        <h2 id="getstarted8">Getting Started</h2>
        <ul>
          <li>
            Sign up for an account on CryptoSignals to begin your journey <br/>
            towards smarter trading decisions.
          </li>
          <li>
            Connect your wallet to access advanced features and exclusive insights.
          </li>
          <li>
            Ensure you hold at least 1000 COMAI or WCOMAI tokens in your wallet to <br/>
            unlock premium functionalities.
          </li>
        </ul>

        {/* Benefits of Joining */}
        <h2 id="getstarted8">Benefits of Joining</h2>
        <ul>
          <li>
            Access real-time signals and predictive analytics to optimize your trading strategy.
          </li>
          <li>
            Stay informed with accurate price forecasts and timely alerts.
          </li>
          <li>
            Join a vibrant community of traders and investors, sharing insights and experiences.
          </li>
        </ul>

        {/* Continuous Improvement */}
        <h2 id="getstarted8">Continuous Improvement</h2>
        <ul>
          <li>
            We are committed to enhancing our platform continuously based on user feedback and market trends.
          </li>
          <li>
            Your feedback is invaluable in shaping the future of Comscanner.
          </li>
        </ul>

        {/* Ready to Trade Smarter? */}
        <h2 id="getstarted8">Ready to Trade Smarter?</h2>
        <p>
          Join Comscanner server today and take your cryptocurrency trading to the next level.<br/>
          Sign up now to access real-time signals, predictive insights, and exclusive features. <br/>
          Start making smarter trading decisions today!
        </p>

        <div className='h-24'></div>

      </article>
    </>
  )
}

export default RoadmapContent