import { Types } from "../type";

export interface Token {
  accesstoken: string;
  rtoken: string;
}

export interface UserInfo {
  uuid?: string;
  email: string | null;
  role: string;

  [key: string]: any;
}
export interface InitialState {
  auth: boolean;
  token: Token;
  userInfo: UserInfo;
}

export type AuthPayload = {
  [Types.SingIn]: {
    token: Token;
    userInfo: UserInfo;
  };
  [Types.OnReLoad]: null | undefined;
  [Types.SingOut]: { token: Token };
  [Types.RefreshTokens]: { token: Token };
};
