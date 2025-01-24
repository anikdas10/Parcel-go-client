
import ReactConfetti from "react-confetti";
import image from "../../assets/images/7518748.png"

const Success = () => {
    
    return (
      <div className="relative min-h-screen  border text-center">
        <div className="flex items-center justify-center flex-col gap-6 h-screen">
            <img src={image} className="w-32 md:w-40 lg:w-52 xl:w-60" alt="" />
          <h2 className="text-lg md:text-xl lg:text-2xl xl:text-4xl font-bold">Payment Successful!</h2>
        </div>
        <ReactConfetti
          className=" absolute top-0 left-0 right-0 z-50 border w-full h-full"
          gravity={0.1}
          
          initialVelocityX={2}
          initialVelocityY={2}
          numberOfPieces={400}
          opacity={4}
          recycle
          run
          
          wind={0}
        />
      </div>
    );
};

export default Success;