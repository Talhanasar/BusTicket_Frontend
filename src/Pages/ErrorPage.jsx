import { useNavigate, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  if (error.status === 404) {
    return (
      <section className=" flex flex-col justify-center items-center">
        <div id="error-text">
          <figure>
            <img
              className="h-[25rem] object-contain"
              src="https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif"
              alt="404 page"
            />
          </figure>
          <div className="text-center font-['Raleway']">
            <p>
              The page you were looking for could not be found
            </p>
            <p>... Back to previous page</p>
          </div>
        </div>
        <button className="py-2 px-6 bg-blue-500 text-white mt-2 rounded-md hover:bg-white hover:text-blue-500 hover:shadow-[inset_0_0_0_0.13rem_rgba(37,99,235,1)] transition-all duration-100" onClick={handleGoBack}>
          Go Back
        </button>
      </section>
    );
  }
  console.log(error);

  return <h1> The page you are looking does not exist </h1>;
};