"use client"
import { Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'

const NavHeart = ({ LikedItemCount }: { LikedItemCount: null | number }
) => {
    const { data: session } = useSession()
    return (
        session?.user?.id && (


            <div className="relative flex items-center cursor-pointer gap-1">
                <div className="relative flex items-center">
                    <Heart  className="w-5 h-5" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {LikedItemCount}
                    </span>

                </div>
            </div>
        )

    )
}

export default NavHeart