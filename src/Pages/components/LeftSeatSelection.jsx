const LeftSeatSelection = ({ selectedSeats, handleSeatSelection, bookedSeats }) => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const seatsPerRow = 4;

    return (
        <>
            <div className="bus flex flex-col w-full lg:w-[55%] font-['Inter']">
                <h1 className=' text-[1.2rem] lg:text-[1.4em] font-["Raleway"] font-semibold mb-[0.3rem] lg:mb-[0.8em]' >Select Your Seat</h1>
                <div className="border border-dashed border-[rgba(3,7,18,0.2)] w-full"></div>
                <div className='info my-[0.5rem] lg:my-[1em] flex justify-around items-center'>
                    <div>
                        <img className="h-[0.8rem] lg:h-[1.3rem]" src="/images/seat-gray.png" alt="seat-gray" />
                        <p className="text-[0.7rem] lg:[0.9rem] text-[#030712]/50 ">Available</p>
                    </div>
                    <div>
                        <img className="h-[0.8rem] lg:h-[1.3rem]" src="/images/seat-booked.svg" alt="seat-booked" />
                        <p className="text-[0.7rem] lg:[0.9rem] text-[#91969c]">Booked</p>
                    </div>
                    <div>
                        <img className="h-[0.8rem] lg:h-[1.3rem]" src="/images/seat-green-filled.png" alt="seat-gray" />
                        <p className="text-[0.7rem] lg:[0.9rem] text-[#1dd100]">Selected</p>
                    </div>
                </div>
                <div className="border border-dashed border-[rgba(3,7,18,0.2)] w-full"></div>
                <div className="flex justify-center items-center">
                    <div className="all-seats text-[0.6rem] lg:text-[0.9rem] text-[#030712]/50">
                        <div className=" flex justify-end w-[99%] m-[0.7rem_0_0.2rem_0] lg:m-[1.8rem_0_0.5rem_0]">
                            <figure className=" h-[1.8rem] w-[2.5rem] lg:w-[4.5rem] lg:h-[3.33rem] bg-[#030712]/10 flex justify-center items-center rounded-[0.3rem] lg:rounded-[0.7rem]">
                                <img className="h-[1.5rem] lg:h-auto" src="/images/wheel.svg" alt="car steering" />
                            </figure>
                        </div>
                        {rows.map((row) => (
                            <div className="rows" key={row}>
                                {Array.from({ length: seatsPerRow }, (_, index) => {
                                    const seatId = `${row}${index + 1}`;
                                    return (
                                        <div
                                            className={`seat ${selectedSeats.includes(seatId) ? 'grr' : ''} ${bookedSeats.includes(seatId) ? 'booked' : ''}`}
                                            id={seatId}
                                            key={seatId}
                                            onClick={() => {
                                                if (!bookedSeats.includes(seatId)) {
                                                    handleSeatSelection(seatId)
                                                }
                                            }}
                                        >
                                            {seatId}
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        ))}
                        <div className="last">
                            {Array.from({ length: 5 }, (_, index) => {
                                const seatId = `K${index + 1}`;
                                return (
                                    <div className={`seat-nokol seat ${selectedSeats.includes(seatId) ? 'grr' : ''} ${bookedSeats.includes(seatId)? 'booked':''}`} id={`K${index + 1}`} key={seatId}
                                        onClick={() => {
                                            if (!bookedSeats.includes(seatId)) {
                                                handleSeatSelection(seatId)
                                            }
                                        }}
                                    >
                                        {seatId}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeftSeatSelection;