export const busPage = async ({params})=>{
   try{
      const res = await fetch(`${import.meta.env.VITE_FETCH_URL}availablebus/${params.detail}`);
      const data = await res.json();
      return data;
   }catch(err){
      console.log(err.message)
   }

}
export const bookingPage = async ({params})=>{
   try{
      const res = await fetch(`${import.meta.env.VITE_FETCH_URL}availablebus/${params.id}`);
      const data = await res.json();
      const response = await fetch(`${import.meta.env.VITE_FETCH_URL}coupon/`);
      const coupons = await response.json();
      return {data,coupons};
   }catch(err){
      console.log(err.message)
   }

}