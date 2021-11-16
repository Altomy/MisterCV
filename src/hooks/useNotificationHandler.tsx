import React, { useEffect } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useAuth } from "context/AuthProvider";
import { Subscription } from "expo-modules-core";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

type registerForPushNotificationAsyncType = () => Promise<string | undefined>;

type useNotificationHandlerType = (callOnBuilder?: boolean) => {
  registerForPushNotificationsAsync: registerForPushNotificationAsyncType;
  schedulePushNotification: schedulePushNotificationType;
  cancelSchedule: cancelScheduleType;
  registerReceivedListener: () => {
    subscription: Subscription;
    response: Subscription;
  };
};

type cancelScheduleType = (identifier: string) => Promise<void>;

type schedulePushNotificationType = (
  title: string,
  body: string,
  data: { [key: string]: string },
  trigger: Notifications.NotificationTriggerInput
) => Promise<string | undefined>;

let useNotificationHandler: useNotificationHandlerType = (callOnBuilder) => {
  let { dispatchAuth } = useAuth();

  let callRegisterForNotification = async () => {
    let token = await registerForPushNotificationsAsync();
    if (token) {
      dispatchAuth({ type: "setToken", payload: token });
    }
  };

  useEffect(() => {
    if (callOnBuilder) {
      callRegisterForNotification();
    }
  }, []);

  return {
    registerForPushNotificationsAsync,
    schedulePushNotification,
    cancelSchedule,
    registerReceivedListener,
  };
};

let registerReceivedListener = () => {
  let subscription = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log(notification);
    }
  );

  let response = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      console.log(response);
    }
  );

  return {
    subscription,
    response,
  };
};

let schedulePushNotification: schedulePushNotificationType = async (
  title: string,
  body: string,
  data: { [key: string]: string },
  trigger: Notifications.NotificationTriggerInput
) => {
  try {
    let _trigger = await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: data,
      },
      trigger: trigger,
    });

    return _trigger;
  } catch (error) {
    console.log(error);
    return;
  }
};

let cancelSchedule: cancelScheduleType = async (identifier: string) => {
  await Notifications.cancelScheduledNotificationAsync(identifier);
};

let registerForPushNotificationsAsync: registerForPushNotificationAsyncType =
  async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

export default useNotificationHandler;
