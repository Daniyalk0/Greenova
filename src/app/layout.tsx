
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Navbar from "../../components/Navbar";
import localFont from "next/font/local";
import SessionAuthProvider from "@/components/SessionAuthProvider";
import CleanFacebookHash from "@/components/CleanFacebookHash";
import { ReactNode } from "react";
// import "react-toastify/dist/ReactToastify.css";
import LocationProvider from "@/components/LocationProvider";
import { UIProvider } from "../context/ui-context";
import { AddressProvider } from "../context/address-context";
import AddressListModal from "@/components/user-address/AddressListModal";
import AddressModal from "@/components/user-address/AddressModal";
import GuestAddressHandler from "@/components/user-address/GuestAddressHandler";
import ToastProvider from "@/components/ToastProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
 title: "Greenova",
  description: "Fresh fruits & vegetables",
    verification: {
    google: "crr2ULgLQ8qlZDSKiR4V2icmriy0BiwB9D2-hgkFnXc",
  },

};

const playFairDisplay = localFont({
  src: [
    {
      path: './fonts/PlayfairDisplay-Regular.ttf',
      weight: '100 900', // full weight range
      style: 'normal',
    },
  ],
  variable: '--font-play-fair',
  display: 'swap',
});

const DMSans_semiBold = localFont({
  src: [
    {
      path: './fonts/DMSans_18pt-SemiBold.ttf',
    },
  ],
  variable: '--font-dm-sans-semibold',
  display: 'swap',
});
const DMSans_Light = localFont({
  src: [
    {
      path: './fonts/DMSans-Light.ttf',
    },
  ],
  variable: '--font-dm-sans-light',
  display: 'swap',
});
const DMSans_regular = localFont({
  src: [
    {
      path: './fonts/DMSans-Regular.ttf',
    },
  ],
  variable: '--font-dm-sans-regular',
  display: 'swap',
});
const monasans_semibold = localFont({
  src: [
    {
      path: './fonts/MonaSans_SemiExpanded-SemiBold.ttf',
    },
  ],
  variable: '--font-monasans-semibold',
  display: 'swap',
});
const DMSans_italic_light = localFont({
  src: [
    {
      path: './fonts/DMSans_18pt-LightItalic.ttf',
    },
  ],
  variable: '--font-dm-sans-italic-light',
  display: 'swap',
});
const monasans_bold = localFont({
  src: [
    {
      path: './fonts/MonaSans-Black.ttf',
    },
  ],
  variable: '--font-monasans-black',
  display: 'swap',
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playFairDisplay.variable}
        ${DMSans_semiBold.variable} ${DMSans_Light.variable}
        ${DMSans_regular.variable} ${monasans_semibold.variable}
        ${DMSans_italic_light.variable} ${monasans_bold.variable}
        antialiased bg-white`}
      >
        <SessionAuthProvider>
          <AddressProvider>
          <UIProvider>
<GuestAddressHandler/>
            <AddressModal />
      
            {children}
            <AddressListModal />
        
          </UIProvider>
          </AddressProvider>
<ToastProvider/>

        </SessionAuthProvider>
      </body>
    </html>
  )
}

