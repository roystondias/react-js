import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import style from "./JobsListing.module.css"
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { Link } from 'react-router-dom'

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
                    console.log(Element.id);
                    return <div>
                        <div className={style.underline}></div>
                        <div className={style.jobCard}>
                                <span className={style.jobHeading} >{Element.title} </span><br></br>
                            <LocationCityIcon></LocationCityIcon><span>{Element.location.city}</span>
                            <span>{Element.type}</span>
                            <a className={style.link} href={Element.applyUrl} >Apply</a>
                            <Link className={style.link} to="/display" state={{ jobId: Element.id }}>View</Link>
                        </div>
                    </div>
                })}

            </div>
        </div>
    )
}

export default JobsListing