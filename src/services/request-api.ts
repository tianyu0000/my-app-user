import { get, post, del, put } from "./request";
import { OrderApi, RoomApi, UserApi, UserInfo } from './entities'
import { ApiPaths } from "./api-path";

export const ServicesApi = {

  //用户登录
  Login: (data: UserApi.Login.loginInfo): Promise<UserApi.Login.ResponseData> => post(ApiPaths.login, data),

  //用户注册
  Register: (data: UserApi.register.registerUserInfo): Promise<UserApi.register.ResponseData> => post(ApiPaths.userRegister, data),

}
