/** CvDetails.tsx */

// ========== Imports ========== //
import React, { useEffect } from "react";
import { Box, KeyboardAvoidingView, ScrollView } from "native-base";
import MainHeader from "components/MainHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import FormBuilder from "components/FormBuilder";
import BottomButton from "components/BottomButton";
import { useCv } from "context/CvProvider";
import useStorageOrms from "hooks/useStorageOrms";
import useToggle from "hooks/useToggle";
import useAlerts from "hooks/useAlerts";
import OpeningLoaderBox from "components/OpeningLoaderBox";
import AnimatedFixBox from "components/AnimatedFixBox";
import NavigationMenu from "views/components/NavigationMenu";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import useKeyboard from "hooks/useKeyboard";
import useAnalytics from "hooks/useAnalytics";
import useAds from "hooks/useAds";
import { useAuth } from "context/AuthProvider";

// ========== propsTypes ========== //
export type propsTypes = {
  navigation: StackNavigationProp<RootStackParamList, "PersonalDetails">;
};

/** MainFunction */
let PersonalDetails: React.FC<propsTypes> = (props) => {
  /** @kind: Props */

  /** @kind: Hooks */

  /**
   * useCv => To Get cv_id;
   * complete,toggleComplete => to set its complete to make fields its have complete or not
   * showError => to view error
   * show => To load data then preview the show
   * data => to set the data {personalDetails}
   */
  let { Cv } = useCv();
  let [complete, toggleComplete] = useToggle(false);
  let [sideBar, toggleSideBar] = useToggle(false);
  let { createAnalyticsEvent } = useAnalytics();
  let { Auth, dispatchAuth } = useAuth();
  let { requestTrackingPermission } = useAds();
  let { showError } = useAlerts();
  let [keyboardStatus] = useKeyboard();
  let { findValue, update } = useStorageOrms();
  let { t } = useTranslation("translation", { keyPrefix: "personalDetails" });
  let [show, toggleShow] = useToggle(false);
  let [data, setData] = React.useState<PersonalDetailsType>({
    fullName: "",
    phone: "",
    jobTitle: "",
    email: "",
    ID: "",
    CreatedAt: new Date(),
    cv_id: Cv.cv.ID,
  });

  /**
   * FireCall
   * checker => to check the value if have with the cv_id
   */

  let checker = React.useMemo(() => {
    return async () => {
      // get value and check its not undefined
      let value = await findValue<PersonalDetailsType>("PersonalDetails", {
        key: "cv_id",
        value: Cv.cv.ID,
      });
      if (value) {
        // set data if have values
        setData(value);
        // toggleComplete
        toggleComplete(true);
      }
      // toggle show
      toggleShow(true);
      await createAnalyticsEvent("OpeningPersonalDetails", "PersonalDetails");
      let requestStatus = await requestTrackingPermission();

      dispatchAuth({
        type: "setUserAds",
        payload: requestStatus,
      });
    };
  }, []);

  // store
  let store = async (values: PersonalDetailsType) => {
    // get values and add cv_id to it and ID to it and check with cv_id
    let newValue = await update<PersonalDetailsType>(
      "PersonalDetails",
      { key: "cv_id", value: Cv.cv.ID },
      { ...values, cv_id: Cv.cv.ID, ID: data.ID }
    );
    // if success
    if (newValue) {
      //store the new data
      setData(newValue);
    }
  };

  useEffect(() => {
    checker();
  }, []);

  /** @kind: Methods */

  /** @kind: Views */

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
      <KeyboardAvoidingView
        behavior={Platform.select({ android: "height", ios: "padding" })}
      >
        <ScrollView>
          <Box flex={1}>
            <OpeningLoaderBox show={show}>
              {show && (
                <FormBuilder
                  containerStyles={{ p: 2 }}
                  stackStyles={{ mt: 3 }}
                  labelStyles={{ py: 0, my: 0.5 }}
                  inputStyles={{ my: 0, variant: "filled" }}
                  spacing={2}
                  hideAccessory={true}
                  inputs={[
                    [
                      {
                        name: "fullName",
                        label: t`form.fullName.label`,
                        placeHolder: t`form.fullName.placeHolder`,
                        value: data.fullName,
                        require: true,
                      },
                    ],
                    [
                      {
                        name: "phone",
                        label: t`form.phone.label`,
                        placeHolder: t`form.phone.placeHolder`,
                        value: data.phone,
                        require: true,
                        keyboardType: "phone-pad",
                      },
                    ],
                    [
                      {
                        name: "email",
                        label: t`form.email.label`,
                        placeHolder: t`form.email.placeHolder`,
                        value: data.email ? data.email : "",
                        require: false,
                        keyboardType: "email-address",
                      },
                    ],
                    [
                      {
                        name: "jobTitle",
                        label: t`form.jobTitle.label`,
                        placeHolder: t`form.jobTitle.placeHolder`,
                        value: data.jobTitle ? data.jobTitle : "",
                        require: false,
                      },
                    ],
                    [
                      {
                        name: "country",
                        label: t`form.country.label`,
                        value: data.country ? data.country : "",
                        require: false,
                      },
                    ],
                    [
                      {
                        name: "city",
                        label: t`form.city.label`,
                        value: data.city ? data.city : "",
                        require: false,
                      },
                    ],
                    [
                      {
                        name: "bio",
                        label: t`form.bio.label`,
                        placeHolder: t`form.bio.placeHolder`,
                        value: data.bio ? data.bio : "",
                        require: false,
                        type: "textarea",
                      },
                    ],
                  ]}
                  onComplete={(value) => {
                    store(value);
                    toggleComplete(true);
                  }}
                  onError={() => {
                    toggleComplete(false);
                  }}
                />
              )}
            </OpeningLoaderBox>
          </Box>
          <Box height={228}></Box>
        </ScrollView>
      </KeyboardAvoidingView>
      {Platform.OS === "android" && !keyboardStatus && (
        <BottomButton
          title={t`bottomButton`}
          color="pink.500"
          arrowIcon="chevron"
          onPress={() => {
            if (complete) {
              props.navigation.navigate("Education");
            } else {
              showError(t`error`);
            }
          }}
        />
      )}
      {Platform.OS === "ios" && (
        <BottomButton
          title={t`bottomButton`}
          color="pink.500"
          arrowIcon="chevron"
          onPress={() => {
            if (complete) {
              props.navigation.navigate("Education");
            } else {
              showError(t`error`);
            }
          }}
        />
      )}
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

export default PersonalDetails;
