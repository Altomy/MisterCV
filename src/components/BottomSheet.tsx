/** MainHeader.tsx */

// ========== Imports ========== //
import React, { ReactNode } from "react";
import { useWindowDimensions } from "react-native";
import {
  Box,
  Pressable,
  Text,
  IPressableProps,
  IBoxProps,
  ITextProps,
  Icon,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// ========== propsTypes ========== //
export type propsTypes = {
  absoluteStyles?: IPressableProps;
  onClose: () => void;
  hideHeader?: boolean;
  boxStyles?: IBoxProps;
  headerStyles?: IBoxProps;
  headerTitle?: string;
  headerSubTitle?: string;
  headerTitleStyles?: ITextProps;
  headerSubTitleStyles?: ITextProps;
  footer?: ReactNode;
  footerBoxStyles?: IBoxProps;
};

/** MainFunction */
let BottomSheet: React.FC<propsTypes> = (props) => {
  /** @kind: Props */

  let { height } = useWindowDimensions();
  /** @kind: Hooks */
  let animatedValues = {
    transform: useSharedValue(height),
    scaleX: useSharedValue(0.01),
  };

  let animatedBoxStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: animatedValues.transform.value },
        { scaleX: animatedValues.scaleX.value },
      ],
    };
  });

  let createAnimation = () => {
    if (animatedValues.transform.value === height) {
      animatedValues.transform.value = withTiming(1);
      setTimeout(() => {
        animatedValues.scaleX.value = withTiming(1);
      }, 300);
    } else {
      animatedValues.scaleX.value = withTiming(0.01);
      setTimeout(() => {
        animatedValues.transform.value = withTiming(height);
      }, 300);
    }
  };

  React.useEffect(() => {
    createAnimation();
  }, []);

  /** @kind: Methods */

  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Pressable
      position={"absolute"}
      left={0}
      top={0}
      height="100%"
      width="100%"
      overflow={"visible"}
      zIndex={102}
      style={{ elevation: 3 }}
      onPress={() => {
        // createAnimation();
        // setTimeout(() => {
        //   props.onClose();
        // }, 600);
      }}
      {...props.absoluteStyles}
    >
      <Box
        position={"absolute"}
        left={0}
        bottom={0}
        width="100%"
        zIndex={103}
        style={{ elevation: 4 }}
      >
        <Animated.View
          style={{
            ...animatedBoxStyles,
          }}
        >
          <Box
            bgColor={"white"}
            borderTopLeftRadius={"2xl"}
            borderTopRightRadius={"2xl"}
            {...props.boxStyles}
          >
            {/* Header */}
            {!props.hideHeader && (
              <Box
                py={3}
                px={2}
                flexDir={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                borderBottomColor={"black"}
                borderBottomWidth={0.5}
                {...props.headerStyles}
              >
                <Box>
                  {props.headerTitle && (
                    <Text fontSize={"lg"} {...props.headerTitleStyles}>
                      {props.headerTitle}
                    </Text>
                  )}
                  {props.headerSubTitle && (
                    <Text fontSize={"sm"} {...props.headerSubTitleStyles}>
                      {props.headerSubTitle}
                    </Text>
                  )}
                </Box>
                <Icon
                  as={<Ionicons name="close-circle" />}
                  color="muted.700"
                  onPress={() => {
                    createAnimation();
                    setTimeout(() => {
                      props.onClose();
                    }, 600);
                  }}
                />
              </Box>
            )}
            {/* Body */}
            {props.children}
            {props.footer && (
              <Box
                py={2}
                borderTopColor={"black"}
                borderTopWidth={0.5}
                {...props.footerBoxStyles}
              >
                {props.footer}
              </Box>
            )}
          </Box>
        </Animated.View>
      </Box>
    </Pressable>
  );
};

export default BottomSheet;
