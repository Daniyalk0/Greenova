import React from 'react'
import FooterCard from './FooterCard'
import Link from 'next/link'
// import Link from '../Link'

const Footer = () => {
    return (
        <div className="w-full px-4 mt-36 sm:mt-40 relative flex justify-center pt-20 sm:pt-48 md:pt-32 lg:mt-48
before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-24
before:bg-gradient-to-b before:from-[#76ff64bf] before:to-transparent 
 before:pointer-events-none bg-[#FCFCFC] ">
            {/* your content here */}

            <div
                className="absolute overflow-hidden  w-full sm:w-[40%] h-[50%] left-0 sm:left-[30%] -bottom-12 sm:bottom-0 bg-cover bg-center opacity-80 sm:opacity-90"
                style={{ backgroundImage: "url('/branchBg.jpg')" }}
            ></div>


            {/* Foreground content */}
            <FooterCard />
            <div className="footer w-full relative  text-gray-300 px-6 md:px-20 pt-10 pb-5 flex flex-col items-center justify-end">
                {/* Main Footer Section */}
                <div className="flex flex-col sm:flex-row justify-between gap-13 border-b border-gray-700 pb-8 w-full  ">

                    {/* Logo & Description */}
                    <div className="w-full sm:w-[50%]">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="w-44 mb-3 object-contain"
                        />

                        <p className="text-sm leading-6  font-dmsans_light sm:font-monasans_semibold text-[#0f3c27]">
                            Get farm-fresh fruits and vegetables delivered to your home. Handpicked daily, 100% natural, pesticide-free, and packed with freshness, taste, and nutrition.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="flex flex-row sm:flex-row md:gap-16 gap-8 text-[#0f3c27]">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3 font-dmsans_light">Useful Links</h3>
                            <ul className="space-y-2 text-sm flex flex-col gap-2 font-dmsans_light sm:font-monasans_semibold">
                                <li>
                                    <Link
                                        href="/"
                                       className=" transition cursor-pointer duration-300 hover:underline"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/about"
                                       className=" transition cursor-pointer duration-300 hover:underline"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                       className=" transition cursor-pointer duration-300 hover:underline"
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/blog"
                                        
                                      className=" transition cursor-pointer duration-300 hover:underline"
                                    >
                                        Blog
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3 font-dmsans_light">Socials</h3>
                            <ul className="space-y-2 text-sm flex flex-col gap-2 font-dmsans_light sm:font-monasans_semibold">
                                <li>
                                    <a href="https://twitter.com/daniyalkhandev" target="_blank" rel="noopener noreferrer" className=" transition cursor-pointer duration-300 hover:underline">X (Twitter)</a>
                                </li>
                                <li>
                                    <a href="https://instagram.com/seemstobethend" target="_blank" rel="noopener noreferrer" className=" transition cursor-pointer duration-300 hover:underline">Instagram</a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/daniyal-khan-648107263/" target="_blank" rel="noopener noreferrer" className=" transition cursor-pointer duration-300 hover:underline">LinkedIn</a>
                                </li>
                                <li>
                                    <a href="https://discord.com/channels/@dan_webdev" target="_blank" rel="noopener noreferrer" className=" transition cursor-pointer duration-300 hover:underline">Discord</a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Bottom Footer Section */}
                <div className="lastFooter flex flex-col sm:flex-row justify-between items-center pt-6 text-sm text-[#0f3c27] w-full font-dmsans_light sm:font-monasans_semibold">
                    <p>© {new Date().getFullYear()} All rights reserved.</p>
                    <p>
                        Made with
                        <img src="/green.png" alt="heart" className="inline w-8 h-8 align-middle" />
                        by Daniyal
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Footer