import moment from 'moment';

import { protectedAxios } from './common';

const get = async id => {
  const axios = await protectedAxios();

  return axios.get(`/consultations/${id}`);
};

const getAll = async ({ page, pageSize, from, to } = {}) => {
  const axios = await protectedAxios();

  return axios.get('/consultations', {
    params: {
      page: page || 1,
      pageSize: pageSize || 10,
      from: from || moment().format('DD-MM-YYYY'),
      to: to || moment().format('DD-MM-YYYY'),
    },
  });
};

export { get, getAll };
