/** AboutUs.tsx */

// ========== Imports ========== //
import React from "react";
import { ScrollView, Box, Text } from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";
import MainHeader from "components/MainHeader";
import { useTranslation } from "react-i18next";

// ========== propsTypes ========== //
export type propsTypes = {
  navigation: StackNavigationProp<RootStackParamList, "AboutUs">;
};

/** MainFunction */
let AboutUs: React.FC<propsTypes> = (props) => {
  let { t } = useTranslation();
  /** @kind: Props */

  /** @kind: Hooks */

  /** @kind: Methods */

  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Box flex={1}>
      <MainHeader
        title={t`home.sidePanel.aboutUs`}
        back="none"
        onPressBack={() => {
          props.navigation.goBack();
        }}
      />
      <Box flex={1} p={1}>
        <ScrollView>
          <Text py={1} fontSize="3xl" textAlign={"center"} mt={4} bold>
            PlusSoft
          </Text>
          <Text px={1} fontSize="md" py={1} mt={1}>
            A team of Creative Minds designing best Apps and Website for the
            World.
          </Text>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default AboutUs;
