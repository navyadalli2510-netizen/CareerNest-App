import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  BriefcaseBusiness,
  MapPin,
  Clock,
  Users,
  Eye,
  Edit,
  Trash2,
  Building2,
  Plus
} from "lucide-react";

import "./recruiterJobs.css";

function RecruiterJobs() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  // =====================================================
  // FETCH ONLY LOGGED-IN RECRUITER JOBS
  // =====================================================

  const fetchJobs = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/jobs/recruiter",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setJobs(response.data);

    } catch (error) {

      console.error(
        "Error fetching recruiter jobs:",
        error
      );

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");

        navigate("/login");
      }

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchJobs();

  }, []);

  // =====================================================
  // ADD JOB
  // =====================================================

  const handleAddJob = () => {

    navigate("/recruiter/jobs/add");

  };

  // =====================================================
  // VIEW JOB-SPECIFIC APPLICANTS
  // =====================================================

  const handleApplicants = (jobId) => {

    navigate(`/recruiter/applicants/${jobId}`);

  };

  // =====================================================
  // UPDATE JOB
  // =====================================================

  const handleUpdate = (jobId) => {

    navigate(`/recruiter/edit-job/${jobId}`);

  };

  // =====================================================
  // DELETE JOB
  // =====================================================

  const handleDelete = async (jobId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:8080/api/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Remove deleted job immediately from UI
      setJobs((prevJobs) =>
        prevJobs.filter(
          (job) => job.id !== jobId
        )
      );

      alert("Job deleted successfully");

    } catch (error) {

      console.error(
        "Delete error:",
        error
      );

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {

        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");

        alert("Session Expired. Please Login Again.");

        navigate("/login");

        return;
      }

      alert("Unable to delete job");

    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <div className="jobsLoading">
        Loading jobs...
      </div>
    );

  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (

    <div className="recruiterJobs">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="jobsHeader">

        <div className="jobsHeaderText">

          <h1>
            My Jobs
          </h1>

          <p>
            Create, manage and monitor
            your job postings.
          </p>

        </div>

        {/* ADD JOB */}

        <button
          className="addJobButton"
          onClick={handleAddJob}
        >

          <Plus size={18} />

          Add Job

        </button>

      </div>


      {/* =================================================
          NO JOBS
      ================================================= */}

      {jobs.length === 0 ? (

        <div className="noJobs">

          <BriefcaseBusiness
            size={60}
          />

          <h2>
            No Jobs Posted Yet
          </h2>

          <p>
            Create your first job posting.
          </p>

          <button
            onClick={handleAddJob}
          >

            <Plus size={18} />

            Add Job

          </button>

        </div>

      ) : (

        /* =================================================
           JOB GRID
        ================================================= */

        <div className="jobGrid">

          {jobs.map((job) => (

            <div
              className="jobCard"
              key={job.id}
            >

              {/* =================================================
                  TOP
              ================================================= */}

              <div className="jobCardTop">

                <div className="jobIcon">

                  <BriefcaseBusiness
                    size={25}
                  />

                </div>

                <span className="activeBadge">
                  Active
                </span>

              </div>


              {/* =================================================
                  JOB TITLE
              ================================================= */}

              <h2>
                {job.title}
              </h2>


              {/* =================================================
                  JOB INFORMATION
              ================================================= */}

              <div className="jobInfo">

                {/* COMPANY */}

                <p>

                  <Building2
                    size={17}
                  />

                  {job.company}

                </p>


                {/* LOCATION */}

                <p>

                  <MapPin
                    size={17}
                  />

                  {job.location}

                </p>


                {/* JOB TYPE */}

                <p>

                  <Clock
                    size={17}
                  />

                  {job.type}

                </p>

              </div>


              {/* =================================================
                  APPLICANT COUNT
              ================================================= */}

              <div className="applicantCount">

                <Users
                  size={20}
                />

                <strong>
                  {job.applicants || 0}
                </strong>

                <span>
                  Applicants
                </span>

              </div>


              {/* =================================================
                  ACTION BUTTONS
              ================================================= */}

              <div className="jobActions">

                {/* VIEW APPLICANTS */}

                <button
                  className="viewBtn"
                  onClick={() =>
                    handleApplicants(job.id)
                  }
                >

                  <Eye
                    size={17}
                  />

                  View Applicants

                </button>


                {/* UPDATE */}

                <button
                  className="editBtn"
                  onClick={() =>
                    handleUpdate(job.id)
                  }
                >

                  <Edit
                    size={17}
                  />

                  Update

                </button>


                {/* DELETE */}

                <button
                  className="deleteBtn"
                  onClick={() =>
                    handleDelete(job.id)
                  }
                >

                  <Trash2
                    size={17}
                  />

                  Delete

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default RecruiterJobs;