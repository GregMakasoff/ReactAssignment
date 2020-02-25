import React, { useState, useEffect } from 'react';
//import toons from '../pages/toons';
import { Link } from 'react-router-dom';

const ToonList = (param) => {

    const [toonInfo, setToonInfo] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`http://data.vncvr.ca/api/people/`);
            const body = await result.json();
            setToonInfo(body);
        }
        fetchData();
    }, []);

    var others = toonInfo;
    others = Object.values(toonInfo);

    return (
        <>
        <Link to={`/add`} className="btn btn-success">Add</Link>
            {others.map((person, key) => (
                <div>
                    <Link key={key} to={`/detail/${person.id}`}>
                        <h6>{person.id} {person.firstName} {person.lastName}</h6> 
                    </Link>
                    <Link key={key} to={`/edit/${person.id}`} className="btn btn-primary">Edit</Link>
                    <Link key={key} to={`/del/${person.id}`} className="btn btn-danger">Delete</Link>
                </div>
            ))}
        </>
    )
}
export default ToonList;
