/** MainHeader.tsx */

// ========== Imports ========== //
import React, { ReactNode } from "react";
import { Box, Text, IBoxProps, Icon, ITextProps, Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import useLanguagesToggle from "hooks/useLanguagesToggle";

// ========== propsTypes ========== //
type ListType = {
  title: string | ReactNode;
  subTitle?: string | ReactNode;
  icon?: ReactNode;
  leftElement?: ReactNode;
  hasArrow?: boolean;
  onPress?: () => void;
};
export type propsTypes = {
  containerStyles?: IBoxProps;
  listBoxStyles?: IBoxProps;
  listBodyStyles?: IBoxProps;
  titleStyles?: ITextProps;
  subTitleStyles?: ITextProps;
  lists: ListType[];
};

/** MainFunction */
let ListedMenu: React.FC<propsTypes> = (props) => {
  /** @kind: Props */

  /** @kind: Hooks */
  let { toggleDir } = useLanguagesToggle();

  /** @kind: Methods */

  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Box {...props.containerStyles}>
      {props.lists.map((list, index) => (
        <Pressable key={index} onPress={list.onPress}>
          <Box flexDir={"row"} alignItems={"center"} {...props.listBoxStyles}>
            {list.icon && list.icon}
            <Box
              flex={1}
              py={1}
              borderBottomColor={"black"}
              borderBottomWidth={0.5}
              flexDir={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={2}
              {...props.listBoxStyles}
            >
              <Box>
                <Text fontSize={"sm"} {...props.titleStyles}>
                  {list.title}
                </Text>
                {list.subTitle && (
                  <Text fontSize="xs" {...props.subTitleStyles}>
                    {list.subTitle}
                  </Text>
                )}
              </Box>
              {list.hasArrow && (
                <Icon
                  as={
                    <Ionicons
                      name={toggleDir("chevron-back", "chevron-forward")}
                    />
                  }
                  size={4}
                />
              )}
              {list.leftElement && list.leftElement}
            </Box>
          </Box>
        </Pressable>
      ))}
    </Box>
  );
};

export default ListedMenu;
