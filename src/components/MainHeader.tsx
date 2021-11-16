/** MainHeader.tsx */

// ========== Imports ========== //
import React, { ReactNode } from "react";
import {
  Box,
  IBoxProps,
  Text,
  Icon,
  IIconProps,
  ITextProps,
} from "native-base";
import { IColors } from "native-base/lib/typescript/theme/base/colors";
import { Ionicons } from "@expo/vector-icons";
import useLanguagesToggle from "hooks/useLanguagesToggle";

// ========== propsTypes ========== //
export type propsTypes = {
  boxStyle?: IBoxProps;
  oneLine?: boolean;
  title?: string;
  menu?: "left" | "right";
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  menuColor?: IColors;
  centerElement?: ReactNode;
  back?: "none" | string;
  onPressBack?: any;
  onPressMenu?: any;
  menuIconStyle?: IIconProps;
  titleStyle?: ITextProps;
  backTitleStyle?: ITextProps;
  chevron?: boolean;
  backIconStyle?: IIconProps;
  backColor?: IColors;
};

/** MainFunction */
let MainHeader: React.FC<propsTypes> = (props) => {
  /** @kind: Props */

  /** @kind: Hooks */
  let { toggleDir } = useLanguagesToggle();

  /** @kind: Methods */

  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Box
      safeAreaTop
      bgColor={"white"}
      shadow={1}
      {...props.boxStyle}
      zIndex={100}
      style={{ elevation: 2 }}
    >
      <Box
        p={1}
        flexDir={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        {props.menu && !props.leftElement && props.menu == "left" && (
          <Icon
            as={<Ionicons name={"menu-outline"} onPress={props.onPressMenu} />}
            color={props.menuColor ? props.menuColor : "black"}
            {...props.menuIconStyle}
          />
        )}
        {!props.menu && !props.leftElement && !props.back && <Box></Box>}
        {props.leftElement && props.leftElement}
        {props.back && (
          <Box flexDir={"row"} alignItems={"center"}>
            <Icon
              as={
                <Ionicons
                  name={
                    props.chevron
                      ? toggleDir("chevron-forward", "chevron-back")
                      : toggleDir("arrow-forward", "arrow-back")
                  }
                />
              }
              color={props.backColor ? props.backColor : "black"}
              onPress={props.onPressBack}
              {...props.backIconStyle}
            />
            {props.back !== "none" && (
              <Text
                color={props.backColor ? props.backColor : "black"}
                fontSize="2xl"
                {...props.backTitleStyle}
              >
                {props.back}
              </Text>
            )}
          </Box>
        )}
        {props.oneLine && props.title && (
          <Text color="black" {...props.titleStyle}>
            {props.title}
          </Text>
        )}
        {props.centerElement && props.centerElement}
        {props.menu && !props.rightElement && props.menu == "right" && (
          <Icon
            as={<Ionicons name={"menu-outline"} />}
            onPress={props.onPressMenu}
            color={props.menuColor ? props.menuColor : "black"}
            {...props.menuIconStyle}
          />
        )}
        {!props.menu && !props.rightElement && <Box></Box>}
      </Box>
      {!props.oneLine && (
        <Box p={1} px={2}>
          {props.title && (
            <Text fontSize="2xl" textAlign={"left"} bold {...props.titleStyle}>
              {props.title}
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default React.memo(MainHeader);
