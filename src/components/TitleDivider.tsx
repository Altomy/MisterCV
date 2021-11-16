/** MainHeader.tsx */

// ========== Imports ========== //
import React, { ReactNode } from "react";
import {
  Box,
  Text,
  IBoxProps,
  Circle,
  Icon,
  ITextProps,
  Pressable,
  ICircleProps,
  IIconProps,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { IColors } from "native-base/lib/typescript/theme/base/colors";

// ========== propsTypes ========== //
export type propsTypes = {
  containerStyles?: IBoxProps;
  boxStyles?: IBoxProps;
  textStyles?: ITextProps;
  title?: string;
  dividerColor?: IColors;
  addAction?: boolean;
  onPressAdd?: any;
  actionElement?: ReactNode;
  buttonColors?: { bgColor: IColors; borderColor: IColors };
  circleStyles?: ICircleProps;
  addActionIcon?: ReactNode;
  addIconStyles?: IIconProps;
};

/** MainFunction */
let TitleDivider: React.FC<propsTypes> = (props) => {
  /** @kind: Props */

  /** @kind: Hooks */

  /** @kind: Methods */

  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Box py={1} {...props.containerStyles}>
      <Box flexDir={"row"} alignItems={"center"} px={1} {...props.boxStyles}>
        {props.title && (
          <Text fontSize={"2xl"} bold pr={1} {...props.textStyles}>
            {props.title}
          </Text>
        )}
        <Box flex={1} alignItems={"center"} justifyContent={"center"}>
          <Box
            width="100%"
            height={0.5}
            bgColor={props.dividerColor ? props.dividerColor : "black"}
          ></Box>
        </Box>
        {props.addAction && (
          <Pressable onPress={props.onPressAdd}>
            <Circle
              size={46}
              bgColor={
                props.buttonColors ? props.buttonColors.bgColor : "blue.500"
              }
              alignItems={"center"}
              justifyContent={"center"}
              borderColor={
                props.buttonColors ? props.buttonColors.borderColor : "blue.700"
              }
              borderWidth={1}
              {...props.circleStyles}
            >
              {props.addActionIcon && props.addActionIcon}
              {!props.addActionIcon && (
                <Icon
                  as={<Ionicons name="add-outline" />}
                  color="black"
                  {...props.addIconStyles}
                />
              )}
            </Circle>
          </Pressable>
        )}
        {props.actionElement && props.actionElement}
      </Box>
    </Box>
  );
};

export default TitleDivider;
