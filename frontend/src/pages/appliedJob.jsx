import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, } from './../assets/assets';
import AppContext from '../context/AppContext';
import Loading from '../components/Loading';
import Navbar from './../components/Navbar';
import moment from "moment"
import kconvert from 'k-convert';
import { as } from './../../node_modules/moment/src/lib/duration/as';
import JobCard from '../components/JobCard';
import Footer from './../components/Footer';

function AppliedJob() {
    const { id } = useParams();

    const { jobs } = useContext(AppContext);
    // console.log(jobs)

    const [jobDatas, setJobDatas] = useState(null)

    const findJobFunction = async () => {
        const data = jobs.filter(job => job._id === id)
        if (data.length !== 0) {
            setJobDatas(data[0])
            // console.log(data[0])
        }
    }

    useEffect(() => {
        if (jobs.length > 0) {
            findJobFunction()
        }

    }, [id, jobs])

    return jobDatas ? (
        <>
            <Navbar />
            <div className='min-h-screen flex flex-col py-10 container  px-4 2xl:px-20
                        mx-auto'>
                <div className=' bg-white  text-black roudend-lg border border-black-400   w-full  '>
                    <div className=' flex  justify-center md:justify-between flex-wrap gap-8 mx-14   px-14 py-20 mb-6 
                            bg-sky-50 rounded-xl items-center border border-sky-400 
                        max-sm:flex-row'>
                        <div className=' flex flex-col md:flex-row text-neutral-700 items-center '>
                            <img className='h-24 bg-white p-4 
                            mr-4  max-mdLmb-4 border' width={100} src={jobDatas.companyId.image} alt="" />
                            <div className='text-center md:text-left'>
                                <h1 className='font-medium text-2xl   sm:text-4xl lg:text-4xl
                    mb-5'>{jobDatas.title}</h1>
                                <ul className='flex flex-row flex-wrap max-md:justify-center
                                gap-y-2 gap-6  items-center text-gray-600 mt-2
                                items-center '>
                                    <li className='flex gap-1 items-center'> <img src={assets.suitcase_icon} alt="" />
                                        {jobDatas.companyId.name}
                                    </li>
                                    <li className='flex gap-1 items-center'>
                                        <img src={assets.location_icon} alt="" />
                                        {jobDatas.location}
                                    </li>
                                    <li className='flex gap-1 items-center'>
                                        <img src={assets.person_icon} alt="" />
                                        {jobDatas.level}
                                    </li>
                                    <li className='flex gap-1 items-center'>
                                        <img src={assets.money_icon} alt="" />
                                        CTC : {kconvert.convertTo(jobDatas.salary)}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center text-end text-sm  max-md:mx-auto max-md:text-center
                        '>
                            <button className='bg-blue-600 text-white px-10 p-2.5 
                                rounded  mb-5'>Apply now</button>
                            <p className='mt-1 text-gray-600'> posted {moment(jobDatas.date).fromNow()}  </p>
                        </div>
                    </div>


                    <div className='flex flex-col lg:flex-row justify-between items-start'>
                        {/* left section for job description */}
                        <div className='w-full lg:w-2/3' >
                            <h2 className='font-bold text-2xl mb-4'>Job description
                            </h2>
                            <div className='rich-text' dangerouslySetInnerHTML={{ __html: jobDatas.description }} ></div>
                            <button className='bg-blue-600 text-white px-10 p-2.5 
                                rounded mt-10  mb-5'>Apply now</button>
                        </div>
                        {/* right section like more jobs */}
                        <div className='w-full lg:w-1/3 mt-8 lg:mt-0  space-y-5'>
                            <h2 className='text-xl font-medium'>More Jobs from {jobDatas.companyId.name}</h2>
                            {jobs.filter(job=> job._id!== jobDatas._id  && job.companyId._id=== jobDatas.companyId._id)
                            .filter(job=> true).slice(0,4)
                            .map((job, i)=>( <JobCard key={i} job={job} />))}
                        </div>
                    </div>


                </div>
            </div>

            <Footer/>
        </>
    ) : (
        <Loading />
    )
}

export default AppliedJob
