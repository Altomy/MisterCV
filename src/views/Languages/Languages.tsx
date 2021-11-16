/** Languages.tsx */

// ========== Imports ========== //
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Box, Icon, Text } from "native-base";
import MainHeader from "components/MainHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import ListedMenu from "components/ListedMenu";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import useLanguagesToggle from "hooks/useLanguagesToggle";

// ========== propsTypes ========== //
export type propsTypes = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

/** MainFunction */
let Languages: React.FC<propsTypes> = (props) => {
  let { i18n, t } = useTranslation();
  let { changeLanguage } = useLanguagesToggle();
  /** @kind: Props */

  /** @kind: Hooks */

  /** @kind: Methods */

  /** @kind: Views */

  let languagesList = [
    { title: "English", key: "en" },
    { title: "العربية", key: "ar" },
  ];

  // ==== RETURN METHOD ==== //
  return (
    <Box flex={1}>
      <MainHeader
        back={t`language.back`}
        title={t`language.title`}
        onPressBack={() => {
          props.navigation.goBack();
        }}
      />
      <Box flex={1} p={1}>
        <ListedMenu
          listBoxStyles={{ py: 1.5, borderBottomColor: "black" }}
          titleStyles={{ color: "black" }}
          lists={languagesList.map((_trg) => {
            return {
              title: _trg.title,
              icon: (
                <Text fontSize={"xs"} mx={2}>
                  {_trg.key}
                </Text>
              ),
              leftElement:
                _trg.key === i18n.language ? (
                  <Icon
                    as={<Ionicons name="checkbox" />}
                    color="green.600"
                    size={4}
                  />
                ) : undefined,
              onPress: () => {
                changeLanguage(_trg.key);
              },
            };
          })}
        />
      </Box>
    </Box>
  );
};

export default Languages;
