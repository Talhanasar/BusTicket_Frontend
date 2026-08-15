export const busPage = async ({params})=>{
   try{
      const res = await fetch(`${import.meta.env.VITE_FETCH_URL}availablebus/${params.detail}`);
      if(!res.ok) throw new Error(`Failed to load buses (${res.status})`);
      const data = await res.json();
      return data;
   }catch(err){
      console.log(err.message);
      throw new Error("Unable to load available buses. Please try again.");
   }

}
export const bookingPage = async ({params})=>{
   try{
      const res = await fetch(`${import.meta.env.VITE_FETCH_URL}availablebus/${params.id}`);
      if(!res.ok) throw new Error(`Failed to load booking (${res.status})`);
      const data = await res.json();
      const response = await fetch(`${import.meta.env.VITE_FETCH_URL}coupon/`);
      if(!response.ok) throw new Error(`Failed to load coupons (${response.status})`);
      const coupons = await response.json();
      return {data,coupons};
   }catch(err){
      console.log(err.message);
      throw new Error("Unable to load booking details. Please try again.");
   }

}