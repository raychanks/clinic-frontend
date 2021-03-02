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

export { login, register };
