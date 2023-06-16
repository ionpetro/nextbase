import { useQuery } from '@tanstack/react-query';
import { adminGetUser } from '../actions';

export const useAdminViewUserDetails = (userId: string) => {
  return useQuery(['adminGetUser', userId], () => {
    return adminGetUser(userId);
  });
};
