//importing neccesary hooks from react
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import style from "./JobsListing.module.css"

//importing link from react router dom for routing to display page
import { Link } from 'react-router-dom'

//importing the Material UI icon 
import LocationCityIcon from '@mui/icons-material/LocationCity';


function JobsListing(props) {
    //using the useState hook
    const [jobData, setjobData] = useState([]);
    const URL = `https://demo.jobsoid.com/api/v1/jobs?loc=${props.location}&dept=${props.department}&fun=${props.function}`;

    //using the useEffect hook for retrieving the data once
    useEffect(() => {
        fetch(URL).then((data) => data.json()).then((response) => setjobData(response));
    }, [URL])
    return (
        <div>
            <div className={style.container}>
                <h3>Job Openings</h3>
                {jobData.length === 0 ? <h4>Sorry!!! There Are No Job Openings</h4> : jobData.map((Element) => {
                    return <div key={Element.id}>
                        <div className={style.underline}></div>
                        <div className={style.jobCard}>
                            <span className={style.jobHeading} >{Element.title} </span><br></br>
                            <LocationCityIcon></LocationCityIcon><span className={style.jobLocation}>{Element.location.city}</span>
                            <Link className={style.view} to="/display" state={{ jobId: Element.id, department: Element.department || 0 }}>View</Link>
                            <a className={style.apply} href={Element.applyUrl} >Apply</a>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default JobsListing