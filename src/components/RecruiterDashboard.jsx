import { useEffect, useState } from "react";
import axios from "axios";
import "./RecruiterDashboard.css";

function RecruiterDashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");


    const fetchDashboard = async () => {

        try {

            const res = await axios.get(
                "http://localhost:8080/api/dashboard/recruiter",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDashboard(res.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchDashboard();

    }, []);


    if (loading) {

        return (
            <div className="dashboard-loading">
                Loading Dashboard...
            </div>
        );

    }


    if (!dashboard) {
        return <p>Unable to load dashboard</p>;
    }


    return (

        <div className="dashboard">


            {/* ================================= */}
            {/* STAT CARDS */}
            {/* ================================= */}

            <div className="stats-grid">

                <div className="stat-card">
                    <h4>Total Jobs</h4>
                    <h2>{dashboard.totalJobs}</h2>
                    <p>Jobs posted by you</p>
                </div>


                <div className="stat-card">
                    <h4>Total Applicants</h4>
                    <h2>{dashboard.totalApplicants}</h2>
                    <p>Applications received</p>
                </div>


                <div className="stat-card">
                    <h4>Accepted</h4>
                    <h2>{dashboard.accepted}</h2>
                    <p>Selected candidates</p>
                </div>


                <div className="stat-card">
                    <h4>Rejected</h4>
                    <h2>{dashboard.rejected}</h2>
                    <p>Rejected applications</p>
                </div>

            </div>



            {/* ================================= */}
            {/* RECENT JOBS */}
            {/* ================================= */}

            <div className="dashboard-row">


                <div className="dashboard-section">

                    <div className="section-header">

                        <div>
                            <h2>Recent Job Posts</h2>

                            <p>
                                Your latest published jobs
                            </p>
                        </div>

                    </div>


                    {dashboard.recentJobs.length === 0 ? (

                        <div className="empty-dashboard">

                            <h3>No jobs posted yet</h3>

                            <p>
                                Create your first job posting.
                            </p>

                        </div>

                    ) : (

                        <div className="recent-jobs">

                            {dashboard.recentJobs.map(job => (

                                <div
                                    className="recent-job"
                                    key={job.id}
                                >

                                    <div>

                                        <h3>
                                            {job.title}
                                        </h3>

                                        <p>
                                            {job.company}
                                        </p>

                                    </div>

                                    <span>
                                        {job.location}
                                    </span>

                                </div>

                            ))}

                        </div>

                    )}

                </div>



                {/* ================================= */}
                {/* NEW APPLICANTS */}
                {/* ================================= */}

                <div className="dashboard-section">

                    <div className="section-header">

                        <div>

                            <h2>New Applicants</h2>

                            <p>
                                Latest candidate applications
                            </p>

                        </div>

                    </div>


                    {dashboard.recentApplicants.length === 0 ? (

                        <div className="empty-dashboard">

                            <h3>No applicants yet</h3>

                            <p>
                                Applications will appear here.
                            </p>

                        </div>

                    ) : (

                        <div className="recent-applicants">

                            {dashboard.recentApplicants.map(app => (

                                <div
                                    className="recent-applicant"
                                    key={app.id}
                                >

                                    <div className="candidate-avatar">

                                        {app.name
                                            ?.charAt(0)
                                            .toUpperCase()}

                                    </div>


                                    <div className="candidate-info">

                                        <h3>
                                            {app.name}
                                        </h3>

                                        <p>
                                            {app.job?.title}
                                        </p>

                                        <small>
                                            {app.email}
                                        </small>

                                    </div>


                                    <span
                                        className={
                                            `status ${app.status?.toLowerCase()}`
                                        }
                                    >
                                        {app.status}
                                    </span>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>



            {/* ================================= */}
            {/* ACTIVITY */}
            {/* ================================= */}

            <div className="dashboard-section activity-section">

                <div className="section-header">

                    <div>

                        <h2>
                            Recruitment Activity
                        </h2>

                        <p>
                            Latest recruitment activities
                        </p>

                    </div>

                </div>


                {dashboard.activities.length === 0 ? (

                    <div className="empty-dashboard">

                        <p>
                            No recruitment activity yet.
                        </p>

                    </div>

                ) : (

                    <div className="activity-list">

                        {dashboard.activities.map(activity => (

                            <div
                                className="activity-item"
                                key={activity.id}
                            >

                                <div className="activity-dot">
                                </div>


                                <div className="activity-content">

                                    <h3>
                                        {activity.message}
                                    </h3>


                                    <p>

                                        {activity.candidateName && (
                                            <>
                                                <strong>
                                                    {activity.candidateName}
                                                </strong>
                                                {" • "}
                                            </>
                                        )}

                                        {activity.jobTitle}

                                    </p>

                                </div>


                                <span className="activity-status">

                                    {activity.status ||
                                        "Completed"}

                                </span>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default RecruiterDashboard;