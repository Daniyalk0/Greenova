"use client"
import React, { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode, Pagination } from 'swiper/modules'
import Marquee from "react-fast-marquee";
import { RoughNotation } from 'react-rough-notation';
import AddReview from './AddReview'
import { useSession } from 'next-auth/react'
import Heading from '../ui/Heading'

const Reviews = () => {

  const [hover, setHover] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);;
  const [isUserHasReview, setIsUserHasReview] = useState(false)

  console.log("Review parent rendered ✅");
  const { data: session } = useSession()

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch(console.error);
  }, [isUserHasReview]);

  // 2️⃣ Check if current user already submitted a review
  useEffect(() => {
    if (!session || reviews.length === 0) return;

    const hasReview = reviews.some(
      (review) => review.userId === session.user.id
    );

    setIsUserHasReview(hasReview);
  }, [session, reviews]);




  return (
    <section className="py-10  w-full md:w-[90%] mx-auto px-8">
      <div className='flex items-center justify-center w-full gap-2 sm:gap-5'>
{/* 
        <h1 className="text-2xl sm:text-3xl text-center mb-10 lg:mb-14 font-monasans_semibold">    <RoughNotation
          type="highlight"
          show={true}
          color="#a3ff61" // light yellow
          animationDuration={1200}
          strokeWidth={0.6}
        >
          Reviews
        </RoughNotation> </h1> */}

        <Heading text='Reviews'/>
      </div>

      <div className='flex items-center justify-center w-full flex-col sm:flex-row gap-3 md:gap-6 lg:gap-14'>
        <div className='flex items-center justify-center flex-col w-full md:w-[55%] lg:w-[50%] '>

          <div className='flex flex-col items-start justify-start gap-2 sm:gap-4'>



            <h2 className='font-monasans_semibold text-[0.4rem] sm:text-[0.7rem] tracking-wider uppercase lg:text-[0.6rem]'>Your Words Matters ⸺</h2>
            <h1 className='font-playfair text-2xl sm:text-5xl'>What People Say About Us</h1>
            <p className='font-dmsans_light text-[0.9rem] sm:text-[1.1rem] md:text-[1rem] leading-tight sm:leding-4 md:leading-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem deleniti architecto saepe qui maxime perspiciatis omnis, asperiores voluptate, similique ipsa alias deserunt harum quaerat.</p>
          </div>
          {reviews.length > 0 ? (
            <Marquee speed={100} pauseOnHover autoFill gradientWidth={80} gradient>
              <div className="gap-8 pr-8 hidden md:flex">
                {reviews.map((review, i) => (
                  <ReviewCard
                    key={i}
                    userName={review.userName}
                    message={review.comment}
                    rating={review.rating}
                    userImage={review?.userImage}
                    date={review?.createdAt}
                  />
                ))}
              </div>
            </Marquee>
          ) : (
            <div className="hidden md:flex flex-col items-center justify-center py-10 text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-inner">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center animate-pulse">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 8h10M7 12h8m-8 4h6M12 3C7.03 3 3 7.03 3 12c0 4.97 4.03 9 9 9 2.2 0 4.21-.8 5.76-2.13L21 21l-2.13-2.24A8.962 8.962 0 0021 12c0-4.97-4.03-9-9-9z"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-700 mb-2 font-dmsans_semibold">
                No Reviews Yet
              </h3>
              <p className="text-gray-500 max-w-sm font-dmsans_light">
                Be the first to share your experience! Your feedback helps others know what to expect.
              </p>
            </div>
          )}
          {reviews.length > 0 ? (
            <Marquee speed={70} pauseOnHover autoFill gradientWidth={50} gradient>
              <div className=" gap-8 pr-8 flex md:hidden"> {/* 👈 add this padding */}
                {reviews.map((review, i) => (
                  <ReviewCard
                    key={i}
                    // name={review.name}
                    userName={review.userName}
                    message={review.comment}
                    rating={review.rating}
                    userImage={review?.userImage}
                    date={review?.createdAt}
                  />
                ))}
              </div>
            </Marquee>
          ) : (<div className=" md:hidden flex flex-col items-center justify-center py-10 text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-inner">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center animate-pulse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 8h10M7 12h8m-8 4h6M12 3C7.03 3 3 7.03 3 12c0 4.97 4.03 9 9 9 2.2 0 4.21-.8 5.76-2.13L21 21l-2.13-2.24A8.962 8.962 0 0021 12c0-4.97-4.03-9-9-9z"
                  />
                </svg>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-700 mb-2 font-dmsans_semibold">
              No Reviews Yet
            </h3>
            <p className="text-gray-500 max-w-sm font-dmsans_light leading-5 text-sm">
              Be the first to share your experience! Your feedback helps others know what to expect.
            </p>
          </div>)}

        </div>
        <AddReview isUserHasReview={isUserHasReview} setIsUserHasReview={setIsUserHasReview} />



      </div>
    </section>

  )
}

export default Reviews