'use client'
import { useAnimation, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react'
import React, { useState } from 'react'

const FooterCard = () => {
    const controlsMain = useAnimation();
    const controlsSecond = useAnimation();
    const [cardHover, setCardHover] = useState(false)
    const handleMouseEnter = () => {
        setCardHover(true)
        controlsMain.start({ x: 25, transition: { type: "spring", stiffness: 300, damping: 20 } });
        controlsSecond.start({ x: 11, y: 11, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 20 } });
    };

    const handleMouseLeave = () => {
        setCardHover(false)
        controlsMain.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
        controlsSecond.start({ x: -6, y: 11, opacity: 0, transition: { type: "spring", stiffness: 400, damping: 20 } });
    };
    return (
        <div
        id='contact'
            onClick={() =>
                window.location.href = 'mailto:getdaniyalkhan@gmail.com?subject=Hello%20Daniyal&body=I%20want%20to%20connect%20with%20you'
            }
            className="cursor-pointer absolute -top-[18%] sm:-top-[30%] md:-top-[33%] lg:-top-[39%] w-[80%] lg:w-[70%] h-fit p-0 rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center bg-[url('/footerCardbg.png')] bg-cover bg-center bg-no-repeat  shadow-2xl  shadow-[#76ff64b6] transition-all duration-500 hover:translate-y-5 "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Optional overlay to make text readable */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

            <div className="relative px-4 py-5 lg:py-3 sm:px-10 z-10 text-center sm:text-left flex items-start justify-start sm:items-center  sm:justify-between  w-full">
                <div className="left w-[80%] sm:w-[70%] space-y-2 relative z-10 ">
                    {/* <div className='w-full flex flex-col items-start justify-start gap-2'> */}

                    <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-[#005b2f] font-dmsans_semibold text-left">
                        Get In <span className='font-playfair text-xl sm:text-4xl lg:text-5xl'>Touch</span> With Us.
                    </h1>
                    <p className="text-green-800 font-dmsans_light text-sm sm:text-md text-left hidden sm:inline-block lg:text-lg ">
                        Reach out to us anytime — we’re always here to make your shopping smoother and more delightful.
                    </p>
                    <p className="text-green-800 font-dmsans_light text-sm sm:text-md text-left sm:hidden m-0">
                        we’re here to make your shopping easier.
                    </p>

                    {/* </div> */}

                    <button className="mt-4  pl-3  pr-1 py-0 sm:py-1 rounded-full bg-[#00904b] font-dmsans_light text-xs sm:text-sm lg:text-md  text-white  transition flex items-center justify-center relative lg:top-10">
                        <span>Contact Us</span>
                        <div className={` p-2  rounded-full text-xs md:text-sm  -rotate-45 overflow-hidden`}>
                            <motion.div
                                className="relative w-4 h-4"
                                animate={controlsMain}
                                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                            >
                                <ArrowRight className="w-4 h-4 text-white" />
                            </motion.div>


                            <motion.div
                                className="absolute top-0 left-0 w-4 h-4"
                                animate={controlsSecond}
                                initial={{ x: -6, opacity: 0 }}
                                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                            >
                                <ArrowRight className="w-4 h-4 text-white" />
                            </motion.div>
                        </div>
                    </button>
                </div>
                <div className="right flex items-center justify-center p-0 absolute z-0 -right-5 top-0 sm:static">
                    <img
                        src="/contact.png"
                        alt="Contact illustration"
                        className="w-[200px]  sm:w-[450px] lg:w-[500px] h-auto opacity-60"
                    />
                </div>


            </div>
        </div>

    )
}

export default FooterCard