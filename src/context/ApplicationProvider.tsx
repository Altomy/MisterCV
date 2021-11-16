/** ApplicationProvider.tsx */
// ========== Imports ========== //
import React from "react";
import AuthProvider from "./AuthProvider";
import CvProvider from "./CvProvider";

// ========== propsTypes ========== //
export type propsTypes = {};

/** MainFunction */
let ApplicationProvider: React.FC<propsTypes> = (props) => {
  // ==== RETURN METHOD ==== //
  return (
    <AuthProvider>
      <CvProvider>{props.children}</CvProvider>
    </AuthProvider>
  );
};

export default ApplicationProvider;
