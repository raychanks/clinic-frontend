import { protectedAxios } from './common';

const get = async id => {
  const axios = await protectedAxios();

  return axios.get(`/consultations/${id}`);
};

const getAll = async ({ page = 1, pageSize = 10 } = {}) => {
  const axios = await protectedAxios();

  return axios.get('/consultations', {
    params: {
      page: page || 1,
      pageSize: pageSize || 10,
    },
  });
};

export { get, getAll };
