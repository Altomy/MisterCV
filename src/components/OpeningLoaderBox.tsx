/** OpeningLoaderBox.tsx */

// ========== Imports ========== //
import React, { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { Box, IBoxProps, Spinner, ISpinnerProps } from "native-base";
import useLanguagesToggle from "hooks/useLanguagesToggle";
import { useTranslation } from "react-i18next";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

let AnimatedBox = Animated.createAnimatedComponent<IBoxProps>(Box);
let AnimatedSpinner = Animated.createAnimatedComponent<ISpinnerProps>(Spinner);

// ========== propsTypes ========== //
export type propsTypes = {
  containerStyles?: IBoxProps;
  show: boolean;
};

/** MainFunction */
let OpeningLoaderBox: React.FC<propsTypes> = (props) => {
  let [show, toggleShow] = useState(false);
  let { width } = useWindowDimensions();

  let { toggleDir } = useLanguagesToggle();
  let { t } = useTranslation();

  let leftValue = t("dir") === "ltr" ? -1 : 1;
  let rightValue = t("dir") === "ltr" ? 1 : -1;

  /** @kind: Props */
  let transformValue = useSharedValue(0);
  let opacityValues = useSharedValue(1);
  let borderWidth = useSharedValue(0);

  let leftSideAnimationProps = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: transformValue.value * leftValue }],
      borderRightColor: "black",
      borderRightWidth: borderWidth.value,
    };
  });
  let rightSideAnimationProps = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: transformValue.value * rightValue }],
      borderLeftColor: "black",
      borderLeftWidth: borderWidth.value,
    };
  });

  let opacityAnimatedProps = useAnimatedStyle(() => {
    return {
      opacity: opacityValues.value,
    };
  });

  let animated = () => {
    opacityValues.value = withTiming(0, { duration: 200 });
    borderWidth.value = withTiming(10, { duration: 200 });
    setTimeout(() => {
      transformValue.value = withTiming(width, { duration: 400 });
    }, 100);
  };

  useEffect(() => {
    if (props.show) {
      animated();
      setTimeout(() => {
        toggleShow(props.show);
      }, 500);
    }
  }, [props.show]);

  /** @kind: Hooks */

  /** @kind: Methods */

  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <>
      {props.children}

      {!show && (
        <Box
          position={"absolute"}
          left={0}
          top={0}
          width="100%"
          height="100%"
          {...props.containerStyles}
        >
          <Box
            height="100%"
            width="100%"
            flexDir={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <AnimatedBox
              width="50%"
              height="100%"
              bgColor={"muted.100"}
              style={leftSideAnimationProps}
              // style={toggleDir(rightSideAnimationProps, leftSideAnimationProps)}
            ></AnimatedBox>
            <AnimatedBox
              width="50%"
              height="100%"
              bgColor={"muted.100"}
              style={rightSideAnimationProps}
              // style={toggleDir(leftSideAnimationProps, rightSideAnimationProps)}
            ></AnimatedBox>
          </Box>
          <Box
            position={"absolute"}
            left={0}
            top={0}
            width="100%"
            height="100%"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <AnimatedSpinner
              size="lg"
              color="violet.700"
              style={opacityAnimatedProps}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default OpeningLoaderBox;
