import React from 'react'
import { viewApplicationsPageData } from '../assets/assets'
import { assets } from './../assets/assets';

function ViewApplication() {
    return (
        <div className='container max-auto p-4'>
            <div>
                <table className='w-full max-w-4xl bg-white border border-gray-200
                max-sm:text-sm '>
                    <thead>
                        <tr className='border-b'>
                            <th className='py-2 px-4 text-left' >#</th>
                            <th className='py-2 px-4 text-left' >User name</th>
                            <th className='py-2 px-4 text-left max-sm:hidden ' >Job Title</th>
                            <th className='py-2 px-4 text-left max-sm:hidden ' >Location</th>
                            <th className='py-2 px-4 text-left' >Resume</th>
                            <th className='py-2 px-4 text-left' >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            viewApplicationsPageData.map((applicent, i) => {
                                return (
                                    <tr className='text-gray-700' key={i}>
                                        <td className='py-2 px-4 border-b text-center '>{i + 1}</td>
                                        <td className='py-2 px-4 border-b text-center flex '>
                                            <img className='w-10 h-10  rounded-full mr-3 max-sm:hidden' src={applicent.imgSrc} alt="" />
                                            <span>{applicent.name}</span>

                                        </td>
                                        <td className='py-2 px-4 border-b text-center  max-sm:hidden'>{applicent.jobTitle}</td>
                                        <td className='py-2 px-4 border-b text-center  max-sm:hidden'>{applicent.location}</td>
                                        <td>
                                            <a href="" target='_blank'
                                            className='bg-blue-50  text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center'>
                                                Resume
                                                <img src={assets.resume_download_icon} alt="" /></a>
                                        </td>
                                        <td className='py-2 px-4 border-b text-center relative '>
                                            <div className='relative inline-block text-left group'>
                                                <button className='text-gray-500'> ...</button>
                                                <div className='hidden z-10 absolute  right-0 md:left-0 top-0 mt-2 w-32 bg-white border  border-gray-200 rounded
                                                shadow group-hover:block '>
                                                    <button  className=' block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'> Accept
                                                    </button>
                                                    <button  className=' block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'>Reject</button>
                                                </div>
                                            </div></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ViewApplication
