const BusCard = ({h,w,data}) => {
    const {busName,busWay,departureTime,timeRequired,ticketPrice,seatsAvailable,boardingPoint,droppingPoint} = data;
    const fontsize = h/(w*0.36);
    return (
        <div  style={{width:`${w}vw`, height:`${h}vw`,fontSize:`${fontsize}rem`}} className="flex justify-between items-center bg-white px-[0.6rem]  lg:px-6 rounded-[0.8rem] md:rounded-[1.5rem] text-[030712] font-['Inter']">
            <div className="left w-[75%]">
                <div className="upper flex justify-between items-center">
                    <div className="left flex justify-between items-center gap-[0.4rem] lg:gap-3">
                        <img className="h-[1rem] md:h-[2em]" src="/images/bus-logo.png" alt="bus-logo" />
                        <span>
                            <h2 className=" text-[0.8rem] md:text-[1.8em] font-bold font-['Raleway']">{busName}</h2>
                            <p className=" text-[0.5rem] md:text-[1em] text-[#030712]/60">Coach-009-WEB ! AC_Buisness</p>
                        </span>
                    </div>
                    <div className="right">
                        <div className="flex justify-center items-center rounded-[0.45rem] md:rounded-[0.8em] w-[5rem] lg:w-[10.3em] h-[1.6rem] lg:h-[3em] bg-[#1dd100]/15 text-[#1dd100] gap-[0.3rem] lg:gap-[0.5rem]">
                            <img className=" h-[0.7rem] lg:h-[1.3em]" src="/images/seat-green.png" alt="seat-icon" />
                            <span className=" text-[0.4rem] lg:text-[0.8em] font-['Inter']">{seatsAvailable} Seats left</span>
                        </div>
                    </div>
                </div>
                <div className="lower bg-[#f7f8f9] rounded-[0.8rem] lg:rounded-[1.5rem] w-full p-[0.3rem_0.8rem] Lg:p-[0.5em_1.5em] mt-[0.5rem] lg:mt-[1.5em]">
                    <BusData info={"Route"} data={busWay}/>
                    <BusData info={"Departure Time"} data={departureTime}/>
                    <ul className="flex justify-between items-center py-[0.6rem] lg:py-[1em] text-[0.3rem] lg:text-[0.8em] font-medium text-[#030712]/80">
                        <li className=" bg-[#030712]/5 p-[0.7em] rounded-[0.7em] w-[14em] text-center"><b>Boarding Point</b> - {boardingPoint}</li>
                        <li className=" bg-[#030712]/5 p-[0.7em] rounded-[0.7em] w-[14em] text-center"><b>Dropping Point</b> - {droppingPoint}</li>
                        <li className=" bg-[#030712]/5 p-[0.7em] rounded-[0.7em] w-[14em] text-center"><b>Est. Time</b> - {timeRequired}</li>
                    </ul>
                </div>
            </div>
            <div className="right flex justify-center items-center h-full w-[33%] lg:gap-2">
                <img className=" h-[calc(100%+0.03rem)] object-contain" src="/images/info-devider.png" alt="devider" />
                <div className="flex flex-col justify-center items-center font-['Raleway']">
                    <img className=" w-[1.2rem] lg:w-[2.2em]" src="/images/fare.png" alt="taka icon" />
                    <span className=" font-bold text-[0.8rem] lg:text-[1.5em] mt-[0.5em]">{ticketPrice} Taka</span>
                    <span className=" font-semibold text-[#030712]/60 text-[0.6rem] lg:text-[1em]">Per Seat</span>
                </div>
            </div>
        </div>
    )
}

const BusData = ({info,data}) => {
   return( 
   <>
        <div className="flex justify-between items-center font-['Raleway'] text-[0.5rem] lg:text-[1em] py-[0.4rem] lg:py-3 font-semibold">
            <span className="text-[#030712]/60">{info}</span>
            <span>{data}</span>
        </div>
        <div className="border border-gray-500 border-dashed w-full"></div>
    </>
   )
}

export default BusCard

