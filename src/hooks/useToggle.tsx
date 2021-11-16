import React, { useState } from "react";

type toggleValueType = (value?: boolean) => void;

type useToggleType = (
  booleanValue?: boolean
) => [state: boolean, toggleValue: toggleValueType];

let useToggle: useToggleType = (booleanValue = false) => {
  let [state, setState] = useState(booleanValue);

  let toggleValue: toggleValueType = (value) => {
    setState(value ? value : (oldValue) => !oldValue);
  };

  return [state, toggleValue];
};

export default useToggle;
