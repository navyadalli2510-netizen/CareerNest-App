import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SavedJobs.css";

function SavedJobs() {

  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  useEffect(() => {

    if (!token) {
      navigate("/login");
      return;
    }

    fetchSavedJobs();

  }, []);

  const fetchSavedJobs = async () => {

    try {

      const response = await axios.get(

        "http://localhost:8080/api/saved-jobs",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      setJobs(response.data);

    } catch (err) {

      console.log(err);

      if (
        err.response?.status === 401 ||
        err.response?.status === 403
      ) {
        localStorage.clear();
        navigate("/login");
      }

    }

  };

  const removeJob = async (id) => {

    try {

      await axios.delete(

        `http://localhost:8080/api/saved-jobs/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      fetchSavedJobs();

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="saved-page">

      <h1>Saved Jobs</h1>

      <div className="saved-grid">

        {jobs.map(job => (

          <div className="saved-card" key={job.id}>

            <h2>{job.jobTitle}</h2>

            <p>🏢 {job.company}</p>

            <p>📍 {job.location}</p>

            <div className="btns">

              <button
                className="apply-btn"
                onClick={() => navigate(`/apply-job/${job.jobId}`)}
              >
                Apply Now
              </button>

              <button
                className="delete-btn"
                onClick={() => removeJob(job.id)}
              >
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default SavedJobs;