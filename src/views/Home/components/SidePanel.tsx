/** SidePanel.tsx */

// ========== Imports ========== //
import React, { useState, useEffect } from "react";
import { useWindowDimensions, Alert } from "react-native";
import { Box, Icon, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import ListedMenu from "components/ListedMenu";
import useStorageOrms from "hooks/useStorageOrms";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Updates from "expo-updates";

// ========== propsTypes ========== //
export type propsTypes = {};

/** MainFunction */
let SidePanel: React.FC<propsTypes> = (props) => {
  /** @kind: Hooks */
  let { i18n } = useTranslation(); // to translate
  let { t } = useTranslation("translation", { keyPrefix: "home.sidePanel" });
  let { removeModel } = useStorageOrms(); // Storage @action when press reset data
  let navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Home">>();
  let { width, height } = useWindowDimensions();

  /** @kind: Props */
  let [notificationStatus, setNotificationStatus] = useState(true);

  /** @kind: Methods */

  let resetData = async () => {
    Alert.alert(t`resetDataAlert.title`, t`resetDataAlert.body`, [
      {
        text: t`resetDataAlert.cancel`,
        style: "cancel",
      },
      {
        text: t`resetDataAlert.ok`,
        onPress: async () => {
          await removeModel("Cv");
          await removeModel("PersonalDetails");
          await removeModel("Educations");
          await removeModel("Works");
          await removeModel("Skills");
          await removeModel("Courses");
          await Updates.reloadAsync();
        },
      },
    ]);
  };

  let getNotificationModel = React.useMemo(() => {
    return async () => {
      let hasStorage = await AsyncStorage.getItem("@cvNotificationToggles");
      if (!hasStorage) {
        setNotificationStatus(false);
      } else {
        if (hasStorage === "received") {
          setNotificationStatus(true);
        } else {
          setNotificationStatus(false);
        }
      }
    };
  }, []);

  useEffect(() => {
    getNotificationModel();
  }, []);

  // ==== RETURN METHOD ==== //
  return (
    <Box
      height={height}
      width={width}
      flexDir={"row-reverse"}
      safeAreaTop
      pt={10}
    >
      <Box
        bgColor={"white"}
        width={width / 1.5}
        height={height / 1.5}
        borderTopLeftRadius={5}
        borderBottomLeftRadius={5}
        p={1}
      >
        <Text color="muted.500" mb={3}>
          {t`settings`}
        </Text>
        <ListedMenu
          listBoxStyles={{ py: 1.5, borderBottomColor: "muted.400" }}
          titleStyles={{ color: "muted.600" }}
          lists={[
            {
              title: t`notifications`,
              icon: (
                <Icon
                  as={<Ionicons name="notifications-outline" />}
                  size={5}
                  color="muted.600"
                  mx={1}
                />
              ),
              leftElement: (
                <Icon
                  onPress={async () => {
                    let hasNotification = await AsyncStorage.getItem(
                      "@cvNotificationToggles"
                    );
                    if (hasNotification) {
                      if (hasNotification === "received") {
                        await AsyncStorage.setItem(
                          "@cvNotificationToggles",
                          "not"
                        );
                        setNotificationStatus(false);
                      } else {
                        await AsyncStorage.setItem(
                          "@cvNotificationToggles",
                          "received"
                        );
                        setNotificationStatus(true);
                      }
                    }
                  }}
                  as={
                    <Ionicons
                      name={
                        notificationStatus
                          ? "notifications-outline"
                          : "notifications-off-outline"
                      }
                    />
                  }
                  color={notificationStatus ? "green.600" : "red.600"}
                  size={4}
                />
              ),
            },
            {
              title: t`language`,
              icon: (
                <Icon
                  as={<Ionicons name="language-outline" />}
                  size={5}
                  color="muted.600"
                  mx={1}
                />
              ),
              leftElement: (
                <Text bold fontSize={"xs"}>
                  {i18n.language}
                </Text>
              ),
              onPress: () => {
                navigation.navigate("Languages");
              },
            },
            {
              title: t`resetData`,
              icon: (
                <Icon
                  as={<Ionicons name="sync-circle-outline" />}
                  size={5}
                  color="muted.600"
                  mx={1}
                />
              ),
              hasArrow: true,
              onPress: () => {
                resetData();
              },
            },
            {
              title: t`aboutUs`,
              icon: (
                <Icon
                  as={<Ionicons name="information-circle-outline" />}
                  size={5}
                  color="muted.600"
                  mx={1}
                />
              ),
              hasArrow: true,
              onPress: () => {
                navigation.navigate("AboutUs");
              },
            },
            {
              title: t`callUs`,
              icon: (
                <Icon
                  as={<Ionicons name="chatbox-outline" />}
                  size={5}
                  color="muted.600"
                  mx={1}
                />
              ),
              hasArrow: true,
              onPress: () => {
                navigation.navigate("CallUs");
              },
            },
          ]}
        />
        <Box
          position={"absolute"}
          left={0}
          bottom={0}
          width="100%"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text textAlign={"center"} fontSize="xs">
            PlusSoft © 2021
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(SidePanel);
