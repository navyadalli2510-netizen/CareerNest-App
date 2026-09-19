import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import "./editjob.css";


function EditJob() {

    const { id } = useParams();

    const navigate = useNavigate();

    const token =
        localStorage.getItem("token");


    const [formData, setFormData] = useState({

        title: "",
        company: "",
        location: "",
        type: "",
        description: "",
        requirements: "",
        responsibilities: ""

    });


    const [loading, setLoading] =
        useState(true);


    const [saving, setSaving] =
        useState(false);


    // =====================================================
    // LOAD JOB
    // =====================================================

    useEffect(() => {

        fetchJob();

    }, [id]);


    const fetchJob = async () => {

        try {

            const response =
                await axios.get(
                    `http://localhost:8080/api/jobs/recruiter/${id}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            const job =
                response.data;


            setFormData({

                title:
                    job.title || "",

                company:
                    job.company || "",

                location:
                    job.location || "",

                type:
                    job.type || "",

                description:
                    job.description || "",

                requirements:
                    job.requirements || "",

                responsibilities:
                    job.responsibilities || ""

            });


        } catch (error) {

            console.error(
                "Error loading job:",
                error
            );

            alert(
                "Unable to load job"
            );

            navigate(
                "/recruiter/jobs"
            );

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });
    };


    // =====================================================
    // UPDATE
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);


        try {

            await axios.put(
                `http://localhost:8080/api/jobs/${id}`,

                formData,

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,

                        "Content-Type":
                            "application/json"
                    }
                }
            );


            alert(
                "Job updated successfully!"
            );


            navigate(
                "/recruiter/jobs"
            );


        } catch (error) {

            console.error(
                "Update error:",
                error
            );

            alert(
                "Unable to update job"
            );

        } finally {

            setSaving(false);
        }
    };


    if (loading) {

        return (
            <div className="jobsLoading">
                Loading job...
            </div>
        );
    }


    return (

        <div className="addJobPage">

            <div className="addJobContainer">

                <div className="formHeader">

                    <h1>
                        Update Job
                    </h1>

                    <p>
                        Edit your job posting details
                    </p>

                </div>


                <form
                    onSubmit={handleSubmit}
                >

                    {/* TITLE */}

                    <div className="formGroup">

                        <label>
                            Job Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* COMPANY */}

                    <div className="formGroup">

                        <label>
                            Company
                        </label>

                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* LOCATION */}

                    <div className="formGroup">

                        <label>
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* TYPE */}

                    <div className="formGroup">

                        <label>
                            Job Type
                        </label>

                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Job Type
                            </option>

                            <option value="Full Time">
                                Full Time
                            </option>

                            <option value="Part Time">
                                Part Time
                            </option>

                            <option value="Internship">
                                Internship
                            </option>

                            <option value="Remote">
                                Remote
                            </option>

                        </select>

                    </div>


                    {/* DESCRIPTION */}

                    <div className="formGroup">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            required
                        />

                    </div>


                    {/* REQUIREMENTS */}

                    <div className="formGroup">

                        <label>
                            Requirements
                        </label>

                        <textarea
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleChange}
                            rows="5"
                        />

                    </div>


                    {/* RESPONSIBILITIES */}

                    <div className="formGroup">

                        <label>
                            Responsibilities
                        </label>

                        <textarea
                            name="responsibilities"
                            value={formData.responsibilities}
                            onChange={handleChange}
                            rows="5"
                        />

                    </div>


                    {/* BUTTONS */}

                    <div className="formButtons">

                        <button
                            type="button"
                            className="cancelBtn"
                            onClick={() =>
                                navigate(
                                    "/recruiter/jobs"
                                )
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="submitBtn"
                            disabled={saving}
                        >

                            {saving
                                ? "Updating..."
                                : "Update Job"}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}


export default EditJob;