
import image from "../../../assets/images/banner.webp"

const Banner = () => {
    return (
      <div
        className="w-full  bg-center bg-cover h-[17rem] md:h-[22rem] lg:h-[28rem]  rounded-md"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-gray-900/60 p-4">
          <div className="text-center">
            <h1 className="text-xl md:text-3xl font-semibold text-white lg:text-4xl">
              Your Delivery, Our Priority
            </h1>
            <br />
            <div className="flex items-center justify-center">
              <input
                type="text"
                className="px-5 py-2 md:py-4 text-black capitalize transition-colors duration-300 transform bg-gray-200 rounded-md rounded-r-none lg:w-auto hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                placeholder="Search "
              />
             <button className="py-2 md:py-4 bg-gray-600 px-4 md:px-5 text-white rounded-md rounded-l-none font-bold">Search</button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Banner;