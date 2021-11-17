import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { I18nManager } from "react-native";
import * as Updates from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";

type changeLanguage = (language: string) => void;

type toggleDir = (
  rtlValue: string | ReactNode | number,
  ltrValue: string | ReactNode | number
) => any;

type useLanguagesToggleType = () => {
  changeLanguage: changeLanguage;
  toggleDir: toggleDir;
};

let useLanguagesToggle: useLanguagesToggleType = () => {
  let { i18n, t } = useTranslation();

  let changeLanguage: changeLanguage = async (language) => {
    let oldDir = t("dir");
    await AsyncStorage.setItem("language", language);
    i18n.changeLanguage(language);

    if (oldDir !== t("dir")) {
      I18nManager.forceRTL(t("dir") == "rtl" ? true : false);
      await Updates.reloadAsync();
    }
  };

  let toggleDir: toggleDir = (rtlValue, ltrValue) => {
    let dir = t("dir");

    if (dir === "ltr") {
      return ltrValue;
    } else {
      return rtlValue;
    }
  };

  return {
    changeLanguage,
    toggleDir,
  };
};

export default useLanguagesToggle;
