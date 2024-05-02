import Subtitle from "../Typography/Subtitle"

  
  function TitleCard({title, children, topMargin, TopSideButtons}){
      return(
          <div className={"pt-1 card w-full px-2 pb-[10px] bg-gray-900 shadow-xl min-h-[400px] !important" + (topMargin || "mt-1")}>

            {/* Title for Card */}
              <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
                {title}

                {/* Top side button, show only if present */}
                {
                    TopSideButtons && <div className="inline-block float-right">{TopSideButtons}</div>
                }
              </Subtitle>
              <div className="m-auto w-full h-[3px] bg-gray-500 mb-[2px] mt-[5px]"></div>
          
              {/** Card Body */}
              <div className='h-full w-full bg-gray-900'>
                  {children}
              </div>
          </div>          
      )
  }  
  
  export default TitleCard