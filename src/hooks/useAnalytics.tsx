import React from "react";
import * as Analytics from "expo-firebase-analytics";

let enableAnalytics = async () => {
  await Analytics.setAnalyticsCollectionEnabled(true);
};

let createAnalyticsEvent = async (eventName: string, screen: string) => {
  await Analytics.logEvent(eventName, {
    name: eventName,
    screen: screen,
    purpose: `Open ${screen} Page, Event: ${eventName}`,
  });
};

let useAnalytics = () => {
  return {
    enableAnalytics,
    createAnalyticsEvent,
  };
};

export default useAnalytics;
