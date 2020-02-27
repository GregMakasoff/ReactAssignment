import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EditToonPage = ({ match }) => {
    const id = Number(match.params.id);
  
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [gender, setGender] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [votes, setVotes] = useState(0);
    const [toonInfo, setToonInfo] = useState('');
    const [toonPic, setToonPic] = useState({});
  
    const editToon = async () => {
      const result = await fetch(`https://api4u.azurewebsites.net/api/people/${id}`, {
        method: 'put',
        body: JSON.stringify({
          id,
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
      //const body = await result.json();
      window.location.reload(false);
    }

  useEffect(() => {
    // this is where you get toonInfo data
    const fetchPics = async () => {
        const result = await fetch(`https://api4u.azurewebsites.net/api/pictures/`);
        const body = await result.json();
        setToonPic(body);
    }
    fetchPics();
    const fetchData = async () => {
      const result = await fetch(`https://api4u.azurewebsites.net/api/people/${id}`);
      const body = await result.json();
      setToonInfo(body);
      setFirstName(body.firstName);
      setLastName(body.lastName);
      setOccupation(body.occupation);
      setGender(body.gender);
      setPictureUrl(body.pictureUrl);
    }
    fetchData();
  }, [id]);

  // verifying data
  var picInfos = toonPic;
  if (match != undefined) {
    picInfos = Object.values(toonPic).filter(p => p.name != match.exceptName);
  }
  
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
            <select id="gender" onChange={(event) => setGender(event.target.value)}>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          </div>
          <div className="form-group">
            <label>Picture URL:</label>
            <select style={{"marginTop": "15px", "marginLeft": "10px"}} defaultValue={toonInfo.pictureUrl} 
            onChange={(event) => setPictureUrl(event.target.value)}>
            {picInfos.map(instance => (
                <option value={instance.url}>{instance.name}</option>
            ))}
            </select>
          </div>
          <Link to="/" onClick={() => editToon()} className="btn btn-primary">Confirm</Link>
        </form>
      </div>
    </React.Fragment>
    )
  }
export default EditToonPage;