import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_TOKEN } from '../shared/constants';
import { BASE_URL } from '../config';

export const publicAxios = axios.create({
  baseURL: BASE_URL,
});

export const protectedAxios = async () => {
  const token = await AsyncStorage.getItem(STORAGE_TOKEN);

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
