export const ApiPaths = {
  // adminLogin: '/manage/login',//管理员登录 后台
  login: '/user/login',//用户登录 前台
  userRegister: '/user/register',//用户注册 前台
  userInfo: '/user/getInfo',//获取指定用户信息 前台
  // getUserList: '/user/all',//获取所有用户列表 后台
  // deleteUser: '/user/delete',//删除用户账号 后台
  updateUser: '/user/change',//修改用户信息 前台

  // createRoom: '/room/add',//添加房间 后台
  // deleteRoom: '/room/delete',//删除房间 后台
  // getRoomList: '/room/roomlist',//获取所有房间列表 后台
  // getRoomDetail: '/room/roomDetail',//根据_id获取房间详情 后台
  addComment: '/room/comment',//添加房间评论 前台
  // deleteComment: '/room/deleteComment',//删除房间评论 后台

  createOrder: '/order/create',//生成订单 前台
  updateRoomDate: '/order/updateRoomDate',//更新订单房间时间 前台
  searchOrder: '/user/order',//用户查询订单 前台
  cancelOrder: '/user/cancelOrder',//用户取消订单 前台
  freeRoom: '/user/freeRoom',//用户取消房间订单后,释放房间 前台
  payOrder: '/user/payOrder',//用户支付订单，修改订单状态 前台
  // getOrderList: '/order/list',//获取所有订单列表 后台
  // checkRoom: '/user/checkRoom',//管理员确认订单,修改订单状态 后台
}