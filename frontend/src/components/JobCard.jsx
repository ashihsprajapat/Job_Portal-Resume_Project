
import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext'

function JobCard({ job }) {

    const {navigate}= useContext(AppContext)

    return (
        <div className='border border-gray-600 p-6 rounded'>
            <div className='flex justify-between items-center'>
                <img className='h-8 rounded ' src={job.companyId.image} alt="" />
            </div>
            <h4 className='font-medium text-xl
            mt-2     '>{job.title}</h4>
            <div className='flex items-center gap-3 mt-2 text-xs'>
                <span className=' border bg-blue-50 
                px-4 py-1.5 rounded
                border-blue-200'>
                    {job.location}
                </span>
                <span className='bg-red-50 border
                px-4 py-1.5 rounded     border-red-200'>
                    {job.level}
                </span>
            </div>
            <p
                className='text-gray-500 text-sm mt-4' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }} />
            <div className='flex mt-4 gap-4 text-sm items-center'>
                <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className='bg-blue-600 text-white rounded px-4 py-2'>Apply now</button>
                <button
                    onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }}
                    className='bg-white-700 text-gray-500 border border-gray-500 rounded px-4 py-2'>Learn more</button>
            </div>
        </div>
    )
}

export default JobCard
