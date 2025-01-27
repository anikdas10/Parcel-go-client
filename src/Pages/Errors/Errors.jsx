import { Link } from "react-router-dom";


const Errors = () => {
    return (
      <div>
        <section className="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div className="max-w-md text-center">
              <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
                <span className="sr-only">Error</span>404
              </h2>
              <p className="text-2xl font-semibold md:text-3xl mb-4 md:mb-8">
                Sorry, we couldn't find this page.
              </p>
              <Link
                to="/"
                className=" px-6 py-3 text-sm font-medium md:text-lg lg:text-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white  rounded-md"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
};

export default Errors;