
import React, { useContext, useRef } from 'react'
import Navbar from './Navbar';
import { assets } from './../assets/assets';
import AppContext from '../context/AppContext';

function Hero() {

    const { searchFilter, setSearcgFilter, isSearch, setIsSearch } = useContext(AppContext);

    const titleRef = useRef(null);

    const loactionRef = useRef(null)


    const onSearch = (e) => {
        setSearcgFilter({
            title: titleRef.current.value,
            location: loactionRef.current.value,
        })
        setIsSearch(true);
        setIsSearch(true);
    }

    return (
        <div className='container 2xl:px-20 mx-auto my-10'>
            <div className='bg-gradient-to-r from-purple-900  to-purpule-980 text-white text-center py-16 mx-2  rounded-xl  font-medium '>
                <h2 className='text-2xl md:text-3xl lg:text-4xl mb-4 '>Over 10,000+ jobs to apply</h2>
                <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
                <div className='flex items-center bg-white justify-between rounded border text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto'>
                    <div className='flex items-center  gap-4'>
                        <img className='h-4 sm:h-5' src={assets.search_icon} alt="" />
                        <input ref={titleRef} className='max-sm:text-xs p-2  outline-none w-full' placeholder='Search for Jobs' type="text" />
                    </div>
                    <div className='flex  items-center  gap-4'>
                        <img className='h-4 sm:h-5' src={assets.location_icon} alt="" />
                        <input ref={loactionRef} placeholder='Location' className='max-sm:text-xs p-2 w-full outline-none ' type="text" />
                    </div>
                    <button onClick={() => onSearch()} className='bg-blue-600 text-white px-6 m-1 py-2 rounded'>Search</button>
                </div>

            </div>
            <div className='flex gap-5 justify-between bg-white  shadow-md mt-5 border border-gray-600 p-6 rounded-md m-5'>

                <div className='flex items-center gap-10 lg:gap-16  flex-wrap'>
                    <p className='font-medium '>Trusted by</p>
                    <img className='h-6' src={assets.microsoft_logo} alt="" />
                    <img className='h-6' src={assets.walmart_logo} alt="" />
                    <img className='h-6' src={assets.accenture_logo} alt="" />
                    <img className='h-6' src={assets.samsung_logo} alt="" />
                    <img className='h-6' src={assets.amazon_logo} alt="" />
                    <img className='h-6' src={assets.adobe_logo} alt="" />
                </div>
            </div>

            <div>
                {
                    isSearch && (
                        <div>
                            {isSearch}
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Hero
