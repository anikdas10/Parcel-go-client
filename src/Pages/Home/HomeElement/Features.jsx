import { FaMapMarkerAlt, FaShieldAlt, FaShippingFast } from "react-icons/fa";

const Features = () => {
    const featuresContent = [
      {
        icon: <FaShieldAlt className="text-2xl md:text-4xl text-blue-500" />,
        title: "Unmatched Parcel Safety",
        description:
          "Your packages are handled with the utmost care, ensuring they reach their destination in perfect condition.",
      },
      {
        icon: <FaShippingFast className="text-2xl md:text-4xl text-green-500" />,
        title: "Lightning-Fast Delivery",
        description:
          "With our optimized routes, we ensure your parcels are delivered in record time.",
      },
      {
        icon: <FaMapMarkerAlt className="text-2xl md:text-4xl text-red-500" />,
        title: "Live Tracking Updates",
        description:
          "Stay informed at every step with real-time updates and tracking for your shipments.",
      },
    ];
    return (
      <div className="pt-16">
        <h2 className="text-center font-bold text-xl md:text-2xl lg:text-3xl">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pt-8">
          {featuresContent.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg text-center flex flex-col items-center border"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Features;