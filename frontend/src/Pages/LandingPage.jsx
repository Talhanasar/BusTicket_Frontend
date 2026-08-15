import React, { useEffect, useState } from 'react';
import LandingForm from './components/LandingForm';
import DiscountCoupon from './components/DiscountCoupon';

const LandingPage = () => {
    return (
        <div className='bg-[#FFFFFF] w-full box-border'>
            <div className='relative flex flex-col items-center box-border w-full px-4 py-[1.75em] lg:px-0'>
                <div className="rounded-[1rem] md:rounded-[2rem] relative mx-auto flex flex-col items-center py-[2rem] md:py-[3.5rem] w-[95vw] md:w-[75vw] h-[45vw] md:h-[35.2vw] box-border bg-contain" style={{ backgroundImage: "linear-gradient(180deg, #03071299 0%, #03071200 100%), url('/images/banner.png')" }}>
                    <div className="mb-[2rem] flex flex-col items-center w-full md:w-[80%] lg:max-w-[60%] text-center box-border md:px-6 lg:px-0">
                        <p className="flex flex-col sm:mb-[1.1rem] break-words font-['Raleway'] font-[700] text-[1.2rem] md:text-[2rem] lg:text-[3rem] leading-[1.344]">
                            <span className="text-[#FFFFFF]">End-to-End Travel with</span>
                            <span className='text-[#1DD100]'>Talha Paribahan</span>
                        </p>
                        <span className="mx-[2.3rem] break-words font-['Inter'] font-normal text-[0.4rem] md:text-[0.6rem] lg:text-[0.8rem] leading-[1.667] text-[#FFFFFF]">
                            Your daily commute made simple. Book buses across Bangladesh with ease.
                        </span>
                    </div>
                    <div className='absolute bottom-0 left-1/2 flex justify-center items-center -translate-x-1/2 translate-y-[90%] sm:translate-y-3/4 lg:translate-y-1/2 w-full' >
                        <LandingForm />
                    </div>
                </div>
                <div id="offers" className='mt-[21rem] lg:mt-[16rem] flex flex-col items-center'>
                    <h1 className='font-["Raleway"] font-bold text-center text-[1.2rem] md:text-[2.5rem]' >Best offers for you</h1>
                    <div className="coupon flex justify-center items-center gap-[0.8rem] md:gap-6 mt-7 mb-14">
                        <DiscountCoupon RH={"15% OFF"} RP1={"on your next purchase"} RP2={"Valid through October 31, 2026"} LH={"NEW15"} LP={"Coupon Code"} color={"FFBF0F"} />

                        <DiscountCoupon RH={"20% OFF"} RP1={"on your next purchase"} RP2={"Valid through October 31, 2026"} LH={"Couple20"} LP={"Coupon Code"} color={"F78C9C"} />
                    </div>
                    <button 
                        onClick={() => document.getElementById("offers")?.scrollIntoView({ behavior: "smooth" })}
                        className='font-["Raleway"] font-bold text-[#1dd100] border border-[#1dd100] rounded-md text-[0.7rem] md:text-[1.1rem] p-[0.3rem_0.8rem]  md:p-[0.5rem_1.5rem] cursor-pointer'
                    >
                        See All offers
                    </button>
                </div>
            </div>
        </div>

    );
}

export default LandingPage;
