"use client"
import React from 'react'
import BouncingIcon from './BouncingIcon'

const BouncingIconsContainer = ({className}: {className?: string}) => {
  return (
    <div className={`${className}`}>
      <BouncingIcon src="/capsicumIcon.png" amplitude={24}
        className="scale-[0.5] sm:scale-[0.7]"
        parentClass=' left-3 sm:left-6 top-0 sm:top-6 lg:left-32' rotate={30} />

      <BouncingIcon src='/carrot.png' amplitude={10} rotate={-30} className='scale-[0.4] sm:scale-[0.6]' parentClass='right-3 top-3 lg:right-32' />
      <BouncingIcon src='/cabbage.png' amplitude={19} rotate={-20} className='scale-[0.6] sm:scale-[0.8] lg:scale-[0.9]' parentClass='top-36 right-10 lg:right-24 ' />
      <BouncingIcon src='/kiwi.png' amplitude={6} rotate={50} className='scale-[0.6] sm:scale-[0.8]' parentClass='top-36 left-5 sm:left-28 md:left-44 lg:left-72 xl:top-44' />
      <BouncingIcon src='/tomatoIcon.png' rotate={-40} className='scale-[0.7] sm:scale-[0.8] lg:-scale-[0.6]' parentClass='top-[45%] left-5 sm:left-[55%] sm:top-[35%] md:left-[10%] lg:left-[5%] xl:top-56' />

      <BouncingIcon src='/almond.png' amplitude={60} rotate={-40} className='scale-[0.4] lg:-scale-[0.5]' parentClass='top-[28%] left-[38%] sm:left-[25%] sm:top-[50%] md:left-[40%] md:top-[40%] lg:left-[40%] xl:top-[8%]' />
      <BouncingIcon src='/greenAppleIcon.png' amplitude={16} className='scale-[0.5]  lg:-scale-[0.6]' parentClass='top-[45%] right-[30%] sm:left-[40%] sm:top-[20%] md:left-[50%] md:top-[6%] lg:left-[40%] xl:left-[70%]' />

      <BouncingIcon src='/orangeIcon.png' amplitude={3} rotate={-80} className='scale-[0.5] sm:scale-[0.6] lg:-scale-[0.6]' parentClass='top-[5%] left-[30%] sm:left-[55%] sm:top-[5%] md:left-[30%] lg:left-[5%] lg:top-[50%] xl:top-[40%]' />
    </div>
  )
}

export default BouncingIconsContainer