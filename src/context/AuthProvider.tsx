/**
 * AuthProvider.tsx
 */
import React, { useContext, useReducer, createContext } from "react";

// ==================== Contexts ==================== //

// ========== States Models ========== //
type DefaultT = {
  user: UserInterface;
  isAuth: boolean;
};

// ========== Initial States ========== //
let defaultValue: DefaultT = {
  user: {
    name: "",
    phone: 0,
  },
  isAuth: true,
};

// ========== Actions ========== //
type UserAction = { type: "setUser"; payload: UserInterface };
type IsAuthAction = { type: "setIsAuth"; payload: boolean };
type Actions = UserAction | IsAuthAction;

// ========== ReducersFunction ========== //
function reducerFunction(state: DefaultT, action: Actions) {
  switch (action.type) {
    case "setUser":
      return { ...state, user: action.payload };
    case "setIsAuth":
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
}

// ========== Context Creator ========== //
const Context = createContext<
  { Auth: DefaultT; dispatchAuth: (action: Actions) => void } | undefined
>(undefined);

// ========== DefaultFunction ========== //
let AuthProvider: React.FC = ({ children }) => {
  let [Auth, dispatchAuth] = useReducer(reducerFunction, defaultValue);

  // ========== return ========== //
  return (
    <Context.Provider value={{ Auth, dispatchAuth }}>
      {children}
    </Context.Provider>
  );
};

// ========== CustomsHooks ========== //
export function useAuth() {
  const context = useContext(Context);
  if (context === undefined) throw new Error("Must used in the AuthContext");
  return context;
}

export default AuthProvider;
