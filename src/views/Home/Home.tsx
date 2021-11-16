/** Home.tsx */

// ========== Imports ========== //
import React, { useEffect } from "react";
import { Box, Button, HStack, Icon, ScrollView } from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";
import MainHeader from "components/MainHeader";
import { Ionicons } from "@expo/vector-icons";
import EmptyHolder from "components/EmptyHolder";
import useStorageOrms from "hooks/useStorageOrms";
import { useCv } from "context/CvProvider";
import HCard from "components/HCard";
import assets from "assets";
import AnimatedFixBox from "components/AnimatedFixBox";
import useToggle from "hooks/useToggle";
import OpeningLoaderBox from "components/OpeningLoaderBox";
import SidePanel from "./components/SidePanel";
import { useTranslation } from "react-i18next";
import useAnalytics from "hooks/useAnalytics";

// ========== propsTypes ========== //
export type propsTypes = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

/** MainFunction */
let Home: React.FC<propsTypes> = (props) => {
  /** @kind: Hooks */
  let [show, toggleShow] = useToggle(false); // show Content or not
  let [sideBar, toggleSideBar] = useToggle(false); // toggle the side bar @action when click menu button
  let { createModel, removeValue, getAllValues } = useStorageOrms(); // create the model and other things
  let { dispatchCv } = useCv(); // dispatch cv when click new or cv
  let { t } = useTranslation("translation", { keyPrefix: "home" });

  let { enableAnalytics, createAnalyticsEvent } = useAnalytics();

  /** @kind: Props */
  let [cvs, setCvs] = React.useState<CvModel[]>([]); // list of cvs

  /** @kind: Methods */

  // Create the models in the storage when call for first time
  let createModels = React.useMemo(() => {
    return async () => {
      await createModel("Cv");
      await createModel("PersonalDetails");
      await createModel("Educations");
      await createModel("Works");
      await createModel("Skills");
      await createModel("Courses");
    };
  }, []);

  // get list of cvs
  let getCvs = React.useMemo(() => {
    return async () => {
      let states = await getAllValues<CvModel>("Cv");
      if (states) {
        setCvs(states);
      }
      toggleShow(true);
    };
  }, []);

  // Remove cv on click with id and remove all tables with the key and splice from the list
  let removeCv = async (ID: string, index: number) => {
    setCvs((oldCvs) => {
      let newCvs = [...oldCvs];
      newCvs.splice(index, 1);
      return newCvs;
    });
    await removeValue("Cv", { key: "ID", value: ID });
    await removeValue("PersonalDetails", { key: "cv_id", value: ID });
    await removeValue("Educations", { key: "cv_id", value: ID });
    await removeValue("Works", { key: "cv_id", value: ID });
    await removeValue("Skills", { key: "cv_id", value: ID });
    await removeValue("Courses", { key: "cv_id", value: ID });
  };

  let builderAnalytics = async () => {
    await enableAnalytics();
    await createAnalyticsEvent("OpeningApp", "Home");
  };

  // Builder
  useEffect(() => {
    createModels();
    getCvs();
    builderAnalytics();
  }, []);

  // ==== RETURN METHOD ==== //
  return (
    <Box flex={1}>
      {/* Main Header */}
      <MainHeader
        title="MisterCV"
        menu="right"
        leftElement={
          <Icon
            as={<Ionicons name="add-outline" />}
            color="pink.500"
            onPress={() => {
              dispatchCv({
                type: "setCv",
                payload: {
                  title: "",
                  ID: "new",
                  CreatedAt: new Date(),
                  cvLanguage: "en",
                },
              });
              props.navigation.navigate("CVDetails");
            }}
          />
        }
        onPressMenu={async () => {
          toggleSideBar(true);
        }}
        menuColor="pink.500"
      />
      {/* End Main Header */}

      {/* Content */}
      <Box flex={1}>
        {/* Opening loader for make animation loader and on complete or change show props return the children node */}
        <OpeningLoaderBox show={show}>
          {/* If no cvs place the Empty holder */}
          {/* Empty holder make content with image and other things */}
          {cvs.length === 0 && (
            <EmptyHolder
              title={t`youDontHaveAndCv`}
              image
              subTitle={t`addNewCv`}
            />
          )}
          <ScrollView showsVerticalScrollIndicator={false} p={2}>
            {/* Cvs List */}
            {cvs.map((_cv, index) => (
              <HCard
                key={index}
                boxStyles={{ borderBottomWidth: 1, bgColor: "muted.50", mt: 2 }}
                title={_cv.title}
                subTitle={_cv.owner ? _cv.owner : ""}
                image={assets.placeholder.resume}
                moreAction={true}
                moreActionsList={[
                  {
                    title: t`cvCardButtons.share`,
                    onPress: () => {
                      // when click share dispatch the cv to save what the cv get and navigate to result
                      dispatchCv({ type: "setCv", payload: _cv });
                      props.navigation.navigate("Result");
                    },
                  },
                  {
                    title: t`cvCardButtons.remove`,
                    onPress: () => {
                      // remove method
                      removeCv(_cv.ID, index);
                    },
                  },
                ]}
                imageProps={{ resizeMode: "contain" }}
                bottomElement={
                  <HStack alignItems={"center"} space={1}>
                    {/* The buttons display in the bottom of the card */}
                    <Button
                      variant={"ghost"}
                      size="md"
                      flex={1}
                      leftIcon={
                        <Icon as={<Ionicons name="brush-outline" />} size={3} />
                      }
                      onPress={() => {
                        dispatchCv({ type: "setCv", payload: _cv });
                        props.navigation.navigate("CVDetails");
                      }}
                      _text={{ px: 0, mx: 0 }}
                    >
                      {t`cvCardButtons.edit`}
                    </Button>
                    <Button
                      variant={"ghost"}
                      size="md"
                      flex={1}
                      leftIcon={
                        <Icon
                          as={<Ionicons name="browsers-outline" />}
                          size={3}
                        />
                      }
                      colorScheme="blue"
                      onPress={() => {
                        dispatchCv({ type: "setCv", payload: _cv });
                        props.navigation.navigate("Result");
                      }}
                    >
                      {t`cvCardButtons.preview`}
                    </Button>
                  </HStack>
                }
              />
            ))}
          </ScrollView>
        </OpeningLoaderBox>
      </Box>
      {/* End Content */}

      {/* Side bar  */}
      {sideBar && (
        <AnimatedFixBox
          onClose={() => {
            toggleSideBar(false);
          }}
        >
          {/* Side panel have the side menu */}
          <SidePanel />
        </AnimatedFixBox>
      )}
      {/* End Side bar  */}
    </Box>
  );
};

export default Home;
