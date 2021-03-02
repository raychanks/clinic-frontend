import axios from 'axios';

const login = async (email, password) => {
  return axios.post('http://localhost:3001/login', {
    email,
    password,
  });
};

export { login };
