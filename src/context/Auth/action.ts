import { Types } from "./type";
import { Dispatch } from "react";
import { DispatchAuth } from "./interface/context";
import { AuthPayload } from "./interface/auth";

export const signIn =
  (dispatch: Dispatch<DispatchAuth>) =>
  async (payload: AuthPayload[Types.SingIn]) => {
    try {
      const token = {
        accesstoken: payload.token.accesstoken || "",
        rtoken: payload.token.rtoken || "",
      };
      const userInfo = payload.userInfo;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      dispatch({
        type: Types.SingIn,
        payload: { token, userInfo },
      });
    } catch (error) {
      console.log("error", error);
    }
  };

export const onReLoad = (dispatch: Dispatch<DispatchAuth>) => async () => {};

export const signOut = (dispatch: Dispatch<DispatchAuth>) => async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  dispatch({
    type: Types.SingOut,
    payload: {
      token: {
        accesstoken: "",
        rtoken: "",
      },
      userInfo: {
        uuid: "",
        email: "",
        role: "",
      },
    },
  });
};
