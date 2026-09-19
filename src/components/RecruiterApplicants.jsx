import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    MapPin,
    GraduationCap,
    BriefcaseBusiness,
    FileText,
    MessageSquare,
    Check,
    X,
    Eye
} from "lucide-react";

import "./RecruiterApplicants.css";


function RecruiterApplicants() {

    const navigate = useNavigate();

    // Get jobId from URL
    const { jobId } = useParams();

    const token =
        localStorage.getItem("token");


    const [applications, setApplications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [selectedApplicant, setSelectedApplicant] =
        useState(null);

    const [updatingId, setUpdatingId] =
        useState(null);


    // =====================================================
    // FETCH APPLICANTS
    // =====================================================

    const fetchApplicants = async () => {

        try {

            let url;

            /*
             * If jobId exists:
             * Fetch applicants only for that particular job.
             *
             * Example:
             * /api/applications/recruiter/jobs/5
             *
             * If jobId does not exist:
             * Fetch all applicants of logged-in recruiter.
             *
             * Example:
             * /api/applications/recruiter/all
             */

            if (jobId) {

                url =
                    `http://localhost:8080/api/applications/recruiter/jobs/${jobId}`;

            } else {

                url =
                    "http://localhost:8080/api/applications/recruiter/all";

            }


            const response =
                await axios.get(
                    url,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            setApplications(
                response.data
            );


        } catch (error) {

            console.error(
                "Error fetching applicants:",
                error
            );

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {

                localStorage.removeItem("token");
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("role");

                alert(
                    "Session Expired. Please Login Again."
                );

                navigate("/login");

                return;
            }


            alert(
                "Unable to load applicants"
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        fetchApplicants();

    }, [jobId]);


    // =====================================================
    // UPDATE STATUS
    // =====================================================

    const updateStatus = async (
        applicationId,
        status
    ) => {

        try {

            setUpdatingId(
                applicationId
            );


            const response =
                await axios.put(
                    `http://localhost:8080/api/applications/${applicationId}/status`,
                    {
                        status: status
                    },
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,

                            "Content-Type":
                                "application/json"
                        }
                    }
                );


            // Update list

            setApplications(
                previous =>
                    previous.map(app =>
                        app.id === applicationId
                            ? response.data
                            : app
                    )
            );


            // Update modal

            if (
                selectedApplicant &&
                selectedApplicant.id === applicationId
            ) {

                setSelectedApplicant(
                    response.data
                );
            }


        } catch (error) {

            console.error(
                "Status update error:",
                error
            );

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {

                localStorage.removeItem("token");
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("role");

                alert(
                    "Session Expired. Please Login Again."
                );

                navigate("/login");

                return;
            }


            alert(
                "Unable to update application status"
            );

        } finally {

            setUpdatingId(null);
        }
    };


    // =====================================================
    // VIEW DETAILS
    // =====================================================

    const handleViewDetails = (
        applicant
    ) => {

        setSelectedApplicant(
            applicant
        );
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="applicantsLoading">

                <div className="loadingSpinner"></div>

                <p>
                    Loading applicants...
                </p>

            </div>
        );
    }


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="recruiterApplicants">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="applicantsHeader">

                <div className="headerLeft">

                    <button
                        className="backButton"
                        onClick={() =>
                            navigate(
                                "/recruiter/jobs"
                            )
                        }
                    >

                        <ArrowLeft size={18} />

                        Back to My Jobs

                    </button>


                    <div>

                        <h1>
                            {jobId
                                ? "Job Applicants"
                                : "All Applicants"}
                        </h1>

                        <p>
                            {jobId
                                ? "Applicants who applied for this job"
                                : "Applicants who applied to your job postings"}
                        </p>

                    </div>

                </div>


                <div className="applicantTotal">

                    <User size={20} />

                    <span>
                        {applications.length}
                    </span>

                    <small>
                        {jobId
                            ? "Applicants"
                            : "Total Applicants"}
                    </small>

                </div>

            </div>


            {/* =================================================
                NO APPLICANTS
            ================================================= */}

            {applications.length === 0 ? (

                <div className="noApplicants">

                    <div className="emptyIcon">

                        <User size={45} />

                    </div>


                    <h2>
                        No Applicants Yet
                    </h2>


                    <p>
                        {jobId
                            ? "No one has applied for this job yet."
                            : "Applicants who apply to your jobs will appear here."}
                    </p>

                </div>

            ) : (


                /* =================================================
                   APPLICANT LIST
                ================================================= */

                <div className="applicantsList">

                    {applications.map(
                        applicant => (

                            <div
                                className="applicantCard"
                                key={applicant.id}
                            >


                                {/* TOP */}

                                <div className="applicantTop">


                                    <div className="candidateAvatar">

                                        {applicant.name
                                            ?.charAt(0)
                                            .toUpperCase()}

                                    </div>


                                    <div className="candidateMain">

                                        <h2>

                                            {applicant.name ||
                                                "Candidate"}

                                        </h2>


                                        <p>

                                            Applied for:
                                            {" "}

                                            <strong>
                                                {applicant.jobTitle ||
                                                    "Job"}
                                            </strong>

                                        </p>

                                    </div>


                                    <span
                                        className={
                                            `applicationStatus ${
                                                applicant.status
                                                    ?.toLowerCase()
                                            }`
                                        }
                                    >

                                        {applicant.status ||
                                            "Pending"}

                                    </span>

                                </div>


                                {/* JOB */}

                                <div className="appliedJob">

                                    <BriefcaseBusiness
                                        size={17}
                                    />

                                    <span>
                                        {applicant.jobTitle}
                                    </span>

                                    {applicant.company && (

                                        <>

                                            <span>
                                                •
                                            </span>

                                            <span>
                                                {applicant.company}
                                            </span>

                                        </>

                                    )}

                                </div>


                                {/* DETAILS */}

                                <div className="candidateDetails">


                                    <div className="detailItem">

                                        <Mail size={17} />

                                        <span>
                                            {applicant.email ||
                                                "Not provided"}
                                        </span>

                                    </div>


                                    <div className="detailItem">

                                        <Phone size={17} />

                                        <span>
                                            {applicant.phone ||
                                                "Not provided"}
                                        </span>

                                    </div>


                                    <div className="detailItem">

                                        <MapPin size={17} />

                                        <span>
                                            {applicant.location ||
                                                "Not provided"}
                                        </span>

                                    </div>


                                    <div className="detailItem">

                                        <GraduationCap
                                            size={17}
                                        />

                                        <span>
                                            {applicant.qualification ||
                                                "Not provided"}
                                        </span>

                                    </div>

                                </div>


                                {/* EXPERIENCE */}

                                <div className="experienceBox">

                                    <BriefcaseBusiness
                                        size={17}
                                    />

                                    <div>

                                        <strong>
                                            Experience
                                        </strong>

                                        <p>
                                            {applicant.experience ||
                                                "Not provided"}
                                        </p>

                                    </div>

                                </div>


                                {/* ACTIONS */}

                                <div className="applicantActions">


                                    <button
                                        className="detailsButton"
                                        onClick={() =>
                                            handleViewDetails(
                                                applicant
                                            )
                                        }
                                    >

                                        <Eye size={17} />

                                        View Details

                                    </button>


                                    <div className="decisionButtons">


                                        <button
                                            className="acceptButton"
                                            disabled={
                                                updatingId ===
                                                    applicant.id ||
                                                applicant.status ===
                                                    "Accepted"
                                            }
                                            onClick={() =>
                                                updateStatus(
                                                    applicant.id,
                                                    "Accepted"
                                                )
                                            }
                                        >

                                            <Check size={17} />

                                            {applicant.status ===
                                            "Accepted"
                                                ? "Accepted"
                                                : "Accept"}

                                        </button>


                                        <button
                                            className="rejectButton"
                                            disabled={
                                                updatingId ===
                                                    applicant.id ||
                                                applicant.status ===
                                                    "Rejected"
                                            }
                                            onClick={() =>
                                                updateStatus(
                                                    applicant.id,
                                                    "Rejected"
                                                )
                                            }
                                        >

                                            <X size={17} />

                                            {applicant.status ===
                                            "Rejected"
                                                ? "Rejected"
                                                : "Reject"}

                                        </button>

                                    </div>

                                </div>

                            </div>
                        )
                    )}

                </div>
            )}


            {/* =================================================
                DETAILS MODAL
            ================================================= */}

            {selectedApplicant && (

                <div
                    className="detailsOverlay"
                    onClick={() =>
                        setSelectedApplicant(null)
                    }
                >

                    <div
                        className="detailsModal"
                        onClick={e =>
                            e.stopPropagation()
                        }
                    >


                        {/* HEADER */}

                        <div className="modalHeader">

                            <div className="modalAvatar">

                                {selectedApplicant.name
                                    ?.charAt(0)
                                    .toUpperCase()}

                            </div>


                            <div className="modalTitle">

                                <h2>
                                    {selectedApplicant.name}
                                </h2>

                                <p>
                                    Applied for{" "}
                                    <strong>
                                        {selectedApplicant.jobTitle}
                                    </strong>
                                </p>

                            </div>


                            <button
                                className="closeModal"
                                onClick={() =>
                                    setSelectedApplicant(
                                        null
                                    )
                                }
                            >

                                <X size={22} />

                            </button>

                        </div>


                        {/* BODY */}

                        <div className="modalBody">


                            {/* CONTACT */}

                            <div className="modalSection">

                                <h3>
                                    Contact Information
                                </h3>


                                <div className="modalGrid">


                                    <div className="modalDetail">

                                        <Mail size={18} />

                                        <div>

                                            <label>
                                                Email
                                            </label>

                                            <span>
                                                {selectedApplicant.email ||
                                                    "Not provided"}
                                            </span>

                                        </div>

                                    </div>


                                    <div className="modalDetail">

                                        <Phone size={18} />

                                        <div>

                                            <label>
                                                Phone
                                            </label>

                                            <span>
                                                {selectedApplicant.phone ||
                                                    "Not provided"}
                                            </span>

                                        </div>

                                    </div>


                                    <div className="modalDetail">

                                        <MapPin size={18} />

                                        <div>

                                            <label>
                                                Location
                                            </label>

                                            <span>
                                                {selectedApplicant.location ||
                                                    "Not provided"}
                                            </span>

                                        </div>

                                    </div>


                                    <div className="modalDetail">

                                        <GraduationCap size={18} />

                                        <div>

                                            <label>
                                                Qualification
                                            </label>

                                            <span>
                                                {selectedApplicant.qualification ||
                                                    "Not provided"}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* PROFESSIONAL */}

                            <div className="modalSection">

                                <h3>
                                    Professional Details
                                </h3>


                                <div className="fullDetail">

                                    <BriefcaseBusiness
                                        size={18}
                                    />

                                    <div>

                                        <label>
                                            Experience
                                        </label>

                                        <p>
                                            {selectedApplicant.experience ||
                                                "Not provided"}
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* MESSAGE */}

                            <div className="modalSection">

                                <h3>
                                    Candidate Message
                                </h3>


                                <div className="messageBox">

                                    <MessageSquare
                                        size={18}
                                    />

                                    <p>
                                        {selectedApplicant.message ||
                                            "No message provided"}
                                    </p>

                                </div>

                            </div>


                            {/* RESUME */}

                            {selectedApplicant.resumeLink && (

                                <div className="modalSection">

                                    <h3>
                                        Resume
                                    </h3>


                                    <a
                                        href={
                                            selectedApplicant.resumeLink
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="resumeButton"
                                    >

                                        <FileText size={18} />

                                        View Resume

                                    </a>

                                </div>

                            )}

                        </div>


                        {/* FOOTER */}

                        <div className="modalFooter">


                            <span
                                className={
                                    `modalStatus ${
                                        selectedApplicant.status
                                            ?.toLowerCase()
                                    }`
                                }
                            >

                                {selectedApplicant.status ||
                                    "Pending"}

                            </span>


                            <div>

                                <button
                                    className="acceptButton"
                                    disabled={
                                        updatingId ===
                                            selectedApplicant.id ||
                                        selectedApplicant.status ===
                                            "Accepted"
                                    }
                                    onClick={() =>
                                        updateStatus(
                                            selectedApplicant.id,
                                            "Accepted"
                                        )
                                    }
                                >

                                    <Check size={17} />

                                    {selectedApplicant.status ===
                                    "Accepted"
                                        ? "Accepted"
                                        : "Accept"}

                                </button>


                                <button
                                    className="rejectButton"
                                    disabled={
                                        updatingId ===
                                            selectedApplicant.id ||
                                        selectedApplicant.status ===
                                            "Rejected"
                                    }
                                    onClick={() =>
                                        updateStatus(
                                            selectedApplicant.id,
                                            "Rejected"
                                        )
                                    }
                                >

                                    <X size={17} />

                                    {selectedApplicant.status ===
                                    "Rejected"
                                        ? "Rejected"
                                        : "Reject"}

                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}


export default RecruiterApplicants;