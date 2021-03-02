import { protectedAxios } from './common';

const getAll = async ({ page = 1, pageSize = 10 } = {}) => {
  const axios = await protectedAxios();

  return axios.get('/consultations', {
    params: {
      page: page || 1,
      pageSize: pageSize || 10,
    },
  });
};

export { getAll };
