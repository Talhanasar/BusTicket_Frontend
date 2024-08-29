import React, { useEffect, useState } from 'react';
import LandingForm from './components/LandingForm';
import DiscountCoupon from './components/DiscountCoupon';

const LandingPage = () => {

    return (
        <div className='bg-[#FFFFFF] w-full box-border'>
            <div className='relative flex flex-col items-center box-border w-full px-4 py-[1.75em] lg:px-0'>
                <div className="rounded-[2rem] relative mx-auto flex flex-col items-center p-[3.4rem_0_7rem_0] w-[75vw] h-[calc(75vw*0.469)] box-border bg-contain" style={{ backgroundImage: "linear-gradient(180deg, #03071299 0%, #03071200 100%), url('/images/banner.png')" }}>
                    <div className="mb-[2rem] flex flex-col items-center w-[55%] text-center box-border px-6 lg:px-0">
                        <p className="flex flex-col mb-[1.1rem] break-words font-['Raleway'] font-[700] text-[1.2rem] md:text-[2rem] lg:text-[3rem] leading-[1.344]">
                            <span className="text-[#FFFFFF]">End-to-End Travel with</span>
                            <span className='text-[#1DD100]'>Talha Paribahan</span>
                        </p>
                        <span className="mx-[2.3rem] break-words font-['Inter'] font-normal text-[0.6rem] lg:text-[0.8rem] leading-[1.667] text-[#FFFFFF]">
                            Yes, you can run unit tests and view the results directly within the app. The integrated testing features allow for a streamlined experience.
                        </span>
                    </div>
                    <div className='absolute bottom-0 left-1/2 -translate-x-1/2  translate-y-1/2' >
                        <LandingForm />
                    </div>
                </div>
                <div className='mt-[16rem] flex flex-col items-center' >
                    <h1 className='font-["Raleway"] font-bold text-center text-[2.5rem]' >Best offers for you</h1>
                    <div className="coupon flex justify-center items-center gap-6 mt-7 mb-14">
                        <DiscountCoupon RH={"15% OFF"} RP1={"on your next purchase"} RP2={"use by January 2024"} LH={"NEW15"} LP={"Coupon Code"} color={"FFBF0F"} />

                        <DiscountCoupon RH={"20% OFF"} RP1={"on your next purchase"} RP2={"use by January 2024"} LH={"Couple 20"} LP={"Coupon Code"} color={"F78C9C"} />
                    </div>
                    <button className='font-["Raleway"] font-bold text-[#1dd100] border border-[#1dd100] rounded-md text-[17px] py-2 px-6' >
                        See All offers
                    </button>
                </div>
            </div>
        </div>

    );
}

export default LandingPage;
