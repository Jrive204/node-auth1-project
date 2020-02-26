import React from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const { push } = useHistory();
  return (
    <div>
      <p
        style={{
          textAlign: 'center',
          textDecoration: 'underline',
          cursor: 'pointer'
        }}
        onClick={() => {
          Axios.get('http://localhost:5000/api/auth/logout', {
            withCredentials: true
          }).then(response => {
            push('/');
            console.log(response);
          });
        }}>
        Logout
        <span onClick={() => push('/users')} style={{ marginLeft: '3%' }}>
          Users
        </span>
      </p>
    </div>
  );
};

export default Header;
