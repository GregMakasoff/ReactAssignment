import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const DeleteToonPage = ({ match }) => {
    const id = match.params.id;
  
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [gender, setGender] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [votes, setVotes] = useState(0);
    const [toonInfo, setToonInfo] = useState('');
    
  
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
  
    return (<React.Fragment>
      <div className="panel panel-default">
        <form>
          <h3 style={{"marginBottom": "20px"}}>Delete toon character</h3>
          <Link to="/" style={{"marginRight": "20px"}} className="btn btn-success">Back</Link>
          <Link to="/" onClick={() => editToon()} className="btn btn-danger">Confirm</Link>
        </form>
      </div>
    </React.Fragment>
    )
  }
export default DeleteToonPage;