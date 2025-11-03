"use client"
import { SendHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function Addcomment({
  isUserHasReview,
  setIsUserHasReview,
}: {
  isUserHasReview: boolean;
  setIsUserHasReview: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    setMessage('');
    if (!session) {
      // setMessage("Please sign in to submit a review.");
      setLoading(false)
      alert("Please sign in to submit a review.");
      setComment('')

      return;
    }
    if (isUserHasReview) {
      // setMessage("You Already have submitted your review!");
      setLoading(false)
      alert("You Already have submitted your review!");
      setComment('')
      setRating(0)
      return;
    }


    const res = await fetch('api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, comment })
    })

    const data = await res.json()

    if (!res.ok) { setMessage(data.error || 'something went wrong'); setLoading(true) }
    else {
      setMessage('Thanks for your comment!');
      setRating(0);
      setComment('');
      setLoading(false)
      setIsUserHasReview(true)
    }

    const trimmed = comment.trim();

    // Minimum length
    if (trimmed.length < 10) {
      setLoading(false)
      alert("Please write at least 10 meaningful characters.");

      return;
    }

    // Contains at least one real word (not just symbols)
    if (!/[a-zA-Z]/.test(trimmed)) {
      setLoading(false)
      alert("Your review must include actual words.");
      return;
    }

    // Rating validation (1 to 5)
    if (rating < 1 || rating > 5) {
      setLoading(false)
      alert("Please provide a rating between 1 and 5.");
      return;
    }

    setLoading(false)
    setShowModal(false);
  };

  const isValid =
    rating >= 1 &&
    rating <= 5 &&
    comment.trim().length >= 10 &&
    /[a-zA-Z]/.test(comment.trim());

  // const modalRef = useRef(null);
  const modalRef = useRef<HTMLDivElement | null>(null);


  // Close when clicking outside the modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowModal]);


  return (
    <div className="relative w-full lg:w-[40%] " >
      {/* 🔘 Add comment button (visible only on mobile) */}
      <button
        onClick={() => setShowModal(true)}
        className="md:hidden bg-yellow-300  text-gray-800  py-2 font-dmsans_light px-2  rounded-md transition flex items-center justify-center  absolute -right-3 -top-4 gap-3 text-xs"
      >
        Add a Review

      </button>

      {/* 🧩 Normal form for screens ≥640px */}
      <form
        onSubmit={handleSubmit}
        className="hidden md:block md:w-[100%] mx-auto  p-6 rounded-2xl shadow-md space-y-4 bg-[#ffffff] sm:bg-[#f5f5f5] border-gray-300 border-l-2 border-r-2 "
      // style={{
      //   backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png')`,
      //   // backgroundColor: '#E6E6E6',
      //   backgroundBlendMode: 'multiply',
      // }}
      >
        <h2 className="text-lg font-monasans_semibold text-gray-800">
          Add a Review
        </h2>


        {/* Stars */}
        <div className="flex space-x-1">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <button
                type="button"
                key={starValue}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
              >
                <span
                  className={`text-2xl sm:text-3xl ${starValue <= (hover || rating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                    }`}
                >
                  ★
                </span>
              </button>
            );
          })}
        </div>

        {/* Textarea */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none  font-monasans_semibold text-xs"
          rows={5}
          required={!!session && !isUserHasReview}
        />

        {/* Submit Button */}
        <button
          type="submit"

          className={`w-full flex items-center justify-center gap-2 text-white font-dmsans_light py-2 rounded-md transition 
    ${isValid
              ? "bg-yellow-600 hover:bg-yellow-500 cursor-pointer"
              : "bg-gray-400 text-gray-400"
            }`}
        >

          <span>Submit Review</span>
          {!loading ? <SendHorizontal width={20} /> : (<span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>)

            
          }
        </button>

      </form>

      {/* 📱 Popup Modal (only for mobile) */}
      {showModal && (
        <form onSubmit={handleSubmit} className="md:hidden fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40">
          <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 w-full max-w-sm relative " ref={modalRef}>
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>

            <h2 className="text-lg font-monasans_semibold text-gray-800">
              Add a Review
            </h2>

            {/* Stars */}
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <button
                    type="button"
                    key={starValue}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                  >
                    <span
                      className={`text-2xl ${starValue <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                        }`}
                    >
                      ★
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Textarea */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none font-monasans_semibold text-xs"
              rows={3}
              required={!!session && !isUserHasReview}
            />

            {/* Submit Button */}
            <button
              type="submit"

              className={`w-full flex items-center justify-center gap-2 text-white font-dmsans_light py-2 rounded-md transition 
    ${isValid
                  ? "bg-yellow-600 hover:bg-yellow-500 cursor-pointer"
                  : "bg-gray-400 text-gray-400"
                }`}
            >
              <span>Submit Review</span>
               {!loading ? <SendHorizontal width={20} /> : (<span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>)}
            </button>
          </div>
        </form>
      )}
      {/* {message && <p className="text-sm text-center mt-2 text-red-500">{message}</p>} */}
    </div>
  );
}

