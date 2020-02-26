import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login_Signup = () => {
  const [state, setstate] = useState('');
  const [user, Setuser] = useState({ username: '', password: '' });
  const [signup, Setsignup] = useState(false);
  const { push } = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    // Axios.get('http://localhost:5000/cookie', { withCredentials: true }).then(
    //   response => {
    //     console.log(response);
    //   }
    // );

    Axios.post('http://localhost:5000/api/auth/login', user)
      .then(
        res =>
          Axios.get('http://localhost:5000/cookie', {
            withCredentials: true
          }).then(response => {
            push('/users');
            console.log(response);
          }) & console.log(res, document.cookie, 'COOKIE')
      )
      .catch(err => console.log(err));
  };
  const handleSubmitSignup = e => {
    e.preventDefault();
    Axios.post('http://localhost:5000/api/auth/register', user)
      .then(
        res =>
          alert('Sign up successful') &
          console.log(res) &
          window.location.reload(false)
      )
      .catch(err => console.log(err));
  };

  const handlechange = e => {
    e.preventDefault();
    Setuser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {console.log(state, 'state')}
      {!signup ? (
        <>
          <h1 style={{ margin: '0 auto', textAlign: 'center' }}>Login </h1>
          <form className='form' onSubmit={handleSubmit}>
            <label>
              {console.log(user)}
              Username:
              <br />
              <input
                name='username'
                type='text'
                value={user.username}
                onChange={handlechange}
              />
            </label>
            <label>
              Password:
              <br />
              <input
                name='password'
                value={user.password}
                type='password'
                onChange={handlechange}
              />
            </label>
            <input type='submit' />
          </form>
          <p style={{ textAlign: 'center' }}>
            Need to sign up?? click {console.log(signup)}
            <span
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => Setsignup(!signup)}>
              Here
            </span>
          </p>
        </>
      ) : (
        <>
          <h1 style={{ margin: '0 auto', textAlign: 'center' }}>SignUp </h1>
          <form className='form' onSubmit={handleSubmitSignup}>
            <label>
              {console.log(user)}
              Username:
              <br />
              <input
                name='username'
                type='text'
                value={user.username}
                onChange={handlechange}
              />
            </label>
            <label>
              Password:
              <br />
              <input
                name='password'
                value={user.password}
                type='password'
                onChange={handlechange}
              />
            </label>
            <input type='submit' />
          </form>
          <p style={{ textAlign: 'center' }}>
            Already have a login ? click {console.log(signup)}
            <span
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => Setsignup(!signup)}>
              Here
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default Login_Signup;
