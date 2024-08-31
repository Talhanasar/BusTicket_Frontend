import { PiArrowFatLinesRightThin } from "react-icons/pi"
import BusCard from "./components/BusCard"
import { useLoaderData, useLocation, useNavigate } from "react-router-dom"

export const AvailableBus = () => {
    const data = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = (id) => {
        navigate(`/bus/booking/id=${id}`);
    }
    if (data.length < 1) {
        const path = location.pathname;
        const route = path.split('%20')[0].split('=')[1];
        const date = path.split('%20')[1].split('=')[1];
        return (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg p-4">
                <div className="text-[1.2rem] lg:text-2xl font-semibold text-red-500 mb-2">
                    Oops! No Buses Available
                </div>
                <div className=" text-[0.8rem] w-[70%] text-center lg:text-lg text-gray-700">
                    We couldn't find any buses for the selected date and route.
                </div>
                <div className="mt-4 text-gray-500">
                    Date: <span className="font-semibold">{date}</span>
                </div>
                <div className="text-gray-500">
                    Route: <span className="font-semibold">{route}</span>
                </div>
            </div>
        )
    }
    const width = window.innerWidth;
    console.log(width);
    if(window.innerWidth< 450){
        console.log("yes");
        return(
            <ul className="flex flex-col justify-center items-center gap-10 min-h-[100vh] py-6">
            {data.map((currEl) => {
                return (
                    <li key={currEl._id} onClick={() => handleClick(currEl._id)} className="Card-box flex justify-center items-center gap-5 bg-[#f7f8f8] p-3 md:p-6 rounded-[1.5rem] md:rounded-[3rem] cursor-pointer">
                        {
                            
                        }
                        <BusCard w={95} h={45}
                            data={currEl}
                        />
                    </li>
                )
            })}
        </ul>
        )
    }

    return (
        <ul className="flex flex-col justify-center items-center gap-10 min-h-[100vh] py-6">
            {data.map((currEl) => {
                return (
                    <li key={currEl._id} onClick={() => handleClick(currEl._id)} className="Card-box flex justify-center items-center gap-5 bg-[#f7f8f8] p-6 rounded-[3rem] cursor-pointer">
                        <PiArrowFatLinesRightThin className="text-[3rem] animate " />
                        <BusCard w={70} h={18}
                            data={currEl}
                        />
                    </li>
                )
            })}
        </ul>
    )
}