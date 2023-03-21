import { Types } from "./type";
import { initialValue } from "./initialState";
import { InitialState } from "./interface/auth";
import { DispatchAuth } from "./interface/context";
const reducerState = (
  state = initialValue,
  action: DispatchAuth
): InitialState => {
  switch (action.type) {
    case Types.SingIn:
      return {
        ...state,
        auth: true,
        token: action.payload["token"],
        userInfo: action.payload["userInfo"],
      };
    case Types.SingOut:
      return { ...state, auth: false };
    case Types.RefreshTokens:
      return { ...state };
    default:
      return state;
  }
};

export default reducerState;
