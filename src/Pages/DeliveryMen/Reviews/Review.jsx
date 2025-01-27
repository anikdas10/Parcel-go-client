import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import UseAxiosSecure from "@/Hooks/UseAxiosSecure";
import UseUser from "@/Hooks/UseUser";
import { useQuery } from "@tanstack/react-query";


const Review = () => {
  const axiosSecure = UseAxiosSecure();
    const [userData] = UseUser();
    
    const {data:reviews,isLoading} = useQuery({
      queryKey:[userData?._id],
     queryFn:async()=>{
      const {data} = await axiosSecure.get(`/review/${userData?._id}`)
      return data;
     }
    })
    if(isLoading)
    {
      return <LoadingSpinner/>
    }
    return (
      <div className="pt-10">
        <h2 className="font-bold text-xl md:text-2xl lg:text-3xl text-center">
          My Review
        </h2>

        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {/* card start */}
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={review.reviewerImage}
                    alt=""
                    className="w-14 h-14 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{review.reviewer}</h3>
                    <p className="text-sm text-gray-500">
                      {review?.reviewDate}
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="font-semibold">Rating:</span> {review.rating}
                  /5
                </div>
                <p className="text-gray-700">{review.review}</p>
              </div>
            ))}
            {/* card end */}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    );
};

export default Review;