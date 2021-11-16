import React, { useState, useEffect } from "react";

type useShowType = (
  booleanValue?: boolean,
  time?: number
) => [state: boolean, toggleValue: () => void];

let useShow: useShowType = (booleanValue = false, time = 1000) => {
  let [state, setState] = useState(booleanValue);

  let toggleValue = () => {
    setState((oldValue) => !oldValue);
  };

  useEffect(() => {
    setTimeout(() => {
      setState((oldValue) => !oldValue);
    }, time);
  }, []);

  return [state, toggleValue];
};

export default useShow;
