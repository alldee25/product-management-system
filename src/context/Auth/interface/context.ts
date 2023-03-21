import { AuthPayload} from './auth';
import { InitialState } from './auth'

type DispatchMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined ? {type: Key;}: {type: Key;payload: M[Key]; }
};
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined ? {type: Key;}: {type: Key;payload: M[Key]; }
};

export type DispatchAuth = DispatchMap<AuthPayload>[keyof ActionMap<AuthPayload>]


export interface SystemState {
  type: string;
  payload: InitialState;
}
