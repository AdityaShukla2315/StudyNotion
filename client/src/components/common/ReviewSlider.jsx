import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper"

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 18

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (data?.success) {
          setReviews(data?.data)
        }
      } catch (err) {
        setReviews([])
      }
    })()
  }, [])

  if (!reviews.length) {
    return (
      <div className="my-12 flex flex-col items-center justify-center min-h-[120px] text-richblack-400 bg-richblack-800 rounded-xl shadow">
        <span className="text-lg font-semibold">No reviews from learners yet.</span>
      </div>
    )
  }

  return (
    <div className="text-white">
      <div className="my-[50px] min-h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col gap-3 bg-richblack-800 p-4 rounded-xl text-[15px] text-richblack-25 min-h-[180px] shadow hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={
                      review?.user?.image
                        ? review?.user?.image
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            (review?.user?.firstName || "U") +
                            " " +
                            (review?.user?.lastName || "L")
                          )}&background=random`
                    }
                    alt="review-user"
                    className="h-10 w-10 rounded-full object-cover border-2 border-yellow-100 shadow"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-richblack-5 truncate max-w-[120px]">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                    <h2 className="text-[12px] font-medium text-richblack-500 truncate max-w-[120px]">
                      {review?.course?.courseName}
                    </h2>
                  </div>
                </div>
                <p className="font-medium text-richblack-25 mb-2">
                  {review?.review.split(" ").length > truncateWords
                    ? `${review?.review
                        .split(" ")
                        .slice(0, truncateWords)
                        .join(" ")} ...`
                    : `${review?.review}`}
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <h3 className="font-semibold text-yellow-100">
                    {review.rating.toFixed(1)}
                  </h3>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider