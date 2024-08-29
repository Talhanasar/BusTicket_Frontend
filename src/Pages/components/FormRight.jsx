import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { submitForm } from '../Functions/SubmitFunction';
import {useNavigate } from 'react-router-dom';

const FormRight = ({ selectedSeats, unitPrice, coupons, busId }) => {
    const [allPrice, setAllPrice] = useState({});
    const navigate = useNavigate();
    const [inputCoupon, setInputCoupon] = useState({
        value: "",
        used: ""
    });
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: ""
    });
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        const totalPrice = selectedSeats.length * unitPrice;
        const grandTotal = totalPrice - (totalPrice * discount / 100);
        setAllPrice({
            total: totalPrice,
            grandtotal: grandTotal
        });
    }, [selectedSeats, discount]);

    const handleApplyCoupon = () => {
        if (!selectedSeats.length > 0) {
            return toast.error("Select a seat for using discount coupon");
        }
        const foundCoupon = coupons.find(coupon => coupon.code === inputCoupon.value);
        if (foundCoupon) {
            setDiscount(foundCoupon.discountPercentage);
            const newGrandTotal = allPrice.total - (allPrice.total * foundCoupon.discountPercentage / 100);
            setInputCoupon({ value: "", used: foundCoupon._id });
            setAllPrice((prev) => ({ ...prev, grandtotal: newGrandTotal }));
            toast.success(`Coupon applied! ${foundCoupon.discountPercentage}% discount.`);
        } else {
            setDiscount(0);
            setAllPrice((prev) => ({ ...prev, grandtotal: prev.total }));
            toast.error("Invalid coupon code.");
        }
    };

    const handleInputChange = (e) => {
        const name = e.target.name;
        setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const totalData = {...formData,seatBooked: selectedSeats,busId,couponUsed:inputCoupon.used,totalMoney:allPrice.grandtotal}
        setFormData(totalData); 
        const ans = await submitForm(totalData);
        if(ans){
            navigate("/booking-success");
        }
    }


    return (
        <div className="right w-[40%] h-full">
            <div className="flex flex-col font-['Inter'] text-[#030712]">
                <h2 className="font-semibold text-[1.3em] font-['Raleway'] text-[#030712] mb-[0.8em]">Select Your Seat</h2>
                <div className="border border-dashed border-[rgba(3,7,18,0.2)] w-[98%]"></div>

                <div className="rounded-xl bg-[#F7F8F8] p-[1.7em] m-[1em] w-full max-w-lg mx-auto">
                    <div className="flex justify-between w-full">
                        <div className="flex items-center gap-[0.3em]">
                            <span className=" text-[0.8em] text-[#030712]">Seat</span>
                            {selectedSeats.length > 0 ?
                                (<span className="font-bold text-center min-w-[1.4em] rounded-[0.25em] bg-[#1dd100] text-[0.5em] text-white">{selectedSeats.length}</span>)
                                : ""
                            }
                        </div>
                        <span className="font-medium text-[0.8em] text w-[6em]">Class</span>
                        <span className="font-medium text-[0.8em] text">Price</span>
                    </div>

                    <div className="border border-dashed border-[rgba(3,7,18,0.2)] w-[98%] mt-[0.4em] mb-[0.6em]"></div>

                    <div className='max-h-[15rem] min-h-[4rem] overflow-auto'>
                        {selectedSeats.map((seat, idx) => (
                            <div key={idx} className="flex justify-between w-full text-[rgba(3,7,18,0.6)] 
                        text-[0.8em] mb-[0.8em]">
                                <span>{seat}</span>
                                <span>Economy</span>
                                <span>{unitPrice}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[rgba(3,7,18,0.2)] w-full h-px"></div>

                    <div className="flex justify-between w-full font-medium text-[#030712] mt-[0.5em] text-[0.8em]">
                        <span>Total Price</span>
                        <span>BDT {allPrice.total}</span>
                    </div>

                    {discount > 0 && (
                        <div className="flex justify-between w-full font-medium text-[0.8em] text-red-600">
                            <span>Discount {discount}%</span>
                            <span>-BDT {allPrice.total * discount / 100}</span>
                        </div>
                    )}

                    <div className="bg-white rounded-[0.75em] p-[0.3em] my-[0.7em] flex justify-between items-center">
                        <input
                            value={inputCoupon.value}
                            onChange={(e) => setInputCoupon({ ...inputCoupon, 'value': e.target.value })}
                            className="text-[0.75em] outline-none border-none ml-[0.5em]"
                            placeholder='Have any coupon?'
                        />
                        <button
                            type="button"
                            disabled={!inputCoupon.value.length > 0}
                            onClick={handleApplyCoupon}
                            className={`${inputCoupon.value.length > 0 ? 'bg-[#1DD100] ' : 'bg-gray-500'} rounded-[0.5em] py-[0.5em] px-[1em] text-white font-semibold text-[0.8em]`}>
                            Apply
                        </button>
                    </div>

                    <div className="flex justify-between w-full font-medium text-[0.8em]">
                        <span>Grand Total</span>
                        <span>BDT {allPrice.grandtotal}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-[1em] w-full">
                    {['Passenger Name*', 'Phone Number*', 'Email ID'].map((label, idx) => {
                        let names;
                        if (label === "Passenger Name*") {
                            names = label.split(" ")[1].replace("*", "").toLowerCase();
                        } else {
                            names = label.split(" ")[0].toLowerCase();
                        }
                        return (
                            <div key={idx}>
                                <label className="font-semibold text-[0.8em]">{label}</label>
                                <input
                                    type="text"
                                    onChange={handleInputChange}
                                    value={formData.names}
                                    required={names !== 'email'}
                                    name={names}
                                    autoComplete='off'
                                    placeholder={`Enter your ${label.toLowerCase().replace('*', '')}`}
                                    className="w-full border border-[rgba(3,7,18,0.1)] rounded-[0.75em] p-[0.8em] text-[0.8em] mt-[0.3em]"
                                />
                            </div>
                        )
                    })}
                    <button type='submit'
                        className="bg-[#1DD100] rounded-[1em] w-full max-w-lg mx-auto py-[0.8em] text-white font-extrabold text-[1em] font-['Raleway'] my-[1.2em]">
                        Next
                    </button>
                </form>

                <div className="flex justify-around text-[rgba(3,7,18,0.6)] underline max-w-lg mx-auto text-[0.8em] w-full">
                    <a href="#">Terms and Conditions</a>
                    <a href="#">Cancellation Policy</a>
                </div>
            </div>
        </div>
    )
}

export default FormRight;
