import { Types } from "../type";
import { AuthPayload } from "./auth";

export type CreateContext = {
  dispatch?: () => void;
  _signOut: () => void;
  _onReLoad: () => void;
  _signIn: (payload: AuthPayload[Types.SingIn]) => void;
};
