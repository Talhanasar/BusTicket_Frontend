import { toast } from "react-toastify";

export const validateSearchInput = (inputDate) => {
    const date = new Date().toISOString().split("T")[0].split("-");
    if(inputDate.includes(date[0])){
        if(inputDate[1] === date[1] && inputDate[2] >= date[2]){
            return true;
        }else if(inputDate[1] > date[1]){
            return true;
        }
    }
    toast.error("Invalid Date input!");
    return false;
}