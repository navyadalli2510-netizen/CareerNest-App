import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./components/landing";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import JobDetails from "./components/JobDetails";
import AppTrack from "./components/AppTracking";
import AppForm from "./components/AppForm";
import Profile from "./components/Profile";
import Forgot from "./components/forgot";
import About from "./components/about";

import RecruiterLayout from "./components/RecruiterLayout";
import RecruiterDashboard from "./components/RecruiterDashboard";
import RecruiterJobs from "./components/RecruiterJobs";
import RecruiterApplicants from "./components/RecruiterApplicants";
import AddJob from "./components/addjob";
import RecruiterProfile from "./components/recruiterprofile";
import EditJob from "./components/Editjob";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            USER ROUTES
        ========================= */}

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route path="/job/:id" element={<JobDetails />} />

        <Route path="/applications" element={<AppTrack />} />

        <Route path="/about" element={<About />} />

        <Route path="/apply-job/:jobId" element={<AppForm />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/forgot-password" element={<Forgot />} />


        {/* =========================
            RECRUITER ROUTES
        ========================= */}

        <Route
          path="/recruiter"
          element={<RecruiterLayout />}
        >

          {/* /recruiter */}
          <Route
            index
            element={<RecruiterDashboard />}
          />

          {/* /recruiter/dashboard */}
          <Route
            path="dashboard"
            element={<RecruiterDashboard />}
          />

          {/* /recruiter/jobs */}
          <Route
            path="jobs"
            element={<RecruiterJobs />}
          />

          {/* /recruiter/jobs/add */}
          <Route
            path="jobs/add"
            element={<AddJob />}
          />

          {/* /recruiter/edit-job/:id */}
          <Route
            path="edit-job/:id"
            element={<EditJob />}
          />

          {/* /recruiter/applicants */}
          <Route
            path="applicants"
            element={<RecruiterApplicants />}
          />
          <Route path="applicants/:jobId" element={<RecruiterApplicants />} />

          {/* /recruiter/profile */}
          <Route
            path="profile"
            element={<RecruiterProfile />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;