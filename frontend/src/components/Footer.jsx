
import React from 'react'
import { assets } from './../assets/assets';

function Footer() {
    return (
        <div className='container px-4 2xl:px-20 mx-auto gap-4 py-3 mt-20 flex item-center justify-between'>
            <div className='flex items-center '>
                <img width={160} src={assets.logo} alt="" />
                <div className=' py-1.3 bg-gray-300' ></div>
                <p className='text-gray-500 flex-1 border-gray-400 pl-4  text-sm max-sm:hidden'>Copyright @GreatStack.dev | All right reserved.</p>
            </div>
            <div className='flex items-center gap-2.5'>
            <img width={38} src={assets.facebook_icon} alt="" />
            <img width={38} src={assets.twitter_icon} alt="" />
            <img width={38} src={assets.instagram_icon} alt="" />
            </div>
        </div>
    )
}

export default Footer
