
import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { assets } from './../assets/assets';
import AppContext from '../context/AppContext';

function Dashboard() {
    const { navigate } = useContext(AppContext)
    return (
        <div className='min-h-screen  '>
            {/* navbar for Recruiter panel */}
            <div className='shadow py-4'>
                <div className='flex justify-between items-center'>
                    <img onClick={() => navigate('/')} className='cursor-pointer max-sm:w-32' src={assets.logo} alt="" />
                    <div className='flex items-center gap-3'>
                        <p>WelCome, Ashish</p>
                        <div className='relative group'>
                            <img className='w-8 border rounded-full ' src={assets.company_icon} alt="" />
                            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black pt-12 rounded '>
                                <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                    <li className='py-1 px-2 cursor-pointer'>
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='flex items-start'>
                {/* leftside bar  add job view-Application mange-job */}

                <div className='inline-block min-h-screen border-r-2'>
                    <ul className='flex  flex-col items-start pt-5 text-gray-800'>
                        <NavLink className={({ isActive }) => ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 rounded ${isActive && "bg-blue-100 border-r-4 border-blue-500"} `} to={'/dashboard/add-job'}>
                            <img className='min-w-4' src={assets.add_icon} alt="" />
                            <p className='max-sm:hidden'>Add Job</p>
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 rounded ${isActive && "bg-blue-100 border-r-4 border-blue-500"} `}
                            to={'/dashboard/manage-job'}>
                            <img className='min-w-4' src={assets.home_icon} alt="" />
                            <p className='max-sm:hidden'>Manage Job</p>
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 rounded ${isActive && "bg-blue-100 border-r-4 border-blue-500"} `}
                            to={'/dashboard/view-application'}>
                            <img className='min-w-4' src={assets.person_icon} alt="" />
                            <p className='max-sm:hidden'>view Application</p>
                        </NavLink>
                    </ul>
                </div>

                {/* right side bard */}
                <div>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default Dashboard
