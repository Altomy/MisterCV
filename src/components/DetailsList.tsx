/** MainHeader.tsx */

// ========== Imports ========== //
import React from "react";
import { Box, Text, IBoxProps, ITextProps } from "native-base";

// ========== propsTypes ========== //
export type propsTypes = {
  containerStyles?: IBoxProps;
  headerStyles?: IBoxProps;
  bodyStyles?: IBoxProps;
  title: string;
  list: string[][];
  listStyles?: IBoxProps;
  listTextStyle?: ITextProps;
};

/** MainFunction */
let DetailsList: React.FC<propsTypes> = (props) => {
  /** @kind: Props */

  /** @kind: Hooks */

  /** @kind: Methods */

  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Box {...props.containerStyles}>
      {/* Header */}
      <Box p={1} bgColor={"black"} {...props.headerStyles}>
        <Text color="white" fontSize="md" textAlign={"left"}>
          {props.title}
        </Text>
      </Box>
      <Box borderColor={"black"} borderWidth={1} {...props.bodyStyles}>
        {props.list.map((l, index) => (
          <Box
            key={index}
            p={1}
            pb={2}
            borderBottomColor={"black"}
            borderBottomWidth={1}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            {...props.listStyles}
          >
            {l.map((value, inx) => (
              <Text
                flex={1}
                key={inx}
                textAlign={"left"}
                bold
                {...props.listTextStyle}
              >
                {value}
              </Text>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DetailsList;
