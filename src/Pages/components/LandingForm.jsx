import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateSearchInput } from '../Functions/handleSearchInput';

const cities = ['Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi', 'Barisal', 'Rangpur', 'Mymensingh', 'Pahartali', 'Mirsharai', 'Cox\'s Bazar', 'Comilla', 'Narayanganj', 'Gazipur', 'Jessore', 'Bogra', 'Dinajpur', 'Noakhali'];

const LandingForm = () => {
    const [placeAndDate, setPlaceAndDate] = useState({
        from: "",
        to: "",
        date: ""
    });
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestionsFor, setShowSuggestionsFor] = useState(""); // New state to track which input field is focused

    const ChangeEffect =(e)=>{
        const { name, value } = e.target;
        setPlaceAndDate({ ...placeAndDate, [name]: value });

        if (value) {
            const filteredCities = cities.filter((city) =>{
                if(name === "from"){
                    return city.toLowerCase().startsWith(value.toLowerCase()) && city.toLowerCase() !== placeAndDate.to.toLowerCase();
                }
                return city.toLowerCase().startsWith(value.toLowerCase()) && city.toLowerCase() !== placeAndDate.from.toLowerCase();
            }
            );
            setSuggestions(filteredCities);
            setShowSuggestionsFor(name); // Show suggestions for the current input field
        } else {
            setShowSuggestionsFor(""); // Hide suggestions when input is cleared
        }
    }
    const handleInputChange = (e) => {
       ChangeEffect(e);
    };
    const handleInputFocus=(e)=>{
        ChangeEffect(e);
    }

    const handleSuggestionClick = (suggestion, fieldName) => {
        setPlaceAndDate({ ...placeAndDate, [fieldName]: suggestion });
        setShowSuggestionsFor(""); // Hide suggestions after selection
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const value = `way=${placeAndDate.from}-${placeAndDate.to}%20date=${placeAndDate.date}`;
        validateSearchInput(placeAndDate.date.split("-")) && navigate(`/bus/${value}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[0.7rem] md:gap-4 p-6 rounded-lg shadow-lg bg-white bg-opacity-90 w-[95%] sm:w-[80%] md:max-w-lg">
        <h2 className="text-[1rem] md:text-[1.25rem] font-bold text-[#1DD100]">Book Your Bus</h2>
    
        <div className='flex flex-col md:flex-row gap-3 w-full text-[0.9rem]'>
            <div className="w-full relative">
                <label className="block mb-[0.2rem] md:mb-[0.5rem] font-medium text-[#1DD100CC]">From</label>
                <input
                    autoComplete='off'
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    name='from'
                    value={placeAndDate.from}
                    type="text"
                    className="w-full p-[0.4rem] md:p-3 border rounded-md text-[#030712] focus:outline-none focus:ring-1 focus:ring-[#1dd1004d] focus:shadow-[0_0_10px_4px_rgba(29,209,0,0.6)] border-[#1DD10080]"
                    placeholder="Enter departure city"
                />
                {showSuggestionsFor === 'from' && suggestions.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-[#1DD10080] rounded-md shadow-lg mt-2 max-h-[10rem] overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="p-2 cursor-pointer hover:bg-[#1DD10033]"
                                onClick={() => handleSuggestionClick(suggestion, 'from')}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
    
            <div className="w-full relative">
                <label className="block mb-[0.2rem] md:mb-[0.5rem] font-medium text-[#1DD100CC]">To</label>
                <input
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    autoComplete='off'
                    name='to'
                    value={placeAndDate.to}
                    type="text"
                    className="w-full p-[0.4rem] md:p-3 border rounded-md text-[#030712] focus:outline-none focus:ring-1 focus:ring-[#1dd1004d] focus:shadow-[0_0_10px_4px_rgba(29,209,0,0.6)] border-[#1DD10080]"
                    placeholder="Enter destination city"
                />
                {showSuggestionsFor === 'to' && suggestions.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-[#1DD10080] rounded-md shadow-lg mt-2 max-h-[10rem] overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="p-2 cursor-pointer hover:bg-[#1DD10033]"
                                onClick={() => handleSuggestionClick(suggestion, 'to')}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    
        <div className="w-full">
            <label className="block  mb-[0.2rem] md:mb-[0.5rem] text-[0.9rem] font-medium text-[#1DD100CC]">Date</label>
            <input
                onChange={handleInputChange}
                name='date'
                value={placeAndDate.date}
                type="date"
                className="custom-date-input w-full p-[0.4rem] md:p-3 border rounded-md text-[#030712] focus:outline-none focus:ring-1 focus:ring-[#1dd1004d] focus:shadow-[0_0_10px_4px_rgba(29,209,0,0.6)] border-[#1DD10080]"
            />
        </div>
    
        <button type="submit" className="w-full py-[0.4rem] md:p-3 text-[0.9rem] mt-[0.8rem] md:mt-4 text-white bg-[#1DD100] rounded-md hover:bg-[#1DD100CC] transition-all">
            Search Buses
        </button>
    </form>
    
    );
}

export default LandingForm;
