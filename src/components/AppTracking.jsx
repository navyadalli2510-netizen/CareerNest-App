import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import "./AppTracking.css";

function AppTrack() {

  const [activeTab, setActiveTab] = useState("applied");
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {

    if (!token) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    fetchApplications();
    fetchSavedJobs();

  }, []);

  const fetchApplications = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("APPLICATION DATA:", response.data);
setApplications(response.data);

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

      setSavedJobs(response.data);

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

    <div className="track-page">

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

      <div className="track-header">

        <h1>Application Dashboard</h1>

        <p>
          Track all your job applications in one place
        </p>

      </div>

      <div className="segment-control">

        <button
          className={
            activeTab === "applied"
              ? "segment active"
              : "segment"
          }
          onClick={() => setActiveTab("applied")}
        >
          Applied Jobs
        </button>

        <button
          className={
            activeTab === "saved"
              ? "segment active"
              : "segment"
          }
          onClick={() => setActiveTab("saved")}
        >
          Saved Jobs
        </button>

      </div>

      <div className="track-content">

        {activeTab === "applied" ? (

          applications.length > 0 ? (

            <div className="card-grid">

              {applications.map((app) => (

                <div
                  className="app-card"
                  key={app.id}
                >

                  <div className="card-top">

                    <div>

                      <h2>{app.title}</h2>

                      <p className="company">
                        🏢 {app.company}
                      </p>

                      <p className="location">
                        📍 {app.location}
                      </p>

                    </div>

                    <span
                      className={`status ${app.status?.toLowerCase()}`}
                    >
                      {app.status}
                    </span>

                  </div>

                  <hr />

                  <div className="candidate-info">

                    <p>
                      <strong>👤 Applicant :</strong> {app.name}
                    </p>

                    <p>
                      <strong>📧 Email :</strong> {app.email}
                    </p>

                    <p>
                      <strong>📞 Phone :</strong> {app.phone}
                    </p>

                  </div>

                  <div className="application-status">

                    <h4>Application Status</h4>

                    <p>

                      {app.status === "Applied" &&
                        "🕒 Your application is under review."}

                      {app.status === "Accepted" &&
                        "🎉 Congratulations! Your application has been accepted."}

                      {app.status === "Rejected" &&
                        "❌ Unfortunately, your application was rejected."}

                    </p>

                  </div>

                  <div className="card-footer">

                    <button
                      className={`status-btn ${app.status?.toLowerCase()}`}
                    >

                      {app.status === "Applied" &&
                        "Application Pending"}

                      {app.status === "Accepted" &&
                        "Accepted"}

                      {app.status === "Rejected" &&
                        "Rejected"}

                      {!app.status &&
                        "Unknown"}

                    </button>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="empty">

              <h2>No Applications Yet</h2>

              <p>
                Apply for jobs to see them here.
              </p>

            </div>

          )

        ) : (          savedJobs.length > 0 ? (

            <div className="card-grid">

              {savedJobs.map((job) => (

                <div
                  className="app-card"
                  key={job.id}
                >

                  <div className="card-top">

                    <div>

                      <h2>{job.jobTitle}</h2>

                      <p className="company">
                        🏢 {job.company}
                      </p>

                      <p className="location">
                        📍 {job.location}
                      </p>

                      <p>
                        💼 {job.type}
                      </p>

                      <p>
                        💰 {job.salary}
                      </p>

                    </div>

                    <span className="status saved">
                      Saved
                    </span>

                  </div>

                  <hr />

                  <div className="card-footer">

                    <button
                      className="apply-btn"
                      onClick={() =>
                        navigate(`/apply-job/${job.jobId}`)
                      }
                    >
                      Apply Now
                    </button>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeJob(job.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="empty">

              <h2>No Saved Jobs</h2>

              <p>
                Save jobs to view them here.
              </p>

            </div>

          )

        )}

      </div>
          </div>

  );

}

export default AppTrack;