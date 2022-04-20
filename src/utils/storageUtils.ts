import store from 'store'
import { UserInfo } from '@/services/entities'

const USER_INFO = '';

export const saveUserInfo = (userInfo: UserInfo) => {
  store.set(USER_INFO, userInfo);
}

export const getUserInfo = () => store.get(USER_INFO);

export const deleteUserInfo = () => {
  store.remove(USER_INFO);
}