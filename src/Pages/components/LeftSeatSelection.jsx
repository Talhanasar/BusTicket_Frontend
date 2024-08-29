const LeftSeatSelection = ({ selectedSeats, handleSeatSelection, bookedSeats }) => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const seatsPerRow = 4;

    return (
        <>
            <div className="bus flex flex-col w-[55%] font-['Inter']">
                <h1 className='text-[1.4em] font-["Raleway"] font-semibold mb-[0.8em]' >Select Your Seat</h1>
                <div className="border border-dashed border-[rgba(3,7,18,0.2)] w-full"></div>
                <div className='info my-[1em] flex justify-around items-center'>
                    <div>
                        <img className="h-[1.3em]" src="/images/seat-gray.png" alt="seat-gray" />
                        <p className="text-[#030712]/50">Available</p>
                    </div>
                    <div>
                        <img className="h-[1.3em]" src="/images/seat-booked.svg" alt="seat-booked" />
                        <p className="text-[#91969c]">Booked</p>
                    </div>
                    <div>
                        <img className="h-[1.3em]" src="/images/seat-green-filled.png" alt="seat-gray" />
                        <p className="text-[#1dd100] text-[1.3rem]">Selected</p>
                    </div>
                </div>
                <div className="border border-dashed border-[rgba(3,7,18,0.2)] w-full"></div>
                <div className="flex justify-center items-center">
                    <div className="all-seats text-[0.9rem] text-[#030712]/50">
                        <div className=" w-max my-[0.9rem]">
                            <figure className="w-[4.5rem] h-[3.33rem] bg-[#030712]/10 flex justify-center items-center rounded-[0.7rem]">
                                <img src="/images/wheel.svg" alt="" />
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