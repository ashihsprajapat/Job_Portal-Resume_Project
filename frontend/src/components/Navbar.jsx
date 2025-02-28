

import React, { useContext } from 'react'
import { assets } from './../assets/assets';
import { useClerk, UserButton, useUser } from "@clerk/clerk-react"
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Navbar() {

    const { openSignIn } = useClerk();

    const { user } = useUser();

    const {navigate}= useContext(AppContext)

    const {setShowRecruiterLogin}= useContext(AppContext);
    return (
        <div className='shadow'>
            <div className='container  items-center  px-4 2xl:px-4 mx-auto flex justify-between p-2'>
                <img onClick={()=>navigate('/')} 
                className="cursor-pointer" src={assets.logo} alt="" />
                {
                    user ?
                        <div className='flex items-center gap-4'>
                            <Link to="/applications"  > Applied Job </Link>
                            <p>|</p>
                            <p className='  max-sm:hidden' >Hi,{user.firstName +" " + user.lastName}</p>
                            <UserButton/>
                        </div>
                        : <div className='flex items-center gap-4 max-sm:text-xs'>
                            <button onClick={e=>setShowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login</button>
                            <button onClick={e => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'> Login</button>
                        </div>
                }

            </div>

        </div>
    )
}

export default Navbar
