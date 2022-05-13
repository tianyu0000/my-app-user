import { namespace } from "store";

export interface BaseResponse<T = any> {
  status: number,
  message: string,
  data: T;
}

export interface UserInfo {
  isAdmin: number,
  name: string,
  password: string,
  photo: string,
  userEmail: string,
  userTel: string,
  _id: string,
}

export interface RoomInfo {
  _id: string,
  r_photo: string,
  r_imgs: string[],
  r_title: string,
  r_desc: string,
  r_bedrooms: number,
  r_beds: number,
  r_wc: number,
  r_people: number,
  r_comment: Array<any>,
  r_date: any[],
  r_price: number,
  r_tag: string,
  r_type: string
}

export interface OrderInfo {
  [x: string]: any;
  _id: string,
  o_id: string,
  o_room_id: string,
  o_roomDate_start: string,
  o_roomDate_end: string,
  o_room_title:string,
  o_user_id: string,
  o_price: number,
  o_total:number,
  o_userTel: string,
  o_createDate: string,
  o_state: number,
  o_user_name: string,
}

export interface CommentInfo {
  _id: string,
  photo?: string,
  id: string,
  name: string,
  comment_date: string,
  comment_content: string,
  isHideName: string
}

export interface OrderDataResponse<T = any> {
  status: number,
  [data: T],
  msg: string
}

export interface RoomDataResponse<T = any> {
  data: T,
}

export interface Date {
  date_start: string,
  date_end: string
}

export namespace UserApi {
  namespace Login {
    interface loginInfo {
      name: string,
      password: string
    }
    type ResponseData = BaseResponse<UserInfo>;
  }

  namespace getUserInfoByName {
    interface UserName {
      name: string,
    }
    type ResponseData = BaseResponse<UserInfo>;
  }

  namespace register {
    interface registerUserInfo {
      name: string,
      password: string,
      photo: string,
      userEmail: string,
      userTel: string,
    }
    type ResponseData = BaseResponse<UserInfo>;
  }
  namespace changeInfo {
    interface changeData {
      name: string,
      password?: string,
      photo?: string,
      userEmail?: string,
      userTel?: string,
    }
    type ResponseData = BaseResponse<UserInfo>;
  }

  namespace userId {
    interface id {
      _id: string
    }
    type ResponseData = BaseResponse<UserInfo>;
  }
}

export namespace RoomApi {
  namespace getRoomList {
    type ResponseData = RoomDataResponse<RoomInfo>;
  }

  namespace addRoom {
    interface form {
      r_photo: string,
      r_imgs: Array,
      r_title: string,
      r_desc: string,
      r_bedrooms: number,
      r_beds: number,
      r_wc: number,
      r_people: number,
      r_comment: Array,
      r_date: Array,
      r_price: number,
      r_tag: string,
      r_type: string
    }
    type ResponseData = BaseResponse<RoomInfo>;
  }
  namespace roomId {
    interface id {
      _id: string
    }
    type ResponseData = BaseResponse<RoomInfo>;
  }
}

export namespace OrderApi {

  namespace userId {
    interface searchByUserId {
      o_user_id: string
    }
    type ResponseData = BaseResponse<OrderInfo>
  }
  namespace orderId {
    interface changeOrderStateByOrderId {
      o_id: string
    }
    type ResponseData = OrderDataResponse<OrderInfo>
  }
  namespace roomId {
    interface changeRoomDateByRoomId {
      o_room_id: string,
      o_roomDate_start: string,
      o_roomDate_end: string
    }
    type ResponseData = OrderDataResponse<OrderInfo>;
  }
  namespace orderRoomId {
    interface changeRoomDateByRoomId {
      o_room_id: string,
      o_roomDate_start: string,
      o_roomDate_end: string
    }
    type ResponseData = BaseResponse<OrderInfo>
  }
  namespace createOrder {
    interface info {
      o_id: string,
      o_room_id: string,
      o_roomDate_start: string,
      o_roomDate_end: string,
      o_user_id: string,
      o_price: number,
      o_userTel: string,
      o_createDate: string,
      o_user_name: string,
      o_room_title: string,
      o_day:number,
      o_total:number,
    }
    type ResponseData = BaseResponse<OrderInfo>
  }
  namespace hasOrder {
    interface info {
      o_room_id: string,
      o_user_id: string,
    }
    type ResponseData = BaseResponse<OrderInfo>
  }
}


export namespace EmailApi {
  namespace emailForm {
    interface info {
      o_id: string,
      o_room_id: string,
      username: string,
      address: string,
      content: string
    }
    type ResponseData = BaseResponse<string>
  }
}

export namespace CommentApi {
  namespace addComment {
    interface info {
      _id: string
      photo?: string,
      id: string,
      name: string,
      comment_date: string,
      comment_content: string,
      isHideName: boolean
    }
    type ResponseData = BaseResponse<string>
  }
}