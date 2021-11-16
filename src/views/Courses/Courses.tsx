/** CvDetails.tsx */

// ========== Imports ========== //
import React, { useEffect } from "react";
import { Platform, useWindowDimensions } from "react-native";
import { Box, Icon, ScrollView } from "native-base";
import MainHeader from "components/MainHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import FormBuilder from "components/FormBuilder";
import BottomButton from "components/BottomButton";
import TitleDivider from "components/TitleDivider";
import Tables, { colsType } from "components/Tables";
import { Ionicons } from "@expo/vector-icons";
import { useCv } from "context/CvProvider";
import useAlerts from "hooks/useAlerts";
import useStorageOrms from "hooks/useStorageOrms";
import useToggle from "hooks/useToggle";
import OpeningLoaderBox from "components/OpeningLoaderBox";
import AnimatedFixBox from "components/AnimatedFixBox";
import NavigationMenu from "views/components/NavigationMenu";
import { useTranslation } from "react-i18next";
import useKeyboard from "hooks/useKeyboard";
import useAds from "hooks/useAds";
import ads from "utils/ads";
import { useAuth } from "context/AuthProvider";

// ========== propsTypes ========== //
export type propsTypes = {
  navigation: StackNavigationProp<RootStackParamList, "Courses">;
};

/** MainFunction */
let Courses: React.FC<propsTypes> = (props) => {
  /** @kind: Props */

  /** @kind: Hooks */
  let { width } = useWindowDimensions();
  let [sideBar, toggleSideBar] = useToggle(false);
  let { Auth } = useAuth();
  let { t } = useTranslation("translation", { keyPrefix: "courses" });
  let { showInterstitial } = useAds();
  /** @kind: Methods */
  let { Cv } = useCv();
  let [complete, toggleComplete] = useToggle(false);
  let { showError } = useAlerts();
  let { whereAllValues, removeValue, createValue } = useStorageOrms();
  let [show, toggleShow] = useToggle(false);
  let [data, setData] = React.useState<Courses>({
    title: "",
    company: "",
    start: "",
    end: "",
    description: "",
    ID: "",
    CreatedAt: new Date(),
    cv_id: Cv.cv.ID,
  });

  let [list, setList] = React.useState<colsType>([]);

  let [keyboardStatus] = useKeyboard();

  /**
   * FireCall
   * checker => to check the value if have with the cv_id
   */
  let checker = async () => {
    // get value and check its not undefined
    let value = await whereAllValues<Courses>("Courses", {
      key: "cv_id",
      value: Cv.cv.ID,
    });
    if (value) {
      // set data if have values
      let listValue: colsType = value.map((_val) => {
        return [
          { element: _val.title, width: width / 3 },
          { element: _val.company, width: width / 3 },
          { element: _val.start, width: width / 3 },
          { element: _val.end, width: width / 3 },
          { element: _val.description, width: width / 3 },
          {
            element: (
              <Icon
                as={<Ionicons name="trash-outline" />}
                onPress={() => {
                  remove(_val.ID);
                }}
                size={5}
                color="red.600"
              />
            ),
            width: width / 3,
          },
        ];
      });

      setList(listValue);
    }
    // toggle show
    toggleShow(true);
    await showInterstitial(ads.skills ? ads.skills : "", Auth.userAds);
  };

  // store
  let store = async () => {
    if (!complete) {
      showError(t`error`);
      return;
    }
    // get values and add cv_id to it and ID to it and check with cv_id
    let newValue = await createValue<Courses>(
      { ...data, cv_id: Cv.cv.ID, ID: data.ID },
      "Courses"
    );
    // if success
    if (newValue) {
      //store the new data
      let _newList = [...list];
      let ID = newValue.ID;
      _newList.push([
        { element: newValue.title, width: width / 3 },
        { element: newValue.company, width: width / 3 },
        { element: newValue.start, width: width / 3 },
        { element: newValue.end, width: width / 3 },
        { element: newValue.description, width: width / 3 },
        {
          element: (
            <Icon
              as={<Ionicons name="trash-outline" />}
              onPress={() => {
                remove(ID);
              }}
              size={5}
              color="red.600"
            />
          ),
          width: width / 3,
        },
      ]);
      setList(_newList);
      setData({
        title: "",
        company: "",
        start: "",
        end: "",
        description: "",
        ID: "",
        CreatedAt: new Date(),
        cv_id: Cv.cv.ID,
      });

      toggleShow(false);
      toggleShow(true);
      toggleComplete(false);
    }
  };

  let remove = async (ID: string) => {
    let values = await removeValue<Courses>("Courses", {
      key: "ID",
      value: ID,
    });
    if (values) {
      let listValue: colsType = values.map((_val) => {
        return [
          { element: _val.title, width: width / 3 },
          { element: _val.company, width: width / 3 },
          { element: _val.start, width: width / 3 },
          { element: _val.end, width: width / 3 },
          { element: _val.description, width: width / 3 },
          {
            element: (
              <Icon
                as={<Ionicons name="trash-outline" />}
                onPress={() => {
                  remove(_val.ID);
                }}
                size={5}
                color="red.600"
              />
            ),
            width: width / 3,
          },
        ];
      });
      setList(listValue);
    }
  };

  useEffect(() => {
    checker();
  }, []);

  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Box flex={1}>
      <MainHeader
        title={t`title`}
        titleStyle={{ fontSize: "md" }}
        back={t`back`}
        menu="right"
        onPressMenu={() => {
          toggleSideBar(true);
        }}
        menuColor="pink.500"
        onPressBack={() => {
          props.navigation.goBack();
        }}
      />
      <Box flex={1}>
        <OpeningLoaderBox show={show}>
          <ScrollView>
            {show && (
              <FormBuilder
                containerStyles={{ p: 1 }}
                stackStyles={{ mt: 2 }}
                labelStyles={{ py: 0, my: 0.5 }}
                inputStyles={{ my: 0, variant: "filled" }}
                spacing={2}
                inputs={[
                  [
                    {
                      name: "title",
                      label: t`form.title.label`,
                      placeHolder: t`form.title.placeHolder`,
                      value: "",
                      require: true,
                    },
                  ],
                  [
                    {
                      name: "company",
                      label: t`form.place.label`,

                      placeHolder: t`form.place.placeHolder`,
                      value: "",
                      require: true,
                    },
                  ],
                  [
                    {
                      name: "start",
                      label: t`form.start.label`,
                      placeHolder: t`form.start.placeHolder`,

                      value: "",
                      require: true,
                    },
                    {
                      name: "end",
                      label: t`form.end.label`,
                      placeHolder: t`form.end.placeHolder`,

                      value: "",
                      require: true,
                    },
                  ],
                  [
                    {
                      name: "description",
                      label: t`form.description.label`,
                      placeHolder: t`form.description.placeHolder`,

                      value: "",
                      require: false,
                    },
                  ],
                ]}
                onComplete={(value) => {
                  toggleComplete(true);
                  setData({
                    ...data,
                    title: value.title,
                    company: value.company,
                    start: value.start,
                    end: value.end,
                    description: value.description,
                  });
                }}
                onError={() => {
                  toggleComplete(false);
                }}
              />
            )}
            <TitleDivider
              title={t`list`}
              addAction
              containerStyles={{ mt: 3, mb: 3 }}
              onPressAdd={store}
            />
            <Tables
              headers={[
                { element: t`form.title.label`, width: width / 3 },
                { element: t`form.place.label`, width: width / 3 },
                { element: t`form.start.label`, width: width / 3 },
                { element: t`form.end.label`, width: width / 3 },
                { element: t`form.description.label`, width: width / 3 },
                {
                  element: t`remove`,
                  width: width / 3,
                },
              ]}
              cols={list}
            />
            <Box height={128}></Box>
          </ScrollView>
        </OpeningLoaderBox>
      </Box>
      {sideBar && (
        <AnimatedFixBox
          onClose={() => {
            toggleSideBar(false);
          }}
        >
          <NavigationMenu />
        </AnimatedFixBox>
      )}
      {Platform.OS === "android" && !keyboardStatus && (
        <BottomButton
          title={t`bottomButton`}
          arrowIcon="chevron"
          color="pink.500"
          onPress={() => {
            props.navigation.navigate("Result");
          }}
        />
      )}
      {Platform.OS === "ios" && (
        <BottomButton
          title={t`bottomButton`}
          arrowIcon="chevron"
          color="pink.500"
          onPress={() => {
            props.navigation.navigate("Result");
          }}
        />
      )}
    </Box>
  );
};

export default Courses;
