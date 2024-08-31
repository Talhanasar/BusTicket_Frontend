import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AvailableBus } from "./Pages/AvailableBus"
import LandingPage from "./Pages/LandingPage"
import { AppLayout } from "./Pages/AppLayout"
import { bookingPage, busPage } from "./Pages/Functions/LoaderFunctions"
import { ErrorPage } from "./Pages/ErrorPage"
import { Booking } from "./Pages/Booking"
import SuccessPage from "./Pages/SuccessPage"

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<AppLayout/>,
      errorElement:<ErrorPage/>,
      children:([
        {
          path:"/",
          element:<LandingPage/>
        },
        {
          path:"/bus/:detail",
          element:<AvailableBus/>,
          loader: busPage
        },
        {
          path:"/bus/booking/:id",
          element:<Booking/>,
          loader: bookingPage
        },
        {
          path:"/booking-success",
          element:<SuccessPage/>,
        },

      ])
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
