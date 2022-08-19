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
                <input placeholder='Search'></input><br></br><br></br>
                <label htmlFor="department"><strong>Department:</strong></label>
                <select onChange={onOptionDepartmentHandler} id="department">
                    {department.map((Element) => {
                        return <option value={Element.id}>{Element.title}</option>
                    })}
                </select>
                
                <label htmlFor="location"><strong>Location:</strong></label>
                <select onChange={onOptionLocationChangeHandler} id="location">
                    {location.map((Element) => {
                        return <option value={Element.id}>{Element.city}</option>
                    })}
                </select>


                <label htmlFor="functions"><strong>Functions:</strong></label>
                <select onChange={onOptionFunctionHandler} id="functions">
                    {functions.map((Element) => {
                        return <option value={Element.id}>{Element.title}</option>
                    })}
                </select>

            </div>
            <div className={style.container__filter}>
                    {department.map((Element) => {
                        if (Element.id == selectedDepartment) {
                            return <div style={{border: "solid 1px black", display:"inline", margin:"20px", padding:"5px"}}>{Element.title}</div>
                        }
                    })}
                    {location.map((Element) => {
                        if (Element.id == selectedLocation) {
                            return <div style={{border: "solid 1px black", display:"inline", margin:"20px", padding:"5px"}}>{Element.city}</div>
                        }
                    })}
                    {functions.map((Element) => {
                        if (Element.id == selectedFunction) {
                            return <div style={{border: "solid 1px black", display:"inline", margin:"20px", padding:"5px"}}>{Element.title}</div>
                        }
                    })}
                </div>
            {/* <JobsListing department={selectedDepartment} location={selectedLocation} function={selectedFunction}></JobsListing> */}
        </div>
    )
}

export default List