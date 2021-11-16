/** MainHeader.tsx */

// ========== Imports ========== //
import React, { ReactNode } from "react";
import { ImageSourcePropType } from "react-native";
import {
  Box,
  Text,
  IBoxProps,
  Image,
  ITextProps,
  IImageProps,
} from "native-base";

// ========== propsTypes ========== //
export type propsTypes = {
  containerStyles?: IBoxProps;
  image?: boolean;
  title?: string;
  subTitle?: string;
  titleStyles?: ITextProps;
  subTitleStyles?: ITextProps;
  customImage?: ImageSourcePropType;
  imageStyles?: IImageProps;
  icon?: ReactNode;
};

/** MainFunction */
let EmptyHolder: React.FC<propsTypes> = (props) => {
  /** @kind: Props */

  /** @kind: Hooks */

  /** @kind: Methods */

  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Box
      flex={1}
      {...props.containerStyles}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {props.image && (
        <Image
          source={
            props.customImage
              ? props.customImage
              : require("./defaultImage.png")
          }
          size="lg"
          alt="defaultImage"
          {...props.imageStyles}
        />
      )}
      {props.icon}
      <Text fontSize={"md"} mt={2} color="muted.500" {...props.titleStyles}>
        {props.title}
      </Text>
      <Text fontSize={"sm"} color="muted.500" {...props.subTitleStyles}>
        {props.subTitle}
      </Text>
      {props.children}
    </Box>
  );
};

export default React.memo(EmptyHolder);
