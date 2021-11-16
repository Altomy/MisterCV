/** MainHeader.tsx */

// ========== Imports ========== //
import React, { useEffect, ReactNode } from "react";
import { useWindowDimensions } from "react-native";
import { Box, Text, IBoxProps, ScrollView, ITextProps } from "native-base";
import { ResponsiveValue } from "native-base/lib/typescript/components/types";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

let AnimatedBox = Animated.createAnimatedComponent<IBoxProps>(Box);
// ========== propsTypes ========== //

export type colsType = {
  element: string | ReactNode;
  width?: ResponsiveValue<any>;
}[][];

export type propsTypes = {
  containerStyles?: IBoxProps;
  tablesStyles?: IBoxProps;
  headerContainerStyles?: IBoxProps;
  headerBoxStyles?: IBoxProps;
  colBoxStyles?: IBoxProps;
  colTextStyles?: ITextProps;
  headerTextStyles?: ITextProps;
  headers: { element: string | ReactNode; width?: ResponsiveValue<any> }[];
  cols: colsType;
};

/** MainFunction */
let Tables: React.FC<propsTypes> = (props) => {
  /** @kind: Props */
  let { width } = useWindowDimensions();

  /** @kind: Hooks */

  let boxScalyValue = useSharedValue(0);
  let boxScalyStyles = useAnimatedStyle(() => {
    return {
      opacity: boxScalyValue.value,
    };
  });

  useEffect(() => {
    boxScalyValue.value = withTiming(0);
    setTimeout(() => {
      boxScalyValue.value = withTiming(1);
    }, 300);
  }, [props.cols]);

  /** @kind: Methods */

  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Box {...props.containerStyles}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Box borderColor={"black"} borderWidth={1} {...props.tablesStyles}>
          <Box
            flexDir={"row"}
            alignItems={"center"}
            bgColor={"black"}
            {...props.headerContainerStyles}
          >
            {props.headers.map((header, index) => (
              <Box
                key={index}
                width={header.width ? header.width : width / 2.5}
                height={width / 10}
                justifyContent={"center"}
                p={1}
                borderRightColor={"white"}
                borderRightWidth={props.headers.length === index + 1 ? 0 : 1}
                {...props.headerBoxStyles}
              >
                <Text
                  color="white"
                  textAlign={"left"}
                  {...props.headerTextStyles}
                >
                  {header.element}
                </Text>
              </Box>
            ))}
          </Box>
          <AnimatedBox style={boxScalyStyles}>
            {props.cols.map((colContainer, index) => (
              <Box
                flexDir={"row"}
                key={index}
                bgColor={"white"}
                borderBottomColor={"muted.500"}
                borderBottomWidth={0.5}
                {...props.headerContainerStyles}
              >
                {colContainer.map((col, inx) => (
                  <Box
                    width={col.width ? col.width : width / 2.5}
                    key={inx}
                    justifyContent={"center"}
                    alignItems={"center"}
                    p={1}
                    borderRightColor={"black"}
                    borderRightWidth={colContainer.length === inx + 1 ? 0 : 1}
                    {...props.colBoxStyles}
                  >
                    <Text color="black" {...props.colTextStyles}>
                      {col.element}
                    </Text>
                  </Box>
                ))}
              </Box>
            ))}
          </AnimatedBox>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Tables;
