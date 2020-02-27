import React, { useState, useEffect } from 'react';
//import toons from '../pages/toons';
import { Link } from 'react-router-dom';

const ToonList = (param) => {

    const [toonInfo, setToonInfo] = useState({});
    //http://data.vncvr.ca/api/people
    //http://data.vncvr.ca/api/pictures
    //https://api4u.azurewebsites.net/api/people
    //https://api4u.azurewebsites.net/api/pictures
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`https://api4u.azurewebsites.net/api/people`);
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
                    <Link key={key} to={`/detail/${person.id}`} style={{"display": "inline-block", "marginBottom": "25px"}}>
                        <div>{person.id} {person.firstName} {person.lastName}</div> 
                    </Link>
                    <div style={{"float": "right"}}>
                    <Link key={key} to={`/edit/${person.id}`} className="btn btn-primary">Edit</Link>
                    <Link key={key} to={`/del/${person.id}`} className="btn btn-danger">Delete</Link>
                    </div>
                </div>
            ))}
        </>
    )
}
export default ToonList;
