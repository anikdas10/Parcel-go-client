import Banner from "./HomeElement/Banner";
import Features from "./HomeElement/Features";
import Statistics from "./HomeElement/Statistics";
import TopDeliveryMan from "./HomeElement/TopDeliveryMan";


const Home = () => {
    return (
        <div className="pt-20">
            <Banner/>
            <Features/>
            <Statistics/>
            <TopDeliveryMan/>
        </div>
    );
};

export default Home;