import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './Display.module.css'

function Display() {
    const [jobDetails, setjobDetails] = useState([])
    const [deptOpening, setdeptOpening] = useState([])
    const connection = useLocation();
    const jobId = connection.state.jobId;
    const dept = connection.state.department.id;
    const URL = `https://demo.jobsoid.com/api/v1/jobs/${jobId}`;
    const DEPT_URL = `https://demo.jobsoid.com/api/v1/jobs?dept=${dept}`;
    // console.log(dept);
    useEffect(() => {
        fetch(URL).then((data) => data.json()).then((response) => setjobDetails(response));
        fetch(DEPT_URL).then((data_1) => data_1.json()).then((response_1) => setdeptOpening(response_1));
    }, [URL, DEPT_URL])

    // console.log(deptOpening);
    return (
        <div>
            <h3>{jobDetails.department ? jobDetails.department.title : <p></p>} Department At Teknorix Systems Goa</h3>
            <h2>{jobDetails.title}</h2>
            <p>{jobDetails.department ? jobDetails.department.title : <p>Department</p>}</p>
            <a href={jobDetails.applyUrl}>Apply</a>
            <hr></hr>
            <div className={styles.flexbox}>
                <div className={styles.flexItem1}>
                    <h3>Looking for {jobDetails.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: jobDetails.description }}></div>
                </div>
                <div className={styles.flexItem2}>
                    <div>Other job Opening</div>
                    <div>
                        {deptOpening.slice(0, 5).map((Element,index) => {
                            {/* console.log(Element);
                            console.log(index); */}
                            if (Element.id !== jobDetails.id) {
                                return <div>
                                    <div>{Element.title}</div>
                                    <p>{Element.location.city}</p>
                                </div>
                            }
                            if (index===0) {
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