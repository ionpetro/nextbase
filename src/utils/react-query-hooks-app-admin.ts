/* ==================== */
/* ADMIN PANEL */
/* ==================== */

import {
  useQuery,
} from '@tanstack/react-query';
import axios from 'axios';


export const useAdminGetUser = (userId: string) => {
  return useQuery(['appAdminGetUser', userId], async () => {
    const path = `/api/app_admin/get_user/${userId}`;
    const response = await axios.get(path, {
      withCredentials: true,
    });
    return response.data;
  });
};


