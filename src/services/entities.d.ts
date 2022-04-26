import { namespace } from "store";

export interface BaseResponse<T = any> {
  status: number,
  message: string,
  data: T;
}

export interface UserInfo {
  isAdmin: Number,
  name: string,
  password: string,
  photo: string,
  userEmail: string,
  userTel: string,
  _id: string,
}

export interface RoomInfo {
  _id: string,
  r_head: string,
  r_imgs: Array,
  r_title: string,
  r_desc: string,
  r_bedrooms: Number,
  r_beds: Number,
  r_wc: Number,
  r_people: Number,
  r_comment: Array,
  r_date: Array,
  r_price: Number,
  r_tag: string,
  r_type: string
}

export interface OrderInfo {
  [x: string]: any;
  _id: string,
  o_id: string,
  o_room_id: string,
  o_roomDate: Array<string>,
  o_user_id: string,
  o_money: Number,
  o_userTel: string,
  o_createDate: string,
  o_state: Number
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
  interface
  namespace getRoomInfo {
    type ResponseData = BaseResponse<RoomInfo>;
  }

  namespace addRoom {
    interface form {
      r_head: string,
      r_imgs: Array,
      r_title: string,
      r_desc: string,
      r_bedrooms: Number,
      r_beds: Number,
      r_wc: Number,
      r_people: Number,
      r_comment: Array,
      r_date: Array,
      r_price: Number,
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
  namespace commentId {
    interface id {
      c_id: string
    }
    type ResponseData = BaseResponse<RoomInfo>;
  }
}

export namespace OrderApi {
  namespace getOrderInfo {
    type ResponseData = BaseResponse<orderInfo>
  }
  namespace orderId {
    interface searchByUserId {
      o_user_id: string
    }
    type ResponseData = BaseResponse<orderInfo>
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