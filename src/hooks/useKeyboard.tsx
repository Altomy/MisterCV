/** useKeyboard.tsx */

// ========== Imports ========== //
import React, { useState, useEffect } from "react";
import { Keyboard } from "react-native";

// ========== propsTypes ========== //

/** MainFunction */
let useKeyboard = () => {
  /** @kind: Props */
  let [keyboardStatus, setKeyboardStatus] = React.useState(false);

  /** @kind: Hooks */
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return [keyboardStatus, setKeyboardStatus];
  /** @kind: Methods */
};

export default useKeyboard;
