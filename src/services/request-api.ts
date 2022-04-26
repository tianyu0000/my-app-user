import { get, post, del, put } from "./request";
import { EmailApi, OrderApi, OrderInfo, RoomApi, UserApi, UserInfo } from './entities'
import { ApiPaths } from "./api-path";

export const ServicesApi = {

  //用户登录
  Login: (data: UserApi.Login.loginInfo): Promise<UserApi.Login.ResponseData> => post(ApiPaths.login, data),

  //用户注册
  Register: (data: UserApi.register.registerUserInfo): Promise<UserApi.register.ResponseData> => post(ApiPaths.userRegister, data),

  //获取指定name用户信息
  getUserInfoByName: (data: UserApi.getUserInfoByName.UserName): Promise<UserInfo> => get(ApiPaths.userInfo, data),

  //修改用户信息
  ChangeUserInfo: (data: UserApi.changeInfo.changeData): Promise<UserApi.changeInfo.ResponseData> => post(ApiPaths.updateUser, data),

  //根据用户id获取订单
  getOrdersByUserId: (data: OrderApi.orderId.searchByUserId): Promise<OrderInfo[]> => get(ApiPaths.searchOrder, data),

  //反馈发送Email
  sendEmail: (data: EmailApi.emailForm.info): Promise<EmailApi.emailForm.ResponseData> => post(ApiPaths.sendEmail, data)
}
