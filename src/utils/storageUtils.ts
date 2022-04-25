import store from 'store'
import { UserInfo } from '@/services/entities'

const USER_INFO = '';

//保存登录的用户信息到本地
export const saveUserInfo = (userInfo: UserInfo) => {
  store.set(USER_INFO, userInfo);
}
//获取登录的本地用户信息
export const getUserInfo = () => store.get(USER_INFO);

//删除登录的本地用户信息
export const deleteUserInfo = () => {
  store.remove(USER_INFO);
}