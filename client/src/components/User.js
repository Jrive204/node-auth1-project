import React, { useEffect, useState } from 'react';
import { Card, CardTitle } from 'reactstrap';
import { axiosWithAuth } from './util/AxioswithAuth';

const User = () => {
  const [state, setstate] = useState([]);
  useEffect(() => {
    axiosWithAuth()
      .get('/users')
      .then(res => setstate(res.data))
      .catch(err => console.log(err.message));
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
      <h1 style={{ width: '100%', textAlign: 'center' }}>UserNames</h1>
      <br />
      <br />
      {state.map(user => (
        <Card
          key={user.id}
          body
          inverse
          style={{ backgroundColor: '#333', borderColor: '#333' }}>
          <CardTitle>
            <h2>{user.username}</h2>
          </CardTitle>
        </Card>
      ))}
    </div>
  );
};

export default User;
