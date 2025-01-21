import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import UseAllUser from "@/Hooks/UseAllUser";
import NumberOfParcels from "../AllUser/NumberOfParcels";


const AllDeliveryMen = () => {
    const [users,isLoading,refetch] = UseAllUser("DeliveryMen");
     if (isLoading) {
       return <LoadingSpinner />;
     }
    return (
      <div className="pt-10">
        <h2 className="font-bold text-lg md:text-xl lg:text-2xl">
          All DeliveryMen
        </h2>
        <div className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-800 dark:bg-gray-50 overflow-hidden ">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs md:text-sm">
              <thead className=" dark:bg-gray-300 bg-orange-400">
                <tr className="text-center  py-4 ">
                  <th className="px-3 py-4  rounded-tl-lg">
                    Delivery Man's Name
                  </th>
                  <th className="p-3">Phone Number</th>

                  <th className="p-3">Number of parcels delivered</th>

                  <th className="p-3 rounded-tr-lg">Average Review</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className="text-center border-b  border-opacity-20 dark:border-gray-300 dark:bg-gray-100 md:text-sm xl:text-lg"
                  >
                    <td className="px-2 py-6 text-center">
                      <span>{user.name}</span>
                    </td>
                    <td className="p-2 text-center">
                      <span></span>
                    </td>
                    <td className="p-2">
                      <span>
                        <NumberOfParcels email={user?.email} />
                      </span>
                    </td>
                    <td className="p-2">
                      <span>{user?.deliveryDate}</span>
                    </td>
                    <td className="p-2 text-center">
                      {/* <button
                        onClick={() => makeDeliveryMen(user)}
                        className="px-2 py-1 bg-green-500 rounded-md text-white"
                      >
                        Make DeliveryMen
                      </button> */}
                    </td>
                    <td className="py-2">
                      {/* <button
                        onClick={makeAdmin}
                        className="px-2 py-1 bg-green-500 rounded-md text-white"
                      >
                        Make Admin
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default AllDeliveryMen;