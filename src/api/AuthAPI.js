import { publicAxios } from './common';

const login = async (email, password) => {
  return publicAxios.post('/login', {
    email,
    password,
  });
};

const register = async ({
  email,
  password,
  clinicName,
  phoneNumber,
  address,
}) => {
  return publicAxios.post('/register', {
    name: clinicName,
    email,
    password,
    phoneNumber,
    address,
  });
};

const verify = async token => {
  return publicAxios.get('/auth/verify', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { login, register, verify };
