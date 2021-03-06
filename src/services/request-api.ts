import { get, post, del, put } from "./request";
import { CommentApi, EmailApi, OrderApi, OrderInfo, RoomApi, RoomInfo, UserApi, UserInfo } from './entities'
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
  getOrdersByUserId: (data: OrderApi.userId.searchByUserId): Promise<OrderInfo[]> => get(ApiPaths.searchOrder, data),

  //反馈发送Email
  sendEmail: (data: EmailApi.emailForm.info): Promise<EmailApi.emailForm.ResponseData> => post(ApiPaths.sendEmail, data),

  //修改订单状态-用户付款
  payOrder: (data: OrderApi.orderId.changeOrderStateByOrderId): Promise<OrderApi.orderId.ResponseData> => post(ApiPaths.payOrder, data),

  //修改订单状态-用户取消订单
  cancelOrder: (data: OrderApi.orderId.changeOrderStateByOrderId): Promise<OrderApi.orderId.ResponseData> => post(ApiPaths.cancelOrder, data),

  //用户取消订单后,清空对应房间id的预订时间
  freeRoomDate: (data: OrderApi.roomId.changeRoomDateByRoomId): Promise<OrderApi.roomId.ResponseData> => post(ApiPaths.freeRoom, data),

  //用户预约房间,生成订单
  createOrder: (data: OrderApi.createOrder.info): Promise<OrderApi.createOrder.ResponseData> => post(ApiPaths.createOrder, data),

  //生成订单之后,更新房间的时间数组:r_date属性,
  updateRoomDate: (data: OrderApi.orderRoomId.changeRoomDateByRoomId): Promise<OrderApi.orderRoomId.ResponseData> => post(ApiPaths.updateRoomDate, data),

  //获取房间列表
  getRoomList: (): Promise<RoomInfo[]> => get(ApiPaths.getRoomList),

  //获取房间信息
  getRoomDetail: (params: RoomApi.roomId.id): Promise<RoomApi.roomId.ResponseData> => get(ApiPaths.getRoomDetail, params),

  //查询该用户是否在当前房间完成过订单,完成过订单才可以进行评论
  hasOrder: (data: OrderApi.hasOrder.info): Promise<OrderApi.hasOrder.ResponseData> => get(ApiPaths.hasOrder, data),

  //添加评论
  addComment: (data: CommentApi.addComment.info): Promise<CommentApi.addComment.ResponseData> => post(ApiPaths.addComment, data),
}
