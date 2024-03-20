import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { setPageTitle, showNotification } from "../common/headerSlice"
import RoadmapNav from "./components/RoadmapNav"
import ReadMe from "./components/RoadmapContent"
import RoadmapContent from "./components/RoadmapContent"



function Roadmap(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Documentation"}))
      }, [])


    return(
        <>
            <div className="bg-gray-900 flex overflow-hidden  rounded-lg" style={{height : "90vh"}}>
                    <div className="flex-none p-4">
                        <RoadmapNav activeIndex={1}/>
                    </div>

                    <div className="grow pt-16  overflow-y-scroll">
                        <RoadmapContent />
                    </div>

                </div>
           
        </>
    )
}

export default Roadmap