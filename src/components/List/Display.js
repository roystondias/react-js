//importing all hook from react
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './Display.module.css'

//importing Material UI icon
import AddLocationIcon from '@mui/icons-material/AddLocation';

function Display() {
    //using the UseState hook
    const [jobDetails, setjobDetails] = useState([])
    const [deptOpening, setdeptOpening] = useState([])
    const connection = useLocation();
    const jobId = connection.state.jobId;
    const dept = connection.state.department.id;

    //End points to hit to get the data
    const URL = `https://demo.jobsoid.com/api/v1/jobs/${jobId}`;
    const DEPT_URL = `https://demo.jobsoid.com/api/v1/jobs?dept=${dept}`;

    //using the useEffect hook for fetching the data
    useEffect(() => {
        fetch(URL).then((data) => data.json()).then((response) => setjobDetails(response));
        fetch(DEPT_URL).then((data) => data.json()).then((response) => setdeptOpening(response));
    }, [URL, DEPT_URL])

    return (
        <div className={styles.container}>
            <h4>{jobDetails.department ? jobDetails.department.title : <p></p>} Department At Teknorix Systems Goa</h4>
            <h1>{jobDetails.title}</h1>
            <p>{jobDetails.department ? jobDetails.department.title : <p>Department</p>}</p>
            <a className={styles.link} href={jobDetails.applyUrl}>Apply</a>
            <hr></hr>
            <div className={styles.flexbox}>
                <div className={styles.flexItem1}>
                    <h3>Looking for {jobDetails.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: jobDetails.description }}></div>
                </div>
                <div className={styles.flexItem2}>
                    <h3>OTHER JOB OPENINGS</h3>
                    <div>
                        {deptOpening.slice(0, 5).map((Element, index) => {
                            if (Element.id !== jobDetails.id) {
                                return <div>
                                    <h4>{Element.title}</h4>
                                    <p><AddLocationIcon></AddLocationIcon>{Element.location.city}</p>
                                </div>
                            }
                            if (index === 0) {
                                return <div>
                                    <div>There are no Other jobs in this department</div>
                                </div>
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Display