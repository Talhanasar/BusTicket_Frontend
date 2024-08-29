const DiscountCoupon = (props) => {
    return (
        <>
            <div style={{ backgroundColor: `#${props.color}` }} className={`w-[35vw] h-[calc(35vw*0.384)] flex justify-between items-center rounded-[1.5em] px-[1.5em]`}>
                <div className='font-["Inter"]' >
                    <h2 className=" text-[#030712]/80 text-[1.8em] font-black" >{props.RH}</h2>
                    <p className=" text-[#030712]/80 font-semibold text-[0.8em]">{props.RP1}</p>
                    <p className='text-[#030712]/50 font-medium text-[0.63em]' >{props.RP2}</p>
                </div>
                <div className='font-["Raleway"] flex items-center h-full gap-[1.25em]' >
                    <img className='object-contain h-full' src="/images/cupon-devider.png" alt="" />
                    <div>
                        <h2 className='font-bold text-[1.7em]' >
                            {props.LH}
                        </h2>
                        <p className='text-[#030712]/40 font-medium text-[1em]' >{props.LP}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DiscountCoupon
