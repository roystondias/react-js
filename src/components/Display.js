import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './Display.module.css'

function Display() {
    const [jobDetails, setjobDetails] = useState([])
    const [stringConvet, setstringConvet] = useState("");
    const connection = useLocation();
    const jobId = connection.state.jobId;
    const URL = `https://demo.jobsoid.com/api/v1/jobs/${jobId}`;
    console.log(URL);

    useEffect(() => {
        fetch(URL).then((data) => data.json()).then((response) => setjobDetails(response)); 
    }, [URL])

    return (
        <div>
            <h3>{jobDetails.department?jobDetails.department.title:<p></p>} Department At Teknorix Systems Goa</h3>
            <h2>{jobDetails.title}</h2>
            <p>{jobDetails.department?jobDetails.department.title:<p>Department</p>}</p>
            <a href={jobDetails.applyUrl}>Apply</a>
            <hr></hr>
            <div className={styles.flexbox}>
                <div className={styles.flexItem1}>
                    <h3>Looking for {jobDetails.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: jobDetails.description}}></div>
                </div>
                <div className={styles.flexItem2}>box2</div>
            </div>
        </div>
    )
}   

export default Display