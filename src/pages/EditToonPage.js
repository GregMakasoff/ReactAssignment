import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EditToonPage = ({ match }) => {
    const id = match.params.id;
  
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [gender, setGender] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [votes, setVotes] = useState(0);
    const [toonInfo, setToonInfo] = useState('');
    
  
    const editToon = async () => {
      const result = await fetch(`http://data.vncvr.ca/api/people/${id}`, {
        method: 'put',
        body: JSON.stringify({
          id: parseInt(id, 10),
          firstName,
          lastName,
          occupation,
          gender,
          pictureUrl,
          votes
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const body = await result.json();
      window.location.reload(false);
    }
  
    useEffect(() => {
      const fetchData = async () => {
          const result = await fetch(`http://data.vncvr.ca/api/people/${id}`);
          const body = await result.json();
          setToonInfo(body);
      }
      fetchData();
  }, [id]);
  
    return (<React.Fragment>
      <div className="panel panel-default">
        <form>
          <h3>Edit toon character</h3>
          <div className="form-group">
            <label>First Name:</label>
            <input className="form-control" type="text" placeholder="First Name"
              defaultValue={toonInfo.firstName} onChange={(event) => setFirstName(event.target.value)} />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input className="form-control" type="text" placeholder="Last Name"
              defaultValue={toonInfo.lastName} onChange={(event) => setLastName(event.target.value)} />
          </div>
          <div className="form-group">
            <label>Occupation:</label>
            <input className="form-control" type="text" placeholder="Occupation"
            defaultValue={toonInfo.occupation} onChange={(event) => setOccupation(event.target.value)} />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <input className="form-control" type="text" placeholder="Gender"
            defaultValue={toonInfo.gender} onChange={(event) => setGender(event.target.value)} />
          </div>
          <div className="form-group">
            <label>Picture URL:</label>
            <input className="form-control" type="text" placeholder="Picture URL"
            defaultValue={toonInfo.pictureUrl} onChange={(event) => setPictureUrl(event.target.value)} />
          </div>
          <Link to="/" onClick={() => editToon()} className="btn btn-primary">Confirm</Link>
        </form>
      </div>
    </React.Fragment>
    )
  }
export default EditToonPage;