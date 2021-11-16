/**
 * CvProvider.tsx
 */
import React, { useContext, useReducer, createContext } from "react";

// ==================== Contexts ==================== //

// ========== States Models ========== //
type DefaultT = {
  cv: CvModel;
};

// ========== Initial States ========== //
let defaultValue: DefaultT = {
  cv: {
    title: "",
    ID: "new",
    CreatedAt: new Date(),
    cvLanguage: "en",
  },
};

// ========== Actions ========== //
type CvAction = { type: "setCv"; payload: CvModel };
type Actions = CvAction;

// ========== ReducersFunction ========== //
function reducerFunction(state: DefaultT, action: Actions) {
  switch (action.type) {
    case "setCv":
      return { ...state, cv: action.payload };
    default:
      return state;
  }
}

// ========== Context Creator ========== //
const Context = createContext<
  { Cv: DefaultT; dispatchCv: (action: Actions) => void } | undefined
>(undefined);

// ========== DefaultFunction ========== //
let CvProvider: React.FC = ({ children }) => {
  let [Cv, dispatchCv] = useReducer(reducerFunction, defaultValue);

  // ========== return ========== //
  return (
    <Context.Provider value={{ Cv, dispatchCv }}>{children}</Context.Provider>
  );
};

// ========== CustomsHooks ========== //
export function useCv() {
  const context = useContext(Context);
  if (context === undefined) throw new Error("Must used in the CvContext");
  return context;
}

export default CvProvider;
