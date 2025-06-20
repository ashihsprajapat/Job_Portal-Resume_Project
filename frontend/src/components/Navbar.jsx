

import React, { useContext, useEffect } from 'react'
import { assets } from './../assets/assets';
import { useClerk, UserButton, useUser } from "@clerk/clerk-react"
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Navbar() {

    const { openSignIn } = useClerk();

    const { user } = useUser();
    //console.log("user in navbar", user)

    useEffect(() => {
        if (user) {
            // console.log(user)
            setUserId(user.id);
        }
    }, [user])

    const { navigate, userId, setUserId, companyData, setCompanyData,
        companyToken, setCompanyToken,
    } = useContext(AppContext)


    const logout = () => {
        setCompanyToken(null);
        localStorage.removeItem('companyToken')
        setCompanyData(null)
        navigate("/")
    }


    const { setShowRecruiterLogin } = useContext(AppContext);
    return (
        <div className='shadow'>
            <div className='container  items-center  px-4 2xl:px-4 mx-auto flex justify-between p-2'>
                <img onClick={() => navigate('/')}
                    className="cursor-pointer" src={assets.logo} alt="" />
                {
                    companyData ? (
                        <div className='flex items-center gap-3'>
                            <p>WelCome, {companyData.name}</p>
                            <div className='relative group'>
                                <img className='w-8 border rounded-full ' src={companyData.image} alt='' />

                                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black pt-12 rounded '>
                                    <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                        <li className='py-1 px-2 cursor-pointer ' onClick={logout}>
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                        :
                        user ? (
                            <div className='flex items-center gap-4'>
                                <Link to="/applications"  > Applied Job </Link>
                                <p>|</p>
                                <p className='  max-sm:hidden' >Hi,{user.firstName}</p>
                                <UserButton />
                            </div>)
                            : (<div className='flex items-center gap-4 max-sm:text-xs'>
                                <button onClick={e => setShowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login</button>
                                <button onClick={e => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'> Login</button>
                            </div>)
                }




                {

                }

            </div>

        </div>
    )
}

export default Navbar
