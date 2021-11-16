import React from "react";
import { AdMobInterstitial } from "expo-ads-admob";
import {
  requestTrackingPermissionsAsync,
  getTrackingPermissionsAsync,
} from "expo-tracking-transparency";

let showInterstitial = async (unitID: string, userAds?: boolean) => {
  await AdMobInterstitial.setAdUnitID(unitID);
  await AdMobInterstitial.requestAdAsync({
    servePersonalizedAds: userAds ? userAds : false,
  });
  await AdMobInterstitial.showAdAsync();
};

let requestTrackingPermission = async () => {
  let { status } = await getTrackingPermissionsAsync();

  if (status !== "granted") {
    let { status } = await requestTrackingPermissionsAsync();
    if (status === "granted") {
      return true;
    }
    return false;
  } else {
    return true;
  }
};

let useAds = () => {
  return {
    showInterstitial,
    requestTrackingPermission,
  };
};

export default useAds;
