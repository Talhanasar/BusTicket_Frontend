import Footer from "./components/Footer";
import Header from "./components/Header";
import "../index.css";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import LoaderComponent from "./components/LoaderComponent";

export const AppLayout = () => {
    const navigation = useNavigation();
    const location = useLocation();

    if(navigation.state === 'loading'){
        return (
            <LoaderComponent/>
        )
    }

    return (
        <>
            {location.pathname !== "/booking-success" &&<Header />}
            <Outlet/>
            {location.pathname !== "/booking-success" &&<Footer />}
        </>
    );
}