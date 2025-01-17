import { RotatingLines } from "react-loader-spinner";


const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center h-screen">
        <RotatingLines
          visible={true}
          height="92"
          width="92"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
};

export default LoadingSpinner;