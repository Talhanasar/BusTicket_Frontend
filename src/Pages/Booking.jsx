import { useLoaderData } from "react-router-dom";
import FormRight from "./components/FormRight";
import BusCard from "./components/BusCard";
import LeftSeatSelection from "./components/LeftSeatSelection";
import { useState } from "react";

export const Booking = () => {
    const { data, coupons } = useLoaderData();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const allBookedSeats = data.ticketId.flatMap(ticket => ticket.seatBooked);

    const handleSeatSelection = (seatId) => {
        setSelectedSeats((prev) => {
            if (prev.includes(seatId) && selectedSeats.length > 1) {
                return prev.filter((id) => id !== seatId);
            } else if (!prev.includes(seatId)) {
                return [...prev, seatId];
            }
            return prev;
        });
    }
    let component = <BusCard w={70} h={25} data={data} />
    if(window.innerWidth < 470){
        component = <BusCard w={93} h={45} data={data}/>
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full bg-[#f7f8f9] rounded-t-[4em] p-[3em] border-[#1dd100] border-t-2 gap-[0.8rem]">
                {
                   component
                }
                <div className=" w-[90vw] lg:w-[70vw] flex flex-col items-center lg:items-start lg:flex-row bg-[#ffffff] rounded-[1.5rem] py-[1rem] px-[1.4rem] gap-[0.8rem] ">
                    <LeftSeatSelection handleSeatSelection={handleSeatSelection} selectedSeats={selectedSeats} bookedSeats={allBookedSeats} />
                    <div className=" lg:h-[54rem] w-full lg:w-[1px] border lg:border-l border-dashed border-[rgba(3,7,18,0.2)] mx-4">
                    </div>
                    <FormRight className=" w-[40%] bg-gray-100" selectedSeats={selectedSeats} unitPrice={data.ticketPrice} coupons={coupons} busId={data._id}
                    />
                </div>
            </div>
        </>
    );
}
