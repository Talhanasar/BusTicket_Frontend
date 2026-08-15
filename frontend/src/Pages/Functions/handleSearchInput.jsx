import { toast } from "react-toastify";

/**
 * Validate that the search input date is today or in the future.
 * Accepts an array [YYYY, MM, DD].
 */
export const validateSearchInput = (inputDate) => {
    const date = new Date().toISOString().split("T")[0].split("-");
    const inputYear = parseInt(inputDate[0], 10);
    const inputMonth = parseInt(inputDate[1], 10);
    const inputDay = parseInt(inputDate[2], 10);
    const todayYear = parseInt(date[0], 10);
    const todayMonth = parseInt(date[1], 10);
    const todayDay = parseInt(date[2], 10);

    if (isNaN(inputYear) || isNaN(inputMonth) || isNaN(inputDay)) {
        toast.error("Invalid Date input!");
        return false;
    }

    if (inputYear < todayYear) {
        toast.error("Date cannot be in the past!");
        return false;
    }
    if (inputYear === todayYear) {
        if (inputMonth < todayMonth) {
            toast.error("Date cannot be in the past!");
            return false;
        }
        if (inputMonth === todayMonth && inputDay < todayDay) {
            toast.error("Date cannot be in the past!");
            return false;
        }
    }

    return true;
}