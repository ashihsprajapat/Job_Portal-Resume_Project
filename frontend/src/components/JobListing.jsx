

import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { assets, JobCategories, JobLocations } from './../assets/assets';
import JobCard from './JobCard';

function JobListing() {

    const { jobs, searchFilter, setSearcgFilter, setIsSearch, isSearch } = useContext(AppContext)
    
    const [showFilter, setShowFilter] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const [selectCategories, setSelectCategories] = useState([]);

    const [selectedLocation, setSelectedLocation] = useState([]);

    const [filterJobs, setFilterJobs] = useState(jobs)

    const handleCategoryChange = (categry) => {
        //console.log(categry)
        setSelectCategories(pre =>
            pre.includes(categry) ? pre.filter(c => c !== categry) : [...pre, categry]
        )
    }


    const handleLocationChange = (location) => {
        setSelectedLocation(pre =>
            pre.includes(location) ? pre.filter(c => c !== location) : [...pre, location]
        )
    }

    useEffect(() => {
        const matchingCategory = job => selectCategories.length === 0 || selectCategories.includes(job.category)

        const matchesLocation = job => selectedLocation.length == 0 || selectedLocation.includes(job.location)

        const matechesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())

        const matchesSearchLocation = job => searchFilter.location === '' || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilterJobs = jobs.slice().reverse().filter(
            job => matchingCategory(job) && matchesLocation(job) && matechesTitle(job) && matchesSearchLocation(job)
        )

        setFilterJobs(newFilterJobs);
        setCurrentPage(1);

    }, [jobs, selectCategories, selectedLocation, searchFilter])

    return (
        <div className='container 2xl:px-20 mx-auto  flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
            {/* sidbar */}
            <div className='w-full lg:w-1/4 bg-white px-4 ' >
                {/* search filter from hero componetns */}
                {
                    isSearch && (searchFilter.title !== "" || searchFilter.location !== "") &&
                    (<>
                        <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                        <div className='mb-4 gap-3 text-gray-700'>
                            {searchFilter.title && (
                                <span className='inline-flex  items-center gap-2.5 bg-blue-50 border-blue-200 border w-fit px-4 py-1.5 rounded'>
                                    {searchFilter.title}
                                    <img onClick={e => setSearcgFilter(fiter => ({ ...fiter, title: "" }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                </span>
                            )}
                            {searchFilter.location && (
                                <span className=' ml-5 inline-flex  items-center gap-2.5 bg-red-50 border-red-200 border w-fit px-4 py-1.5 rounded'>
                                    {searchFilter.location}
                                    <img onClick={e => setSearcgFilter(fiter => ({ ...fiter, location: "" }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                </span>
                            )}
                        </div>
                    </>)
                }
                <button onClick={() => setShowFilter(pre => !pre)} className='px-6 py-1.5 rounded border 
                border-gray-400 lg:hidden'>{
                        showFilter ? "close" : 'Filter'
                    } </button>
                {/* categry filter */}
                <div className={showFilter ? "" : 'max-lg:hidden'}>
                    <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
                    <ul className='space-y-4 text-gray-600 '>
                        {
                            JobCategories.map((categry, i) =>
                                <li className='flex gap-3 items-center' key={i}>
                                    <input type="checkbox"
                                        onChange={() => handleCategoryChange(categry)}
                                        checked={selectCategories.includes(categry)} />

                                    {categry}</li>)
                        }
                    </ul>
                </div>


                {/* location filter */}
                <div className={showFilter ? "" : 'max-lg:hidden'}>
                    <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
                    <ul className='space-y-4 text-gray-600 '>
                        {
                            JobLocations.map((location, i) =>
                                <li className='flex gap-3 items-center' key={i}>
                                    <input type="checkbox"
                                        onChange={() => handleLocationChange(location)}
                                        checked={selectedLocation.includes(location)}
                                    /> {location}</li>)
                        }
                    </ul>
                </div>
            </div>

            {/* job listings */}
            <section className='w-full lg:w-3/4  text-gray-800 max-lg:px-4 '>
                <h3 className='text-3xl font-medium py-2 ' id='job-list' >Latest jobs</h3>
                <p className='mb-8'>Get your desired job from top companies</p>

                <div className=' grid  grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {
                        filterJobs.slice((currentPage - 1) * 6, (currentPage * 6)).map((job, i) => (
                            <JobCard key={i} job={job} />
                        ))
                    }
                </div>

                {/* paginations */}
                {
                    jobs.length > 0 && (
                        <div className='flex items-center  justify-center  space-x-2 mt-10'>
                            <a href="#job-list">
                                <img onClick={() => (setCurrentPage(prev => Math.max(prev - 1, 1)))}
                                    src={assets.left_arrow_icon} alt="" />
                            </a>
                            {
                                Array.from({ length: Math.ceil(filterJobs.length / 6) }).map((_, i) => (
                                    <a key={i} href='#job-list'>
                                        <button onClick={() => (setCurrentPage(i + 1))} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === i + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}> {i + 1}</button>
                                    </a>
                                ))
                            }
                            <a href="#job-list">
                                <img onClick={() => (setCurrentPage(prev => Math.min(prev + 1, Math.ceil(jobs.length / 6))))}
                                    src={assets.right_arrow_icon} alt="" />
                            </a>
                        </div>
                    )
                }
            </section>



        </div>
    )
}

export default JobListing
