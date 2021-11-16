/** MainHeader.tsx */

// ========== Imports ========== //
import React, { ReactNode } from "react";
import { Box, Text, IBoxProps, ITextProps, Icon, Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { IColors } from "native-base/lib/typescript/theme/base/colors";
import useLanguagesToggle from "hooks/useLanguagesToggle";

// ========== propsTypes ========== //
export type propsTypes = {
  boxStyles?: IBoxProps;
  textStyles?: ITextProps;
  arrowIcon?: "chevron" | "arrow";
  title: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  color?: IColors;
  textColor?: IColors;
  onPress?: () => void;
};

/** MainFunction */
let BottomButton: React.FC<propsTypes> = (props) => {
  let { toggleDir } = useLanguagesToggle();
  /** @kind: Props */

  /** @kind: Hooks */

  /** @kind: Methods */

  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Box
      position={"absolute"}
      left={0}
      bottom={0}
      width={"100%"}
      safeAreaBottom
    >
      <Pressable onPress={props.onPress}>
        <Box
          p={2}
          bgColor={props.color ? props.color : "success.400"}
          {...props.boxStyles}
        >
          <Box alignItems={"center"} flexDir={"row"} justifyContent={"center"}>
            {props.leftIcon && props.leftIcon}
            <Text
              textAlign={"center"}
              bold
              color={props.textColor ? props.textColor : "black"}
              fontSize="lg"
              {...props.textStyles}
            >
              {props.title}
            </Text>
            {props.arrowIcon && (
              <Icon
                as={
                  <Ionicons
                    name={
                      props.arrowIcon == "chevron"
                        ? toggleDir("chevron-back", "chevron-forward")
                        : toggleDir("arrow-back", "arrow-forward")
                    }
                  />
                }
                mt={1}
                size={5}
              />
            )}
            {props.rightIcon && props.rightIcon}
          </Box>
        </Box>
      </Pressable>
    </Box>
  );
};

export default React.memo(BottomButton);
