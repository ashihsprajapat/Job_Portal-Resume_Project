import { createContext, useContext, useEffect, useState } from "react";
import { JobCategories, jobsData } from './../assets/assets';
import { useNavigate } from 'react-router-dom';


const AppContext = createContext();


export const AppContextProvider = (props) => {

    const navigate = useNavigate();

    const [searchFilter, setSearcgFilter] = useState({
        title: '',
        location: ''
    })

    const [isSearch, setIsSearch] = useState(false)

    const [jobs, setJobs] = useState([]);

    //funtion to fetch jobs data-

    const fetchJobs = async () => {
        setJobs(jobsData)
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
    }, [allCateger,setAllCategory])
    const value = {
        searchFilter, setSearcgFilter, isSearch, setIsSearch,
        jobs, setJobs, navigate, showRecruiterLogin, setShowRecruiterLogin
        , allCateger
    }

    return (
        <AppContext.Provider value={value} >
            {props.children}
        </AppContext.Provider>
    )
}





export default AppContext;