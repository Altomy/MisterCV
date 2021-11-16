/** MainHeader.tsx */

// ========== Imports ========== //
import React from "react";
import { ColorValue, useWindowDimensions } from "react-native";
import { IPressableProps, Pressable } from "native-base";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// ========== propsTypes ========== //
export type propsTypes = {
  fullBackgroundColor?: ColorValue;
  onClose: () => void;
  containerBoxStyle?: IPressableProps;
};

/** MainFunction */
let AnimatedFixBox: React.FC<propsTypes> = (props) => {
  /** @kind: Props */
  /** @kind: Hooks */
  let { width } = useWindowDimensions();

  let boxAnimatedValues = {
    translateValue: useSharedValue(width),
    scalyY: useSharedValue(0.03),
  };

  let boxAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: boxAnimatedValues.translateValue.value,
        },
      ],
    };
  });
  let insideBoxStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: boxAnimatedValues.scalyY.value }],
    };
  });

  let createAnimation = () => {
    if (boxAnimatedValues.translateValue.value === width) {
      boxAnimatedValues.translateValue.value = withTiming(0, { duration: 100 });
      setTimeout(() => {
        boxAnimatedValues.scalyY.value = withTiming(1, { duration: 200 });
      }, 100);
    } else {
      boxAnimatedValues.scalyY.value = withTiming(0.03, { duration: 100 });
      setTimeout(() => {
        boxAnimatedValues.translateValue.value = withTiming(width, {
          duration: 200,
        });
      }, 100);
    }
  };

  /** @kind: Methods */
  React.useEffect(() => {
    createAnimation();
  }, []);

  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Pressable
      position={"absolute"}
      right={0}
      top={0}
      height="100%"
      width="100%"
      zIndex={101}
      style={{
        backgroundColor: props.fullBackgroundColor
          ? props.fullBackgroundColor
          : "rgba(0,0,0,0.1)",
        elevation: 4,
      }}
      onPress={() => {
        createAnimation();
        setTimeout(() => {
          props.onClose();
        }, 200);
      }}
      {...props.containerBoxStyle}
    >
      <Animated.View
        style={{
          ...boxAnimatedStyles,
        }}
      >
        <Animated.View style={{ ...insideBoxStyles }}>
          {props.children}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default AnimatedFixBox;
