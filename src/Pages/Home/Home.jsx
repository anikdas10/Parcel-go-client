import Banner from "./HomeElement/Banner";
import Features from "./HomeElement/Features";
import Statistics from "./HomeElement/Statistics";


const Home = () => {
    return (
        <div className="pt-20">
            <Banner/>
            <Features/>
            <Statistics/>
        </div>
    );
};

export default Home;