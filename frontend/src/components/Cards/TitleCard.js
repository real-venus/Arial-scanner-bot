import Subtitle from "../Typography/Subtitle"

  
  function TitleCard({title, children, topMargin, TopSideButtons}){
      return(
          <div className={"pt-11 card w-full p-6 bg-gray-900 shadow-xl min-h-[400px] !important" + (topMargin || "mt-6")}>

            {/* Title for Card */}
              <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
                {title}

                {/* Top side button, show only if present */}
                {
                    TopSideButtons && <div className="inline-block float-right">{TopSideButtons}</div>
                }
              </Subtitle>
              <div className="m-auto w-full h-[3px] bg-gray-500 mb-[4px] mt-[10px]"></div>
          
              {/** Card Body */}
              <div className='h-full w-full pb-6 bg-gray-900'>
                  {children}
              </div>
          </div>          
      )
  }  
  
  export default TitleCard