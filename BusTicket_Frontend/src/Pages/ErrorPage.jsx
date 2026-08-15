import { useNavigate, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);
  const handleHome = () => navigate("/");

  if (error?.status === 404) {
    return (
      <section className="flex flex-col justify-center items-center py-12 px-4">
        <div id="error-text" className="text-center">
          <figure>
            <img
              className="h-[25rem] object-contain"
              src="https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif"
              alt="404 page"
            />
          </figure>
          <div className="font-['Raleway']">
            <p>The page you were looking for could not be found.</p>
          </div>
        </div>
        <div className="flex gap-3 mt-2">
          <button
            className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-white hover:text-blue-500 hover:shadow-[inset_0_0_0_0.13rem_rgba(37,99,235,1)] transition-all duration-100"
            onClick={handleGoBack}
          >
            Go Back
          </button>
          <button
            className="py-2 px-6 bg-[#1DD100] text-white rounded-md hover:bg-white hover:text-[#1DD100] hover:shadow-[inset_0_0_0_0.13rem_rgba(29,209,0,1)] transition-all duration-100"
            onClick={handleHome}
          >
            Home
          </button>
        </div>
      </section>
    );
  }

  // Non-404: render a useful, non-leaky message and a Home action.
  // Do not expose error.message / stack to the user.
  console.error("Route error:", error);

  return (
    <section className="flex flex-col justify-center items-center py-16 px-4 text-center">
      <div className="font-['Raleway'] max-w-md">
        <h1 className="text-2xl font-bold text-[#030712] mb-2">
          Something went wrong
        </h1>
        <p className="text-[#030712]/70 mb-6">
          We couldn&rsquo;t load this page. Please check your connection or try
          again in a moment.
        </p>
        <button
          className="py-2 px-6 bg-[#1DD100] text-white rounded-md hover:bg-white hover:text-[#1DD100] hover:shadow-[inset_0_0_0_0.13rem_rgba(29,209,0,1)] transition-all duration-100"
          onClick={handleHome}
        >
          Go to Home
        </button>
      </div>
    </section>
  );
};