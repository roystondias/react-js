import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import style from "./JobsListing.module.css"
import LocationCityIcon from '@mui/icons-material/LocationCity';

function JobsListing(props) {
    const [jobData, setjobData] = useState([]);
    const URL = `https://demo.jobsoid.com/api/v1/jobs?loc=${props.location}&dept=${props.department}&fun=${props.function}`;
    useEffect(() => {
        fetch(URL).then((data) => data.json()).then((response) => setjobData(response));
    }, [URL])

    return (
        <div>
            <div className={style.container}>
                <h3>Department</h3>

                {jobData.map((Element) => {
                    return <div>
                        <div className={style.underline}></div>
                        <div className={style.jobCard}>
                            <span className={style.jobHeading}>{Element.title} </span><br></br>
                            <LocationCityIcon></LocationCityIcon><span>{Element.location.city}</span>
                            <span>{Element.type}</span>
                            <a href={Element.applyUrl} >Apply</a>
                            <a href="#">View</a>
                        </div>
                    </div>
                })}

            </div>
        </div>
    )
}

export default JobsListing