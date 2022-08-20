import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import JobsListing from './JobsListing';
import style from './List.module.css'

function List() {
    const [location, setlocation] = useState([]);
    const [department, setdepartment] = useState([]);
    const [functions, setfunctions] = useState([]);

    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedLocation, setLocation] = useState("")
    const [selectedFunction, setFunction] = useState("")
    useEffect(() => {
        fetch("https://demo.jobsoid.com/api/v1/locations").then((data) => data.json()).then((response) => setlocation(response));
        fetch("https://demo.jobsoid.com/api/v1/departments").then((data) => data.json()).then((response) => setdepartment(response));
        fetch("https://demo.jobsoid.com/api/v1/functions").then((data) => data.json()).then((response) => setfunctions(response));
    }, [])


    const onOptionDepartmentHandler = (event) => {
        setSelectedDepartment(event.target.value);
    }

    const onOptionLocationChangeHandler = (event) => {
        setLocation(event.target.value);
    }

    const onOptionFunctionHandler = (event) => {
        setFunction(event.target.value);
    }
    return (
        <div>
            <div className={style.container}>
                <input placeholder='Search For a Job'></input><br></br><br></br>
                <select onChange={onOptionDepartmentHandler} id="department">
                    <option value="">Department</option>
                    {department.map((Element) => {
                        return <option value={Element.id}>{Element.title}</option>
                    })}
                </select>
                
                <select onChange={onOptionLocationChangeHandler} id="location">
                <option value="">Location</option>
                    {location.map((Element) => {
                        return <option value={Element.id}>{Element.city}</option>
                    })}
                </select>


                <select onChange={onOptionFunctionHandler} id="functions">
                <option value="">Function</option>
                    {functions.map((Element) => {
                        return <option value={Element.id}>{Element.title}</option>
                    })}
                </select>

            </div>
            <div className={style.container__filter}>
                    <h3>Add Filter</h3>
                    {department.map((Element) => {
                        if (Element.id == selectedDepartment) {
                            return <div className={style.filter}>{Element.title}</div>
                        }
                    })}
                    {location.map((Element) => {
                        if (Element.id == selectedLocation) {
                            return <div className={style.filter}>{Element.city}</div>
                        }
                    })}
                    {functions.map((Element) => {
                        if (Element.id == selectedFunction) {
                            return <div className={style.filter}>{Element.title}</div>
                        }
                    })}
                </div>
            <JobsListing department={selectedDepartment || 0} location={selectedLocation || 0} function={selectedFunction||0}></JobsListing>
        </div>
    )
}

export default List