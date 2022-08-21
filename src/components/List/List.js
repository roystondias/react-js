//importing react and the hooks
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

//importing job listing component
import JobsListing from './JobsListing';
import style from './List.module.css'

//importing material UI icon
import CloseIcon from '@mui/icons-material/Close';

function List() {
    //using the useState hook to set states of the app
    const [location, setlocation] = useState([]);
    const [department, setdepartment] = useState([]);
    const [functions, setfunctions] = useState([]);

    const [selectedDepartment, setDepartment] = useState("");
    const [selectedLocation, setLocation] = useState("")
    const [selectedFunction, setFunction] = useState("")

    const [displayDepartmentFilter, setdisplayDepartmentFilter] = useState(false);
    const [displayLocationFilter, setdisplayLocationFilter] = useState(false);
    const [displayFunctionFilter, setdisplayFunctionFilter] = useState(false);

    //using the useEffect hook to fetch the data once from the API
    useEffect(() => {
        fetch("https://demo.jobsoid.com/api/v1/locations").then((data) => data.json()).then((response) => setlocation(response));
        fetch("https://demo.jobsoid.com/api/v1/departments").then((data) => data.json()).then((response) => setdepartment(response));
        fetch("https://demo.jobsoid.com/api/v1/functions").then((data) => data.json()).then((response) => setfunctions(response));
    }, [])

    //Helper functions for handling states
    const onOptionDepartmentHandler = (event) => {
        setDepartment(event.target.value);
        setdisplayDepartmentFilter(true);
    }

    const onOptionLocationChangeHandler = (event) => {
        setLocation(event.target.value);
        setdisplayLocationFilter(true);
    }

    const onOptionFunctionHandler = (event) => {
        setFunction(event.target.value);
        setdisplayFunctionFilter(true);
    }

    const onDepartmentClose = () => {
        setdisplayDepartmentFilter(false);
        setDepartment("");
    }

    const onLocationClose = () => {
        setdisplayLocationFilter(false);
        setLocation("");
    }

    const onFunctionClose = () => {
        setdisplayFunctionFilter(false);
        setFunction("");
    }

    return (
        <div>
            {/* rendering the drop down using JSX */}
            <div className={style.container}>
                <input placeholder='Search For a Job'></input><br></br><br></br>
                <select onChange={onOptionDepartmentHandler} id="department">
                    <option value="">Department</option>
                    {department.map((Element) => {
                        return <option value={Element.id} key={Element.id}>{Element.title}</option>
                    })}
                </select>

                <select onChange={onOptionLocationChangeHandler} id="location">
                    <option value="">Location</option>
                    {location.map((Element) => {
                        return <option value={Element.id} key={Element.id}>{Element.city}</option>
                    })}
                </select>


                <select onChange={onOptionFunctionHandler} id="functions">
                    <option value="">Function</option>
                    {functions.map((Element) => {
                        return <option value={Element.id} key={Element.id}>{Element.title}</option>
                    })}
                </select>

            </div>

            {/* Rendering the filter section using JSX */}
            <div className={style.container__filter}>
                <h3>Add Filter</h3>
                {displayDepartmentFilter ? department.map((Element) => {
                    if (Element.id == selectedDepartment) {
                        return <div className={style.filter}>{Element.title}<span onClick={onDepartmentClose} className={style.closeIcon}><CloseIcon></CloseIcon></span></div>
                    }
                }) : <p></p>}
                {displayLocationFilter ? location.map((Element) => {
                    if (Element.id == selectedLocation) {
                        return <div className={style.filter}>{Element.city}<span onClick={onLocationClose} className={style.closeIcon}><CloseIcon></CloseIcon></span></div>
                    }
                }) : <p></p>}
                {displayFunctionFilter ? functions.map((Element) => {
                    if (Element.id == selectedFunction) {
                        return <div className={style.filter}>{Element.title}<span onClick={onFunctionClose} className={style.closeIcon}><CloseIcon></CloseIcon></span></div>
                    }
                }) : <p></p>}
            </div>

            {/* paasing data to the next component */}
            <JobsListing department={selectedDepartment || 0} location={selectedLocation || 0} function={selectedFunction || 0}></JobsListing>
        </div>
    )
}

export default List