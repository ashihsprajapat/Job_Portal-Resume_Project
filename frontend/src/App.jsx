import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/homePage';
import AppliedJob from './pages/appliedJob';
import Application from './pages/application';
import RecruitorLogin from './components/RecruitorLogin';
import AppContext from './context/AppContext';
import Dashboard from './pages/Dashboard';
import AddJobs from './pages/AddJobs';
import ManageJobs from './pages/ManageJobs';
import ViewApplication from './pages/ViewApplication';
import "quill/dist/quill.snow.css"

export default function App() {
  const { showRecruiterLogin, setShowRecruiterLogin } = useContext(AppContext)
  return (
    <div>
      {
        showRecruiterLogin && <RecruitorLogin />
      }

      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/apply-job/:id" element={<AppliedJob />} />
        <Route path="/applications" element={<Application />} />
        <Route path="/dashboard" element={<Dashboard />} >
          <Route path='add-job' element={<AddJobs />} />
          <Route path='manage-job' element={<ManageJobs />} />
          <Route path='view-application' element={<ViewApplication />} />
        </Route>


      </Routes>
    </div>
  )
}
