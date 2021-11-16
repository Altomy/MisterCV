/** MainHeader.tsx */

// ========== Imports ========== //
import React, { ReactNode } from "react";
import { ImageSourcePropType, useWindowDimensions } from "react-native";
import {
  Box,
  Text,
  IBoxProps,
  Image,
  ITextProps,
  Icon,
  IIconProps,
  Pressable,
  IImageProps,
  Menu,
  IMenuItemProps,
} from "native-base";
import { ResponsiveValue } from "native-base/lib/typescript/components/types";
import { Ionicons } from "@expo/vector-icons";

// ========== propsTypes ========== //
type moreActionListTypes = {
  title: string;
  onPress?: any;
};

export type propsTypes = {
  boxStyles?: IBoxProps;
  image?: ImageSourcePropType;
  imageSize?: {
    width: ResponsiveValue<string | number>;
    height: ResponsiveValue<string | number>;
  };
  title?: string;
  subTitle?: string;
  titleStyles?: ITextProps;
  subTitleStyles?: ITextProps;
  bottomElement?: ReactNode;
  moreAction?: boolean;
  moreActionStyles?: IIconProps;
  onPressMoreAction?: any;
  moreActionElement?: ReactNode;
  centerElements?: ReactNode;
  onPress?: any;
  imageProps?: IImageProps;
  moreActionsList?: moreActionListTypes[];
  menuItemProps?: IMenuItemProps;
  imageElement?: ReactNode;
};

/** MainFunction */
let HCard: React.FC<propsTypes> = (props) => {
  /** @kind: Props */
  let { width } = useWindowDimensions();

  /** @kind: Hooks */

  /** @kind: Methods */

  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Box
      p={1}
      pb={3}
      borderBottomColor={"black"}
      borderBottomWidth={3}
      {...props.boxStyles}
    >
      <Box flexDir={"row"}>
        <Box>
          {props.image && (
            <Pressable onPress={props.onPress}>
              <Image
                source={props.image}
                width={props.imageSize ? props.imageSize.width : width / 3}
                height={props.imageSize ? props.imageSize.height : width / 3}
                alt="ImageSource"
                resizeMode="cover"
                {...props.imageProps}
              />
            </Pressable>
          )}
          {props.imageElement && props.imageElement}
        </Box>
        <Box p={1} flexDir={"column"} justifyContent={"space-between"} flex={1}>
          <Box>
            <Pressable onPress={props.onPress}>
              {props.title && (
                <Text
                  fontSize="lg"
                  textAlign={"left"}
                  bold
                  {...props.titleStyles}
                >
                  {props.title}
                </Text>
              )}
            </Pressable>
            {props.subTitle && (
              <Text px={1} fontSize="xs" textAlign={"left"}>
                {props.subTitle}
              </Text>
            )}
            {props.centerElements && props.centerElements}
          </Box>
          <Box>{props.bottomElement && props.bottomElement}</Box>
        </Box>
      </Box>
      <Box position={"absolute"} right={1} top={1}>
        {props.moreAction && (
          <Menu
            w="190"
            trigger={(triggerProps) => {
              return (
                <Pressable {...triggerProps}>
                  <Icon
                    as={<Ionicons name="ellipsis-horizontal" />}
                    color="black"
                    {...props.moreActionStyles}
                  />
                </Pressable>
              );
            }}
          >
            {props.moreActionsList
              ? props.moreActionsList.map((_list, index) => (
                  <Menu.Item
                    key={index}
                    onPress={_list.onPress}
                    {...props.menuItemProps}
                  >
                    {_list.title}
                  </Menu.Item>
                ))
              : null}
          </Menu>
        )}
        {props.moreActionElement && props.moreActionElement}
      </Box>
    </Box>
  );
};

export default React.memo(HCard);
