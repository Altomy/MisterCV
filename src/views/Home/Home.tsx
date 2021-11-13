/** Home.tsx */

// ========== Imports ========== //
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Box, Button, Text } from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";
import env from "utils/env";
import fetcher from "utils/fetcher";
import axios from "axios";

// ========== propsTypes ========== //
export type propsTypes = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

/** MainFunction */
let Home: React.FC<propsTypes> = (props) => {
  /** @kind: Props */

  /** @kind: Hooks */

  /** @kind: Methods */
  let Install = async () => {
    let { data, error } = await fetcher.get<Categories[]>("/main/indexx");
    if (error) {
      console.log(error.response);
      return;
    }
    console.log(data);
  };

  useEffect(() => {
    Install();
  }, []);
  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Box safeAreaTop>
      <Text>Home</Text>
    </Box>
  );
};

export default Home;
