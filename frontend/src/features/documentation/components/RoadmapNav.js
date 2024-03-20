import { useState } from "react"

function RoadmapNav({activeIndex}){

    const SECTION_NAVS = [
        {name : "Introduction", isActive : activeIndex === 1 ? true : false},
        {name : "Signal collection and Prediction", isActive : false},
        {name : "Data collection Logic", isActive : false},
        {name : "AI-Powered Price Prediction", isActive : false},
        {name : "Signal Prioritization", isActive : false},
        {name : "Access and Features", isActive : false},
        {name : "Getting Started", isActive : false},
        {name : "Benefits of Joining", isActive : false},
        {name : "Continuous Improvement", isActive : false},
        {name : "Ready to Trade Smarter?", isActive : false},
    ]
    const [navs, setNavs] = useState(SECTION_NAVS)

    const scrollToSection = (currentIndex) => {
        setNavs(navs.map((n, k) => {
            if(k === currentIndex)return {...n, isActive : true}
            else return {...n, isActive : false}
        }))
        document.getElementById('getstarted'+(currentIndex+1)).scrollIntoView({behavior: 'smooth' })
    }

    return(
        <ul className="menu w-76 mt-10 text-sm">
            <li className="menu-title"><span className="">Docs</span></li>
            
            {
                navs.map((n, k) => {
                    return(
                        <li key={k} onClick={() => scrollToSection(k)} className={n.isActive ? "bordered" : ""}><a>{n.name}</a></li>
                    )
                })
            }
        </ul>
    )
}

export default RoadmapNav