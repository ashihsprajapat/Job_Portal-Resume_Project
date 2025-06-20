

import React, { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import AppContext from '../context/AppContext'
import { JobCategories } from '../assets/assets'
import { JobLocations } from './../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddJobs() {

    const { backendUrl, companyToken } = useContext(AppContext);

    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("Bangalore")
    const [category, setCategory] = useState("Programming")
    const [level, setLevel] = useState("Bignner level")
    const [salary, setSalary] = useState("")

    const editorRef = useRef(null)
    const quillRef = useRef(null)


    // add job to back end
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const description = quillRef.current.root.innerHTML;

            const { data } = await axios.post(`${backendUrl}/api/company/post-job`, {
                title, description, location, salary, level, category
            }, { headers: { token: companyToken } })
            console.log(data);
            if (data.success) {
                toast.success(data.message)
                setTitle("");
                quillRef.current.root.innerHTML = "";

                setSalary("")
            }
            else {
                toast.error(data.message)
            }


        } catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        //intiliate quill

        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow'
            })
        }
    }, [])

    return (
        <form onSubmit={onSubmitHandler} className="container flex  flex-col p-4 w-full items-start gap-3">
            <div className='w-full '>
                <p className='mb-2'>Job Title</p>
                <input type="text " placeholder='Type her'
                    onChange={e => setTitle(e.target.value)}
                    className='w-full max-w-lg  px-3 py-2 border-2 border-gray-300 rounded '
                    value={title} required />
            </div>

            <div className='w-full max-w-lg '>
                <p className='my-5'>Job Description</p>
                <div ref={editorRef} >

                </div>
            </div>

            <div className='flex  flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Job Category</p>
                    <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setCategory(e.target.value)} id="">
                        {
                            JobCategories.map((category, i) => (
                                <option value={category} key={i}> {category} </option>
                            ))
                        }

                    </select>
                </div>

                <div>
                    <p className='mb-2'>Job Location</p>
                    <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setLocation(e.target.value)} id="">
                        {
                            JobLocations.map((location, i) => (
                                <option value={location} key={i}> {location} </option>
                            ))
                        }

                    </select>
                </div>

                <div>
                    <p className='mb-2'>Job Level</p>
                    <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setLevel(e.target.value)} id="">
                        <option value="Beginner level ">Beginner level</option>
                        <option value="Intermediate level ">Intermediate level</option>
                        <option value="Senior level ">Senior level</option>

                    </select>
                </div>
            </div>

            <div>
                <p className='mb-2'>Job Salary</p>
                <input value={salary} min={0} className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]'
                    type="number" placeholder='2500'
                    onChange={(e) => setSalary(e.target.value)} />
            </div>

            <button type='submit' className='w-28 py-3 mt-4 bg-black text-white rounded'>Add </button>
        </form>

    )
}

export default AddJobs
