
import React, { useContext, useEffect, useState } from 'react'
import { assets, manageJobsData } from '../assets/assets';
import moment from 'moment'
import AppContext from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function ManageJobs() {
    const { backendUrl, navigate, companyToken, comanyData } = useContext(AppContext)


    const [alllJobs, setAllJobs] = useState([]);

    //function to get all job posted by this company
    const getAllPostedJobs = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/company/list-jobs`, { headers: { token: companyToken } })
            //    // console.log(data)
            if (data.success) {
                setAllJobs(data.jobsData.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (err) {
            toast.error(err.message)
        }
    }


    //change visible of jobs
    const changeVisible = async (id) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/company/change-visibilty`, { id }, { headers: { token: companyToken } })
            // console.log(data)

            if (data.success) {
                getAllPostedJobs()
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error(err.message);
        }
    }


    useEffect(() => {
        if (companyToken)
            getAllPostedJobs();
    }, [companyToken])

    return (

        <div className='container max-auto max-w-5xl p-4'>
            <div className='overflow-x-auto'>
                <table className='min-w-full max-sm:text-sm bg-white border border-gray-200
                            max-sm:text-sm '>
                    <thead>
                        <tr className=''>
                            <th className='py-2 border-b px-4 text-left max-sm:hidden ' >#</th>
                            <th className='py-2 border-b px-4 text-left' >Job Title</th>
                            <th className='py-2 border-b px-4 text-left max-sm:hidden ' >Date</th>
                            <th className='py-2 border-b px-4 text-left max-sm:hidden ' >Location</th>
                            <th className='py-2 border-b px-4 text-center' >Application</th>
                            <th className='py-2 border-b px-4 text-left' >Visible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            alllJobs &&
                            (
                                alllJobs.map((job, i) => (
                                    (
                                        <tr className='text-gray-700' key={i}>
                                            <td className='py-2 px-4 border-b text-center  max-sm:hidden'>{i + 1}</td>
                                            <td className='py-2 px-4 border-b  flex '>
                                                {job.title}  </td>
                                            <td className='py-2 px-4 border-b   max-sm:hidden'>{moment(job.date).format("ll")}</td>
                                            <td className='py-2 px-4 border-b   max-sm:hidden'>{job.location}</td>
                                            <td className='py-2 px-4 border-b text-center '> {job.applicants}  </td>
                                            <td className='py-2 px-4 border-b  relative '>
                                                <input onChange={() => (changeVisible(job._id))} checked={job.visible} className='scale-125 ml-4' type="checkbox" />
                                            </td>
                                        </tr>
                                    )
                                ))
                            )

                        }
                    </tbody>
                </table>
            </div>

            <div className='mt-4 flex  justify-end'>
                <button className='bg-black text-white py-2 px-4 rounded'
                    onClick={() => navigate("/dashboard/add-job")}>Add new Job</button>
            </div>

        </div>
    )
}

export default ManageJobs
