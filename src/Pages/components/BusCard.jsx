const BusCard = ({h,w,data}) => {
    const {busName,busWay,departureTime,timeRequired,ticketPrice,seatsAvailable,boardingPoint,droppingPoint} = data;
    const fontsize = h/(w*0.36);
    return (
        <div  style={{width:`${w}vw`, height:`${h}vw`,fontSize:`${fontsize}em`}} className="flex justify-between items-center bg-white px-6 rounded-[1.5rem] text-[030712] font-['Inter']">
            <div className="left w-[75%]">
                <div className="upper flex justify-between items-center">
                    <div className="left flex justify-between items-center gap-3">
                        <img className="h-[2em]" src="/images/bus-logo.png" alt="bus-logo" />
                        <span>
                            <h2 className="text-[1.8em] font-bold font-['Raleway']">{busName}</h2>
                            <p className="text-[1em] text-[#030712]/60">Coach-009-WEB ! AC_Buisness</p>
                        </span>
                    </div>
                    <div className="right">
                        <div className="flex justify-center items-center rounded-[0.8em] w-[10.3em] h-[3em] bg-[#1dd100]/15 text-[#1dd100] gap-[0.5rem]">
                            <img className="h-[1.3em]" src="/images/seat-green.png" alt="seat-icon" />
                            <span className="text-[0.8em] font-['Inter']">{seatsAvailable} Seats left</span>
                        </div>
                    </div>
                </div>
                <div className="lower bg-[#f7f8f9] rounded-[1.5rem] w-full py-[0.5em] px-[1.5em] mt-[1.5em]">
                    <BusData info={"Route"} data={busWay}/>
                    <BusData info={"Departure Time"} data={departureTime}/>
                    <ul className="flex justify-between items-center py-[1em]">
                        <li className="text-[0.8em] font-medium text-[#030712]/80 bg-[#030712]/5 p-[0.7em] rounded-[0.7em] w-[14em] text-center"><b>Boarding Point</b> - {boardingPoint}</li>
                        <li className="text-[0.8em] font-medium text-[#030712]/80 bg-[#030712]/5 p-[0.7em] rounded-[0.7em] w-[14em] text-center"><b>Dropping Point</b> - {droppingPoint}</li>
                        <li className="text-[0.8em] font-medium text-[#030712]/80 bg-[#030712]/5 p-[0.7em] rounded-[0.7em] w-[14em] text-center"><b>Est. Time</b> - {timeRequired}</li>
                    </ul>
                </div>
            </div>
            <div className="right flex justify-center items-center h-full w-[25%] gap-2">
                <img className=" h-[calc(100%+0.03rem)] object-contain" src="/images/info-devider.png" alt="devider" />
                <div className="flex flex-col justify-center items-center">
                    <img className="w-[2.2em]" src="/images/fare.png" alt="taka icon" />
                    <span className="font-['Raleway'] font-bold text-[1.5em] mt-[0.5em]">{ticketPrice} Taka</span>
                    <span className="font-['Raleway'] font-semibold text-[#030712]/60 text-[1em]">Per Seat</span>
                </div>
            </div>
        </div>
    )
}

const BusData = ({info,data}) => {
   return( 
   <>
        <div className="flex justify-between items-center font-['Raleway'] py-3">
            <span className="font-semibold text-[#030712]/60 text-[1em]">{info}</span>
            <span className="font-semibold text-[1em]">{data}</span>
        </div>
        <div className="border border-gray-500 border-dashed w-full"></div>
    </>
   )
}

export default BusCard

