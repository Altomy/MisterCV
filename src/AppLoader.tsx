/** AppLoader.tsx */

// ========== Imports ========== //
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import useNotificationHandler from "hooks/useNotificationHandler";
import { useAuth } from "context/AuthProvider";
import { Subscription } from "expo-modules-core";
import AsyncStorage from "@react-native-async-storage/async-storage";
// ========== propsTypes ========== //
export type propsTypes = {};

const Stack = createNativeStackNavigator<RootStackParamList>();

/** MainFunction */
let AppLoader: React.FC<propsTypes> = (props) => {
  /** @kind: Props */

  /** @kind: Hooks */

  /** @kind: Methods */
  let FinishLoading = React.useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  let Builder = async () => {
    FinishLoading();
  };

  let s: Subscription;
  let r: Subscription;
  let { dispatchAuth } = useAuth();
  let { registerForPushNotificationsAsync, registerReceivedListener } =
    useNotificationHandler();

  let setNotification = async () => {
    let token = await registerForPushNotificationsAsync();
    if (token) {
      dispatchAuth({ type: "setToken", payload: token });

      let hasStorage = await AsyncStorage.getItem("@cvNotificationToggles");
      if (!hasStorage) {
        await AsyncStorage.setItem("@cvNotificationToggles", "received");
      }

      let { subscription, response } = registerReceivedListener();
      s = subscription;
      r = response;
    }
  };
  React.useEffect(() => {
    Builder();
    setNotification();
    return () => {
      if (s) {
        s.remove();
      }
      if (r) {
        r.remove();
      }
    };
  }, []);

  // ==== RETURN METHOD ==== //
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={require("views/Home/Home").default}
        />
        <Stack.Screen
          name="CVDetails"
          component={require("views/CVDetails/CVDetails").default}
        />
        <Stack.Screen
          name="PersonalDetails"
          component={require("views/PersonalDetails/PersonalDetails").default}
        />
        <Stack.Screen
          name="Education"
          component={require("views/Education/Education").default}
        />
        <Stack.Screen
          name="Works"
          component={require("views/Works/Works").default}
        />
        <Stack.Screen
          name="Skills"
          component={require("views/Skills/Skills").default}
        />
        <Stack.Screen
          name="Courses"
          component={require("views/Courses/Courses").default}
        />
        <Stack.Screen
          name="Result"
          component={require("views/Result/Result").default}
        />
        <Stack.Screen
          name="Languages"
          component={require("views/Languages/Languages").default}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="AboutUs"
          component={require("views/AboutUs/AboutUs").default}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="CallUs"
          component={require("views/CallUs/CallUs").default}
          options={{ presentation: "modal" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppLoader;
