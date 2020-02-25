import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const DeleteToonPage = ({ param }) => {
    const id = param.params.id;
  
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
        method: 'delete',
        body: JSON.stringify({
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
          const result = await fetch(`https://api4u.azurewebsites.net/api/people/${id}`);
          const body = await result.json();
          setToonInfo(body);
      }
      fetchData();
  }, [id]);

  useEffect(() => {
    // this is where you get toonInfo data
    const fetchData = async () => {
        const result = await fetch(`https://api4u.azurewebsites.net/api/pictures/`);
        const body = await result.json();
        setToonPic(body);
    }
    fetchData();
    setPictureUrl("https://api4u.azurewebsites.net/images/flintstone/bambam.png"); ///default
  }, []);

  // verifying data
  var picInfos = toonPic;
  if (param != undefined) {
    picInfos = Object.values(toonPic).filter(p => p.name != param.exceptName);
  }

  const changeImg = async (url) => { 
    setPictureUrl(url);
    //document.getElementById("cartoonImg").src = url;
    console.log(url);
  }
  
    return (<React.Fragment>
      <div className="panel panel-default">
        <form>
          <h3>Delete toon character</h3>
          <div className="form-group">
            <label>First Name:</label>
            <input className="form-control" type="text" placeholder="First Name"
              value={toonInfo.firstName} onChange={(event) => setFirstName(event.target.value)} />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input className="form-control" type="text" placeholder="Last Name"
              value={toonInfo.lastName} onChange={(event) => setLastName(event.target.value)} />
          </div>
          <div className="form-group">
            <label>Occupation:</label>
            <input className="form-control" type="text" placeholder="Occupation"
              value={toonInfo.occupation} onChange={(event) => setOccupation(event.target.value)} />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <input className="form-control" type="text" placeholder="Gender"
              value={toonInfo.gender} onChange={(event) => setGender(event.target.value)} />
          </div>
          <div className="form-group">
            <label>Picture URL:</label>
            <select style={{"marginTop": "45px", "marginLeft": "10px"}} defaultValue="https://api4u.azurewebsites.net/images/flintstone/bambam.png" 
            onChange={(event) => changeImg(event.target.value)}>
            {picInfos.map(instance => (
            <option value={instance.url}>{instance.name}</option>
          ))}
        </select>
          </div>
          <Link to="/" onClick={() => editToon()} className="btn btn-danger">Confirm</Link>
        </form>
      </div>
    </React.Fragment>
    )
  }
export default DeleteToonPage;