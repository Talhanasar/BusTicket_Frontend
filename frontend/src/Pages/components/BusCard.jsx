const BusCard = ({data}) => {
    const {busName,busWay,departureTime,timeRequired,ticketPrice,seatsAvailable,boardingPoint,droppingPoint} = data;
    return (
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 bg-white px-4 lg:px-6 py-4 rounded-xl md:rounded-3xl text-[#030712] font-['Inter'] w-full">
            <div className="left flex-1 min-w-0">
                <div className="upper flex flex-wrap justify-between items-center gap-3">
                    <div className="left flex justify-between items-center gap-2 lg:gap-3 min-w-0">
                        <img className="h-4 md:h-8 shrink-0" src="/images/bus-logo.png" alt="bus-logo" />
                        <span className="min-w-0">
                            <h2 className="text-sm md:text-2xl font-bold font-['Raleway'] truncate">{busName}</h2>
                            <p className="text-xs md:text-base text-[#030712]/60 truncate">Route: {busWay} • Departs: {departureTime}</p>
                        </span>
                    </div>
                    <div className="right shrink-0">
                        <div className="flex justify-center items-center rounded-lg md:rounded-xl px-3 h-7 md:h-10 bg-[#1dd100]/15 text-[#1dd100] gap-2">
                            <img className="h-3 md:h-5" src="/images/seat-green.png" alt="seat-icon" />
                            <span className="text-xs md:text-sm font-['Inter'] whitespace-nowrap">{seatsAvailable} Seats left</span>
                        </div>
                    </div>
                </div>
                <div className="lower bg-[#f7f8f9] rounded-xl lg:rounded-3xl w-full p-3 lg:p-6 mt-3 lg:mt-6">
                    <BusData info={"Route"} data={busWay}/>
                    <BusData info={"Departure Time"} data={departureTime}/>
                    <BusData info={"Est. Time"} data={timeRequired}/>
                    <ul className="flex flex-col sm:flex-row flex-wrap justify-between items-stretch gap-2 py-3 lg:py-4 text-xs lg:text-base font-medium text-[#030712]/80">
                        <li className="bg-[#030712]/5 px-3 py-2 rounded-lg flex-1 min-w-[8rem] text-center break-words"><b>Boarding Point</b> - {boardingPoint}</li>
                        <li className="bg-[#030712]/5 px-3 py-2 rounded-lg flex-1 min-w-[8rem] text-center break-words"><b>Dropping Point</b> - {droppingPoint}</li>
                        <li className="bg-[#030712]/5 px-3 py-2 rounded-lg flex-1 min-w-[8rem] text-center break-words"><b>Per Seat</b> - BDT {ticketPrice}</li>
                    </ul>
                </div>
            </div>
            <div className="right flex justify-center items-center gap-3 lg:gap-4 lg:border-l lg:border-[#030712]/10 lg:pl-6 w-full lg:w-auto lg:self-stretch">
                <img className="hidden lg:block h-full w-auto max-h-24 object-contain" src="/images/info-devider.png" alt="devider" />
                <div className="flex flex-row lg:flex-col justify-center items-center gap-3 lg:gap-1 font-['Raleway']">
                    <img className="w-6 lg:w-9" src="/images/fare.png" alt="taka icon" />
                    <span className="font-bold text-base lg:text-2xl whitespace-nowrap">{ticketPrice} Taka</span>
                    <span className="font-semibold text-[#030712]/60 text-xs lg:text-base whitespace-nowrap">Per Seat</span>
                </div>
            </div>
        </div>
    )
}

const BusData = ({info,data}) => {
   return(
   <>
        <div className="flex justify-between items-center font-['Raleway'] text-xs lg:text-base py-2 lg:py-3 font-semibold gap-4">
            <span className="text-[#030712]/60">{info}</span>
            <span className="text-right break-words">{data}</span>
        </div>
        <div className="border-t border-dashed border-gray-400 w-full"></div>
    </>
   )
}

export default BusCard
