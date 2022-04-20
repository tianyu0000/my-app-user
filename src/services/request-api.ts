import { get, post, del, put } from "./request";
import { OrderApi, RoomApi, UserApi } from './entities'
import { ApiPaths } from "./api-path";

export const ServicesApi = {

  //用户登录
  Login: (data: UserApi.Login.data): Promise<UserApi.Login.ResponseData> => post(ApiPaths.login, data),



}
