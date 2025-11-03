"use client"
import React, { useEffect, useState } from 'react'

type reviewCardProps = { userName: string; message: string; rating: number; date: string; userImage: string }

const ReviewCard = ({ userName = "hello", message = "A round avatar circle with the person’s first letter A chat-bubble message card (white background, rounded corners A small “tail” (triangle) to make it look like a speech bubblI name, message, star", rating = 5, date = "2025-10-30T10:45:00Z", userImage }: reviewCardProps) => {


console.log('reviewCard re-rendered ❤');
console.log(userName);



    const [timeAgo, setTimeAgo] = useState("");

    // ⏱️ Function to convert timestamp → "time ago"
    const getTimeAgo = (inputDate: string) => {
        const now = Date.now();
        const reviewDate = new Date(inputDate).getTime();
        const diff = Math.floor((now - reviewDate) / 1000);

        if (diff < 60) return "just now";
        if (diff < 3600) {
            const mins = Math.floor(diff / 60);
            return `${mins} minute${mins > 1 ? "s" : ""} ago`;
        }
        if (diff < 86400) {
            const hrs = Math.floor(diff / 3600);
            return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
        }
        if (diff < 2592000) {
            const days = Math.floor(diff / 86400);
            return `${days} day${days > 1 ? "s" : ""} ago`;
        }
        const months = Math.floor(diff / 2592000);
        return `${months} month${months > 1 ? "s" : ""} ago`;
    };

    useEffect(() => {
        setTimeAgo(getTimeAgo(date));
    }, [date]);


    return (
        <div
            className="relative rounded-[2rem]  shadow-md border-2 border-[#d7d7d7] shadow-[#bebebec1]
        px-5 py-4 w-full max-w-[18rem] sm:max-w-xs min-h-[140px] flex flex-col justify-start mx-auto
        transition-all duration-300 my-5 bg-[#ffffff] sm:bg-[#f5f5f5]"
            style={{
                backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png')`,
                // backgroundColor: '#E6E6E6',
                backgroundBlendMode: 'multiply',
            }}

        >
            <div className='flex items-start justify-start flex-col gap-2 mb-2'>

                <div className="flex items-center gap-3 mb-0 text-[#2b2b2b]">
                    <img
                        //  key={srcWithBypass}
                        src={userImage || "https://tse3.mm.bing.net/th/id/OIP.S16MwWFznloeMQVbOE-bugHaEp?pid=Api&P=0&h=220"}
                        alt={'imggg'}
                        className="w-11 h-11 rounded-full object-cover border-2 border-white/30"
                    />
                    <div className="flex flex-col justify-center ">
                        <h3 className="font-semibold font-monasans_semibold leading-tight text-sm">
                            {userName}
                        </h3>

                        <p className="text-[9px] text-[#313131]  mt-[2px] font-dmsans_light">{timeAgo}</p>
                    </div>
                </div>
                <div className="flex items-center gap-[2px]">
                    {Array.from({ length: rating }).map((_, i) => (
                        <span key={i} className="text-yellow-500 text-[20px] leading-none">★</span>
                    ))}
                </div>
            </div>


            <div className="flex flex-col justify-start items-start">
                <p
                    className="text-[#444444] font-dmsans_semibold sm:text-xs text-[0.6rem] leading-3 
                    overflow-hidden line-clamp-3 transition-all duration-300 ease-in-out"
                >
                    {message}
                </p>
            </div>
        </div>
    );
}

export default ReviewCard