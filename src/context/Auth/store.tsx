import { useReducer, useContext, createContext } from "react";

import { initialValue } from "./initialState";
import { InitialState } from "./interface/auth";
import { CreateContext } from "./interface/action";
import { signIn, signOut, onReLoad } from "./action";
import Reducer from "./reducer";
const StateContext = createContext<InitialState>(initialValue);
const DispatchContext = createContext<CreateContext>({
  dispatch: () => null,
  _signIn: () => null,
  _onReLoad: () => null,
  _signOut: () => null,
});

const AuthContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, dispatch] = useReducer(Reducer, initialValue);
  const DispatchValue: CreateContext = {
    _signIn: signIn(dispatch),
    _signOut: signOut(dispatch),
    _onReLoad: onReLoad(dispatch),
  };
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={DispatchValue}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useAuthContextState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useSpinState must be used within a SpinProvider");
  }
  return context;
};

const useAuthContextDispatch = () => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error("useSpinDispatch must be used within a SpinProvider");
  }
  return context;
};

export { AuthContextProvider, useAuthContextDispatch, useAuthContextState };
