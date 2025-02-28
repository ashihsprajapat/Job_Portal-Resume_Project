
import React, { useContext, useEffect, useState } from 'react'
import { assets } from './../assets/assets';
import AppContext from '../context/AppContext';

function RecruitorLogin() {

    const [state, setState] = useState('login');

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [image, setImage] = useState(false);

    const [isTextDataSUbmitted, setTextDataSubmitted] = useState(false);

    const onSubmithandler = async (e) => {
        e.preventDefault()


        if (state === 'Sign Up' && !isTextDataSUbmitted) {
            setTextDataSubmitted(true)
        }
    }

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [])

    const { setShowRecruiterLogin } = useContext(AppContext)

    return (
        <div className='top-0 left-0 right-0 absolute bottom-0  z-10  backdrop-blur-sm bg-black/30 flex  justify-center '>
            <form onSubmit={onSubmithandler} className='relative bg-white p-10 rounded-xl my-auto text-slate-500 h-fit'>
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state} </h1>
                <p className='text-sm'>Welcome back! Please sign in to continue</p>
                {
                    state === 'Sign Up' && isTextDataSUbmitted ? <>

                        <div className='flex  items-center gap-4 my-10'>
                            <label htmlFor="image">
                                <img className='w-16 rounded-full' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                                <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />
                            </label>
                            <p>Upload Company <br /> Logo</p>
                        </div>


                    </> :

                        <>
                            {
                                state === "Sign Up" &&
                                <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5 '>
                                    <img src={assets.person_icon} alt="" />
                                    <input className='outline-none text-sm' onChange={e => setName(e.target.value)} type="text" placeholder='Company Name' required />
                                </div>
                            }

                            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5 '>
                                <img src={assets.email_icon} alt="" />
                                <input onChange={e => setEmail(e.target.value)}
                                    className='outline-none text-sm'
                                    type="text" placeholder='Email Id' required />
                            </div>
                            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5 '>
                                <img src={assets.lock_icon} alt="" />
                                <input onChange={e => setPassword(e.target.value)}
                                    className='outline-none text-sm'
                                    type="password" placeholder='password' required />
                            </div>
                        </>
                }
                {
                    state === 'login' && <p className=' mt-4 text-sm text-blue-600 cursor-pointer hover:underline'>Forgot password?</p>

                }

                <button type='submit' className='bg-blue-600 w-full py-2 rounded-full text-white mt-8'>
                    {
                        state === 'login' ? "Login" : isTextDataSUbmitted ? "Create Account" : "Next"
                    }
                </button>
                {state === 'login' ?
                    <p className='mt-5 text-center' >Don't have an account?
                        <span onClick={e => setState("Sign Up")} className='text-blue-600 cursor-pointer'
                        >Sign Up</span> </p>
                    : < p className='mt-5 text-center' > Already have an account? <span className='text-blue-600  cursor-pointer'
                        onClick={e => setState("login")} >
                        Login</span> </p>
                }

                <img className='absolute top-5 right-5 cursor-pointer' onClick={e => setShowRecruiterLogin(false)} src={assets.cross_icon} alt="" />
            </form>
        </div >
    )
}

export default RecruitorLogin
