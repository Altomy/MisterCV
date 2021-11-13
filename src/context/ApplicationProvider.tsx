/** ApplicationProvider.tsx */
// ========== Imports ========== //
import React from "react";
import AuthProvider from "./AuthProvider";

// ========== propsTypes ========== //
export type propsTypes = {};

/** MainFunction */
let ApplicationProvider: React.FC<propsTypes> = (props) => {
  // ==== RETURN METHOD ==== //
  return <AuthProvider>{props.children}</AuthProvider>;
};

export default ApplicationProvider;
