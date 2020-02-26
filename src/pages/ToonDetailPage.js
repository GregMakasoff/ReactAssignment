import React, { useState, useEffect } from 'react';
//import toons from './toons';
import ToonList from '../components/ToonList'
import NotFoundPage from '../components/NotFoundPage';
import VoteSection from '../components/VotesSection';

const ToonDetailPage = ({ match }) => {
    // JS Code
    const id = match.params.id;

    // const person = toons.find(
    //     data => data.id == id
    // );

    const [toonInfo, setToonInfo] = useState({
        votes: 0,
        id: 0,
        occupation: '',
        gender: '',
        pictureUrl: '',
        firstName: '',
        lastName: ''
    });

    // this is where you change the state
    useEffect(() => {
        // it is here that you set toonInfo data
        //setToonInfo({ votes: Math.ceil(Math.random() * 10) });
        const fetchData = async () => {
            const result = await fetch(`http://data.vncvr.ca/api/people/${id}`);
            const body = await result.json();
            setToonInfo(body);
        }
        fetchData();
    }, [id]);

    console.log(toonInfo);

    //if (!person) return <h1>Person does not exist!</h1>
    if (!toonInfo) return <NotFoundPage />

    // markup
    return (
        <React.Fragment>
            <h4 className="text-info">{toonInfo.id}. {toonInfo.firstName} {toonInfo.lastName}</h4>
            <VoteSection id={toonInfo.id} votes={toonInfo.votes} setToonInfo={setToonInfo} />
            <table style={{ "width": "90%", "margin": "auto" }}>
                <tbody>
                    <tr>
                        <td style={{ "width": "15%", "verticalAlign": "top" }}>
                            <img className="rounded img-responsive pull-right img-thumbnail float-left"
                                style={{ "width": "50%" }}
                                src={`${toonInfo.pictureUrl}`} alt={`${toonInfo.firstName} ${toonInfo.lastName}`} />
                        </td>
                        <td style={{ "width": "65%", "verticalAlign": "top" }}>
                            <p><b>Occupation: </b>{toonInfo.occupation}</p>
                            <p><b>Gender: </b>{toonInfo.gender}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </React.Fragment>
    );
}
export default ToonDetailPage;
