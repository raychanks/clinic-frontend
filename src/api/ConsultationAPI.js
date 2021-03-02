import { protectedAxios } from './common';

const getAll = async ({ page = 1, pageSize = 10 }) => {
  const axios = await protectedAxios();

  return axios.get('/consultations', {
    params: {
      page,
      pageSize,
    },
  });
};

export { getAll };
