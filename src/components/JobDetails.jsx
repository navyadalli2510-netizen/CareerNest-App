import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import "./JobDetails.css";

function JobDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {

    if (!token) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    fetchJob();

  }, [id]);

  const handleSaveJob = async () => {

    try {

      await axios.post(
        "http://localhost:8080/api/saved-jobs",

        {
          jobId: job.id,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job Saved Successfully!");

    } catch (error) {

      console.error(error);

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
        return;
      }

      alert("Failed to save job");
    }
  };

  const fetchJob = async () => {

    try {

      const response = await axios.get(
        `http://localhost:8080/api/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJob(response.data);
      setLoading(false);

    } catch (error) {

      console.error(error);

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
        return;
      }

      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="job-details-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="job-details-container">
        <h1>Job Not Found</h1>
      </div>
    );
  }

  return (
    <div className="job-details-container">

      <nav className="profile-navbar">

        <h1
          className="logo"
          onClick={() => navigate("/home")}
        >
          Career<span>Nest</span>
        </h1>

      </nav>

      <button
  className="back-arrow"
  onClick={() => navigate("/home")}
  aria-label="Back to Home"
>
  <ArrowLeft size={22} />
</button>
      <div className="job-details-card">

        <div className="job-header">

          

          <div>
            <h1>{job.title}</h1>
            <h2>{job.company}</h2>
          </div>

        </div>

        <div className="job-info">

          <div className="info-box">
            <span>📍 Location</span>
            <p>{job.location}</p>
          </div>

          <div className="info-box">
            <span>💼 Job Type</span>
            <p>{job.type}</p>
          </div>

          <div className="info-box">
            <span>👥 Applicants</span>
            <p>{job.applicants}</p>
          </div>

          <div className="info-box">
            <span>💰 Salary</span>
            <p>{job.salary}</p>
          </div>

          <div className="info-box">
            <span>📈 Experience</span>
            <p>{job.experience}</p>
          </div>

          <div className="info-box">
            <span>🎓 Education</span>
            <p>{job.education}</p>
          </div>

        </div>

        <section>
          <h3>Job Description</h3>
          <p>{job.description}</p>
        </section>

        <section>
          <h3>About This Job</h3>
          <p>{job.aboutJob}</p>
        </section>

        <section>
          <h3>Responsibilities</h3>
          <ul>
            {job.responsibilities
              ?.split(",")
              .map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
          </ul>
        </section>

        <section>
          <h3>Requirements</h3>
          <ul>
            {job.requirements
              ?.split(",")
              .map((req, index) => (
                <li key={index}>{req.trim()}</li>
              ))}
          </ul>
        </section>

        <section>
          <h3>Skills Required</h3>

          <div className="skills-container">
            {job.skills
              ?.split(",")
              .map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill.trim()}
                </span>
              ))}
          </div>
        </section>

        <div className="action-buttons">

          <button
            type="button"
            className="save-btn"
            onClick={handleSaveJob}
          >
            Save Job
          </button>

          <button
            className="apply-btn"
            onClick={() => navigate(`/apply-job/${job.id}`)}
          >
            Apply Now
          </button>

        </div>

      </div>
    </div>
  );
}

export default JobDetails;