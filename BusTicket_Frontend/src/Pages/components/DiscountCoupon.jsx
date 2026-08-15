const DiscountCoupon = (props) => {
    return (
        <>
            <div style={{ backgroundColor: `#${props.color}` }} className={` w-[47vw] h-[18.05vw] md:w-[35vw] md:h-[calc(35vw*0.384)] flex justify-between items-center rounded-[0.8rem] md:rounded-[1.5em] px-[0.8rem] md:px-[1.5em]`}>
                <div className='font-["Inter"]' >
                    <h2 className=" text-[#030712]/80 text-[0.9rem] md:text-[1.8em] font-black" >{props.RH}</h2>
                    <p className=" text-[#030712]/80 font-semibold text-[0.4rem] md:text-[0.8em]">{props.RP1}</p>
                    <p className='text-[#030712]/50 font-medium text-[0.3rem] md:text-[0.63em]' >{props.RP2}</p>
                </div>
                <div className='font-["Raleway"] flex items-center h-full gap-[0.7rem] md:gap-[1.25em]' >
                    <img className='object-contain h-full' src="/images/cupon-devider.png" alt="" />
                    <div>
                        <h2 className='font-bold text-[0.8rem] md:text-[1.7em]' >
                            {props.LH}
                        </h2>
                        <p className='text-[#030712]/40 font-medium text-[0.5rem] md:text-[1em]' >{props.LP}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DiscountCoupon
