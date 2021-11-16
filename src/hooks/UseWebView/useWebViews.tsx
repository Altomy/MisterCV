import React from "react";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
let replaceHtmlValues: replaceHtmlValuesType = (
  internalValue,
  valueToChange
) => {
  let [state, setState] = React.useState(internalValue);

  React.useEffect(() => {
    let newValue = `${internalValue}`;

    valueToChange.forEach((target) => {
      newValue = newValue.replace(target.key, target.value);
    });

    setState(newValue);
  }, [internalValue]);

  return [state, setState];
};

let generatePDF: generatePDFType = async (html) => {
  const { uri } = await Print.printToFileAsync({
    html,
  });
  await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
};

let useWebViews: useWebViewTypes = () => {
  return {
    replaceHtmlValues,
    generatePDF,
  };
};

export default useWebViews;
