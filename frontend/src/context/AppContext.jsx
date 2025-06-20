import { createContext, useEffect, useState } from "react";
import { JobCategories } from './../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth, useUser } from '@clerk/clerk-react';

const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    //use for user login clerk
    const { user } = useUser();
    // console.log(user)

    const [userId, setUserId] = useState(null);
    console.log("userId in appcontext", userId)

    const { getToken } = useAuth()


    const navigate = useNavigate();

    const [searchFilter, setSearcgFilter] = useState({
        title: '',
        location: ''
    })

    const [isSearch, setIsSearch] = useState(false)

    const [jobs, setJobs] = useState([]);

    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState(null)



    useEffect(() => {
        const setAuthHeaders = async () => {
            const token = await getToken();
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        };
        setAuthHeaders();
    }, [getToken]);

    //get user data from data base

    const fetchUserData = async () => {
        try {
            const token = await getToken();
            console.log("user token", token)
            const { data } = await axios.get(`${backendUrl}/api/user/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log("get requeest", data);
            if (data.success) {
                setUserData(data.user)
            } else {
                toast.error(data.message)
            }

        } catch (err) {
            toast.error(err.message)
        }
    }

    //token for company login and register
    const [companyToken, setCompanyToken] = useState(null);


    const [companyData, setCompanyData] = useState(null);

    //funtion to fetch all  jobs data-
    const fetchJobs = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/jobs`)
            console.log(" all jobs data  ", data);
            if (data.success) {
                setJobs(data.allJobs)

            } else {
                toast.error(data.message)
            }

        } catch (err) {
            toast.error(err.message)
        }
    }

    const [allCateger, setAllCategory] = useState(null)

    //find catergory
    const findAllCategory = async () => {
        setAllCategory(JobCategories)
    }

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)


    useEffect(() => {
        fetchJobs()
        findAllCategory()

        const storedCompanyToken = localStorage.getItem('companyToken')
        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken);
        }
    }, [allCateger, companyToken, setAllCategory])


    //function fecch company data;

    const fectchComapnyData = async () => {
        try {

            const { data } = await axios.get(`${backendUrl}/api/company/company`, { headers: { token: companyToken } });

            //  console.log( "CompanyData   ", data);
            if (data.success) {
                setCompanyData(data.Company);
            } else {
                toast.error(data.message)
            }

        } catch (err) {
            toast.error(err.message)
        }
    }

    useEffect(() => {
        if (companyToken) {
            fectchComapnyData();
        }
    },
        [companyToken])

    useEffect(() => {
        if (user)
            fetchUserData()
    }, [user])



    const value = {
        searchFilter, setSearcgFilter,
        isSearch, setIsSearch,
        jobs, setJobs,
        navigate, allCateger,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl,
        userId, setUserId,
    }

    return (
        <AppContext.Provider value={value} >
            {props.children}
        </AppContext.Provider>
    )
}





export default AppContext;