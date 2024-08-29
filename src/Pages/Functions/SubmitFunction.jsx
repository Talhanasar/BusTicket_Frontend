import { toast } from "react-toastify";

export const submitForm = async (data) => {
    try {
        if(!data.email){
            delete data.email;
        }
        console.log(data);
        const res = await fetch(`${import.meta.env.VITE_FETCH_URL}bookedTicket/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Send the whole array in one request
          });
          const get = await res.json();
          console.log(get);
          if(res.ok){
            return true;
          }else{
            toast.error(get.extraDetails[0]);
            return false;
          }
    } catch (error) {
        console.log(error.message);
    }
} 