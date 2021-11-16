/** NavigationMenu.tsx */

// ========== Imports ========== //
import React from "react";
import { useWindowDimensions } from "react-native";
import { Box, Icon, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import ListedMenu from "components/ListedMenu";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";

// ========== propsTypes ========== //
export type propsTypes = {};

/** MainFunction */
let NavigationMenu: React.FC<propsTypes> = (props) => {
  /** @kind: Hooks */
  let { width, height } = useWindowDimensions();
  let navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  let { t } = useTranslation("translation", { keyPrefix: "navigationMenu" });

  // ==== RETURN METHOD ==== //
  return (
    <Box
      height={height}
      width={width}
      flexDir={"row-reverse"}
      safeAreaTop
      pt={10}
    >
      <Box width={width / 1.4} height={height}>
        <Box
          bgColor={"white"}
          p={1}
          borderTopLeftRadius={5}
          borderBottomLeftRadius={5}
        >
          <Text color="muted.500" mb={3}>
            {t`navigation`}
          </Text>
          <ListedMenu
            listBoxStyles={{ py: 1.5, borderBottomColor: "muted.400" }}
            titleStyles={{ color: "muted.600" }}
            lists={[
              {
                title: t`home`,
                icon: (
                  <Icon
                    as={<Ionicons name="home-outline" />}
                    size={5}
                    color="muted.600"
                    mx={1}
                  />
                ),
                hasArrow: true,
                onPress: () => {
                  navigation.navigate("Home");
                },
              },
              {
                title: t`cvDetails`,
                icon: (
                  <Icon
                    as={<Ionicons name="bookmark-outline" />}
                    size={5}
                    color="muted.600"
                    mx={1}
                  />
                ),
                hasArrow: true,
                onPress: () => {
                  navigation.navigate("CVDetails");
                },
              },
              {
                title: t`personalDetails`,
                icon: (
                  <Icon
                    as={<Ionicons name="person-outline" />}
                    size={5}
                    color="muted.600"
                    mx={1}
                  />
                ),
                hasArrow: true,
                onPress: () => {
                  navigation.navigate("PersonalDetails");
                },
              },
              {
                title: t`educations`,
                icon: (
                  <Icon
                    as={<Ionicons name="school-outline" />}
                    size={5}
                    color="muted.600"
                    mx={1}
                  />
                ),
                hasArrow: true,
                onPress: () => {
                  navigation.navigate("Education");
                },
              },
              {
                title: t`works`,
                icon: (
                  <Icon
                    as={<Ionicons name="hammer-outline" />}
                    size={5}
                    color="muted.600"
                    mx={1}
                  />
                ),
                hasArrow: true,
                onPress: () => {
                  navigation.navigate("Works");
                },
              },
              {
                title: t`skills`,
                icon: (
                  <Icon
                    as={<Ionicons name="ribbon-outline" />}
                    size={5}
                    color="muted.600"
                    mx={1}
                  />
                ),
                hasArrow: true,
                onPress: () => {
                  navigation.navigate("Skills");
                },
              },
              {
                title: t`courses`,
                icon: (
                  <Icon
                    as={<Ionicons name="shield-outline" />}
                    size={5}
                    color="muted.600"
                    mx={1}
                  />
                ),
                hasArrow: true,
                onPress: () => {
                  navigation.navigate("Courses");
                },
              },
              {
                title: t`preview`,
                icon: (
                  <Icon
                    as={<Ionicons name="clipboard-outline" />}
                    size={5}
                    color="muted.600"
                    mx={1}
                  />
                ),
                hasArrow: true,
                onPress: () => {
                  navigation.navigate("Result");
                },
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(NavigationMenu);
