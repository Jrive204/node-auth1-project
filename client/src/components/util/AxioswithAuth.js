import Axios from 'axios';
import cookie from 'cookie';

const checkAuth = () => {
  const cookies = cookie.parse(document.cookie);
  if (cookies.loggedin) {
    return true;
  }
  return false;
};

export const axiosWithAuth = () => {
  return Axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      Authorization: checkAuth() === true
    }
  });
};
