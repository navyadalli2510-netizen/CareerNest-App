import "./Jobs.css";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Jobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Recommended / All Jobs toggle
  const [activeTab, setActiveTab] = useState("recommended");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    fetchJobsAndRecommendations();
  }, [token, navigate]);

  // =========================================================
  // UNAUTHORIZED
  // =========================================================

  const handleUnauthorized = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");

    navigate("/login");
  };

  // =========================================================
  // FETCH ALL JOBS + RECOMMENDED JOBS
  // =========================================================

  const fetchJobsAndRecommendations = async () => {
    try {
      setLoading(true);

      const [jobsResponse, recommendedResponse] =
        await Promise.all([
          fetch("http://localhost:8080/api/jobs", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          fetch(
            "http://localhost:8080/api/jobs/recommended",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        ]);

      if (
        jobsResponse.status === 401 ||
        jobsResponse.status === 403 ||
        recommendedResponse.status === 401 ||
        recommendedResponse.status === 403
      ) {
        handleUnauthorized();
        return;
      }

      if (
        !jobsResponse.ok ||
        !recommendedResponse.ok
      ) {
        throw new Error("Unable to load jobs");
      }

      const allJobs = await jobsResponse.json();
      const recommended =
        await recommendedResponse.json();

      setJobs(allJobs);
      setRecommendedJobs(recommended);

      // If no recommended jobs,
      // automatically show All Jobs.
      if (recommended.length === 0) {
        setActiveTab("all");
      }

    } catch (error) {
      console.error(
        "Error fetching jobs:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = async (e) => {
    const keyword = e.target.value;

    setSearchTerm(keyword);

    if (keyword.trim() === "") {
      fetchJobsAndRecommendations();
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/jobs/search?keyword=${encodeURIComponent(
          keyword
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();

      setJobs(data);

    } catch (error) {
      console.error(
        "Search error:",
        error
      );
    }
  };

  // =========================================================
  // JOB CARD
  // =========================================================

  const renderJobCard = (job) => (
    <div
      className="job-card"
      key={job.id}
    >

      <div className="job-content">

        <h2>{job.title}</h2>

        <h3>{job.company}</h3>

        <p className="job-meta">
          {job.type} • {job.location}
        </p>

        <p className="job-description">
          {job.description}
        </p>

        <p className="job-applicants">
          👥 {job.applicants || 0} Applicants
        </p>

      </div>

      <div className="job-actions">

        <button
          className="learn-more-btn"
          onClick={() =>
            navigate(`/job/${job.id}`)
          }
        >
          View Job & Apply
        </button>

      </div>

    </div>
  );

  // =========================================================
  // REMOVE RECOMMENDED JOBS FROM ALL JOBS
  // =========================================================

  const recommendedIds = new Set(
    recommendedJobs.map(
      (job) => job.id
    )
  );

  const otherJobs = jobs.filter(
    (job) =>
      !recommendedIds.has(job.id)
  );

  // =========================================================
  // UI
  // =========================================================

  return (

    <div className="jobs-page">

      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <nav className="profile-navbar">

        <h1
          className="logo"
          onClick={() =>
            navigate("/home")
          }
        >
          Career<span>Nest</span>
        </h1>

      </nav>


      {/* =====================================================
          BACK BUTTON
          ===================================================== */}

      <button
        className="back-arrow"
        onClick={() =>
          navigate("/home")
        }
        aria-label="Back to Home"
      >
        <ArrowLeft size={22} />
      </button>


      {/* =====================================================
          PAGE TITLE
          ===================================================== */}

      <h1 className="jobs-title">
        Jobs Portal
      </h1>


      {/* =====================================================
          SEARCH
          ===================================================== */}

      <div className="search-container">

        <input
          type="text"
          placeholder="Search for jobs..."
          value={searchTerm}
          onChange={handleSearch}
        />

      </div>


      {/* =====================================================
          LOADING
          ===================================================== */}

      {loading ? (

        <div className="jobs-list loading-list">

          <h3>
            Loading jobs...
          </h3>

        </div>

      ) : searchTerm.trim() !== "" ? (

        /* ===================================================
           SEARCH RESULTS
           =================================================== */

        <>

          <div className="jobs-section-title">
            <span>Search Results</span>
          </div>

          <div className="jobs-list">

            {jobs.length > 0 ? (

              jobs.map(renderJobCard)

            ) : (

              <h3 className="no-jobs">
                No jobs found
              </h3>

            )}

          </div>

        </>

      ) : (

        /* ===================================================
           NORMAL JOBS
           =================================================== */

        <>

          {/* =================================================
              RECOMMENDED / ALL JOBS TOGGLE
              ================================================= */}

          <div
            className={`jobs-tabs ${
              activeTab === "recommended"
                ? "recommended-active"
                : "all-active"
            }`}
          >

            <button
              className={
                activeTab === "recommended"
                  ? "jobs-tab active"
                  : "jobs-tab"
              }
              onClick={() =>
                setActiveTab("recommended")
              }
              disabled={
                recommendedJobs.length === 0
              }
            >
              Recommended Jobs
            </button>


            <button
              className={
                activeTab === "all"
                  ? "jobs-tab active"
                  : "jobs-tab"
              }
              onClick={() =>
                setActiveTab("all")
              }
            >
              All Jobs
            </button>

          </div>


          {/* =================================================
              RECOMMENDED JOBS
              ================================================= */}

          {activeTab === "recommended" && (

            <>

              {recommendedJobs.length > 0 ? (

                <div className="jobs-list">

                  {recommendedJobs.map(
                    renderJobCard
                  )}

                </div>

              ) : (

                <h3 className="no-jobs">
                  No recommended jobs available.
                </h3>

              )}

            </>

          )}


          {/* =================================================
              ALL JOBS
              ================================================= */}

          {activeTab === "all" && (

            <>

              <div className="jobs-list">

                {otherJobs.length > 0 ? (

                  otherJobs.map(
                    renderJobCard
                  )

                ) : (

                  <h3 className="no-jobs">

                    {recommendedJobs.length > 0
                      ? "No other jobs available."
                      : "No jobs found"}

                  </h3>

                )}

              </div>

            </>

          )}

        </>

      )}

    </div>
  );
}

export default Jobs;