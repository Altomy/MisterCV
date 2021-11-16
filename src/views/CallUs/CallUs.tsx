/** CallUs.tsx */

// ========== Imports ========== //
import React, { useState } from "react";

import {
  Box,
  Button,
  ScrollView,
  Text,
  TextArea,
  TextField,
} from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";
import fetcher from "utils/fetcher";
import { useToast } from "native-base";
import { useTranslation } from "react-i18next";
import MainHeader from "components/MainHeader";
// ========== propsTypes ========== //
export type propsTypes = {
  navigation: StackNavigationProp<RootStackParamList, "CallUs">;
};

/** MainFunction */
let CallUs: React.FC<propsTypes> = (props) => {
  /** @kind: Props */

  /** @kind: Hooks */
  let { t } = useTranslation("translation", { keyPrefix: "callUs" });
  let [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });
  let toast = useToast();
  /** @kind: Methods */
  let [loading, setLoading] = useState(false);
  let Store = async () => {
    setLoading(true);
    let { error } = await fetcher.post("/main/store/callUs", form);
    if (error) {
      toast.show({
        title: t("errorPleaseTryAgainLater"),
        status: "error",
      });
      return;
    }
    toast.show({
      title: t("sendMessageSuccess"),
      status: "success",
      description: t("weHaveYourMessage"),
    });
    setLoading(false);
    setTimeout(() => {
      props.navigation.goBack();
    }, 1000);
  };
  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Box flex={1}>
      <MainHeader
        title={t`title`}
        back="none"
        onPressBack={() => {
          props.navigation.goBack();
        }}
      />
      <Box flex={1} p={1}>
        <ScrollView>
          <Text py={1}>{t("sendDirectMessageToUs")}</Text>
          <TextField
            placeholder={t("name")}
            value={form.name}
            onChangeText={(val) => setForm({ ...form, name: val })}
          />
          <TextField
            placeholder={t("phone")}
            value={form.phone}
            onChangeText={(val) => setForm({ ...form, phone: val })}
          />
          <TextArea
            placeholder={t("message")}
            value={form.message}
            onChangeText={(val) => setForm({ ...form, message: val })}
          />
          <Button mt={2} size="sm" isLoading={loading} onPress={Store}>
            {t("send")}
          </Button>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default CallUs;
