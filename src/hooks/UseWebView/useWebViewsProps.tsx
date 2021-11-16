type valueToChangeType = {
  key: string;
  value: any;
};
type replaceHtmlValuesType = (
  internalValue: string,
  valueToChange: valueToChangeType[]
) => [string, React.Dispatch<React.SetStateAction<string>>];

type generatePDFType = (html: string) => void;

type useWebViewTypes = () => {
  replaceHtmlValues: replaceHtmlValuesType;
  generatePDF: generatePDFType;
};
