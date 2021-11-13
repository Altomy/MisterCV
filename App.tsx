import { StatusBar } from "expo-status-bar";
import React from "react";
import { Box, Button, NativeBaseProvider, Text } from "native-base";
import theme from "utils/theme";
import * as Font from "expo-font";
import fonts from "utils/fonts";
import { I18nManager } from "react-native";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import ICU from "i18next-icu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApplicationProvider from "context/ApplicationProvider";
import * as Localization from "expo-localization";
import * as SplashScreen from "expo-splash-screen";
import AppLoader from "AppLoader";
import { enableScreens } from "react-native-screens";
import * as Updates from "expo-updates";

enableScreens(true);

// ==== Translation ==== //
i18n
  .use(ICU)
  .use(initReactI18next)
  .init({
    resources: {
      en: require("translations/en"),
      ar: require("translations/ar"),
    },
    lng: Localization.locale.slice(0, 2),
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default function App() {
  // ==== States ==== //
  let [loaded, setLoaded] = React.useState(false);
  const { t, i18n } = useTranslation();

  // ==== Builder ==== //
  let Builder = async () => {
    await SplashScreen.preventAutoHideAsync();
    await Font.loadAsync(fonts); // Load Fonts
    let language = await AsyncStorage.getItem("language"); // Get Language Value
    if (language) {
      // Check Language
      i18n.changeLanguage(language); // Change Language if have
      I18nManager.forceRTL(t("dir") == "rtl" ? true : false); // Force RTL
    } else {
      // If Not Have change language
      I18nManager.forceRTL(Localization.isRTL); // Set force to Mobile is rtl
      await AsyncStorage.setItem("language", "en");
    }

    setLoaded(true); // Change loaded boolean
  };

  let changeLanguage = async (language: "en" | "ar") => {
    await AsyncStorage.setItem("language", language);
    i18n.changeLanguage(language);
    I18nManager.forceRTL(t("dir") == "rtl" ? true : false);
    await Updates.reloadAsync();
  };

  // ==== React.useEffect ==== //
  React.useEffect(() => {
    Builder();
  }, []);

  // ==== Views ==== //
  if (!loaded) {
    return null;
  }
  return (
    <ApplicationProvider>
      <NativeBaseProvider theme={theme}>
        <AppLoader />
        <StatusBar style="auto" />
      </NativeBaseProvider>
    </ApplicationProvider>
  );
}
