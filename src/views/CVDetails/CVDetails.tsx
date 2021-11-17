/** CvDetails.tsx */

// ========== Imports ========== //
import React from "react";
import { Box } from "native-base";
import MainHeader from "components/MainHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import FormBuilder from "components/FormBuilder";
import BottomButton from "components/BottomButton";
import useToggle from "hooks/useToggle";
import useShow from "hooks/useShow";
import useAlerts from "hooks/useAlerts";
import { useCv } from "context/CvProvider";
import useStorageOrms from "hooks/useStorageOrms";
import OpeningLoaderBox from "components/OpeningLoaderBox";
import AnimatedFixBox from "components/AnimatedFixBox";
import NavigationMenu from "views/components/NavigationMenu";
import useNotificationHandler from "hooks/useNotificationHandler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import useKeyboard from "hooks/useKeyboard";

// ========== propsTypes ========== //
export type propsTypes = {
  navigation: StackNavigationProp<RootStackParamList, "CVDetails">;
};

/** MainFunction */
let CvDetails: React.FC<propsTypes> = (props) => {
  /** @kind: Hooks */
  let { Cv, dispatchCv } = useCv();
  let { createValue, updateValues } = useStorageOrms();
  let { schedulePushNotification, cancelSchedule } = useNotificationHandler();
  let [show] = useShow(false, 300);
  let [complete, toggleComplete] = useToggle(Cv.cv.title ? true : false);
  let [sideBar, toggleSideBar] = useToggle(false);
  let [keyboardStatus, setKeyboardStatus] = useKeyboard();
  let { showError } = useAlerts();
  let { t } = useTranslation("translation", { keyPrefix: "cvDetails" });

  /** @kind: Props */

  /** @kind: Methods */
  let store = async (values: CvModel) => {
    if (Cv.cv.ID == "new") {
      let value = await createValue<CvModel>(values, "Cv");
      if (value) {
        dispatchCv({ type: "setCv", payload: value });
      }
    } else {
      let value = await updateValues<CvModel>(
        "Cv",
        { key: "ID", value: Cv.cv.ID },
        [
          { key: "title", value: values.title },
          { key: "owner", value: values.owner as string },
          { key: "cvLanguage", value: values.cvLanguage },
        ]
      );
      if (value) {
        dispatchCv({ type: "setCv", payload: value });
      }
    }
  };

  let storeNotification = async () => {
    // Store notification on make cv
    // When create cv check the option its has notification
    let token = await AsyncStorage.getItem("@cvNotification");
    if (!token) {
      // if not have set schedule and save it
      let trigger = await schedulePushNotification(
        t`title`,
        t`body`,
        {},
        { day: 1 }
      );
      if (trigger) {
        await AsyncStorage.setItem("@cvNotification", trigger);
      }
    } else {
      // if have cancel last and set new
      await cancelSchedule(token);
      await AsyncStorage.removeItem("@cvNotification");
      let trigger = await schedulePushNotification(
        t`title`,
        t`body`,
        {},
        { hour: 25 }
      );
      if (trigger) {
        await AsyncStorage.setItem("@cvNotification", trigger);
      }
    }
  };

  React.useEffect(() => {
    storeNotification();
  }, []);

  // ==== RETURN METHOD ==== //
  return (
    <Box flex={1}>
      <MainHeader
        title={t`title`}
        back={t`back`}
        menu="right"
        onPressMenu={() => {
          toggleSideBar(true);
        }}
        titleStyle={{ fontSize: "md" }}
        menuColor="pink.500"
        onPressBack={() => {
          props.navigation.goBack();
        }}
      />
      <Box flex={1}>
        <OpeningLoaderBox show={show}>
          <FormBuilder
            containerStyles={{ p: 1 }}
            stackStyles={{ mt: 3 }}
            labelStyles={{ py: 0, my: 0.5 }}
            inputStyles={{ my: 0, variant: "filled" }}
            spacing={2}
            inputs={[
              [
                {
                  name: "title",
                  label: t`form.title.label`,
                  value: Cv.cv.title,
                  placeHolder: t`form.title.placeHolder`,
                  require: true,
                },
              ],
              [
                {
                  name: "owner",
                  label: t`form.owner.label`,
                  value: Cv.cv.owner ? Cv.cv.owner : "",
                },
              ],
              [
                {
                  name: "cvLanguage",
                  label: t`form.cvLanguage.label`,
                  value: Cv.cv.cvLanguage,
                  type: "select",
                  options: [
                    { label: "English", value: "en" },
                    { label: "Español", value: "es" },
                    { label: "français", value: "fr" },
                    { label: "Deutsch", value: "de" },
                    { label: "العربية", value: "ar" },
                    { label: "Nederlands", value: "nl" },
                    { label: "Türkçe", value: "fr" },
                    { label: "हिंदी", value: "hi" },
                  ],
                },
              ],
            ]}
            onComplete={(value) => {
              toggleComplete(true);
              store(value);
            }}
            onError={() => {
              toggleComplete(false);
            }}
          />
        </OpeningLoaderBox>

        {!keyboardStatus && (
          <BottomButton
            title={t`bottomButton`}
            color="pink.500"
            arrowIcon="chevron"
            onPress={() => {
              if (complete) {
                props.navigation.navigate("PersonalDetails");
              } else {
                showError(t`error`);
              }
            }}
          />
        )}
      </Box>
      {sideBar && (
        <AnimatedFixBox
          onClose={() => {
            toggleSideBar(false);
          }}
        >
          <NavigationMenu />
        </AnimatedFixBox>
      )}
    </Box>
  );
};

export default CvDetails;
