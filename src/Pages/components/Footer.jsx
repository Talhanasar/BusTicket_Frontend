import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full h-[35vh] bg-[#030712] flex flex-col justify-center items-center' >
        <section className="upper flex justify-between items-center w-[80%] h-[70%]">
          <div className='flex-col h-full justify-center flex gap-2'>
            <h1 className='text-[#FFFFFF] font-["Raleway"] font-extrabold text-[32px]'>P-Ticket</h1>
            <p className='text-[#FFFFFF]/80 font-["Inter"] text-[15px]'>P-Ticket is a digital platform to make your daily commuting better.</p>
          </div>
          <div className='flex flex-col justify-center'>
            <h3 className='text-[#FFFFFF] font-["Raleway"] font-semibold text-[15px]'>Download our app</h3>
            <div className='flex items-center justify-center border border-[#FFFFFF] rounded '>
              <img className='object-contain h-[30px]'  src="/images/playstore.png" alt="" />
              <div className='text-[#FFFFFF]'>
                <p className='text-[8px] tracking-tighter font-["Inter"]'>GET IT ON</p>
                <h3 className='text-sm font-semibold font-["Inter"]'>Google Play</h3>
              </div>
            </div>
          </div>
        </section>
        <div className="devider w-5/6 border-dashed border border-[#FFFFFF]/30"></div>
        <section className="lower flex items-start py-4 justify-between w-[83%] h-[40%]">
          <p className="text-[#FFFFFF]/70 font-['Inter'] text-[12px]">@all right reserved, P-Ticket services limited.2024</p>
          <ul className='flex justify-between items-center text-[#FFFFFF] gap-6 font-["Inter"] font-medium text-[12px] tracking-wide'>
            <li>Terms & condition</li>
            <li>Return & refund policy</li>
            <li>Privacy policy</li>
          </ul>
        </section>
      
    </footer>
  )
}

export default Footer
