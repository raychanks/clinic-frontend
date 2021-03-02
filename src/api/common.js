import axios from 'axios';

import { BASE_URL } from '../config';

export const publicAxios = axios.create({
  baseURL: BASE_URL,
});
