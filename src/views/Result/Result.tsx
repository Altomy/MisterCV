/** CvDetails.tsx */

// ========== Imports ========== //
import React, { useEffect } from "react";
import { Box, ScrollView } from "native-base";
import MainHeader from "components/MainHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import BottomButton from "components/BottomButton";
import DetailsList from "components/DetailsList";
import BottomSheet from "components/BottomSheet";
import { useCv } from "context/CvProvider";
import useStorageOrms from "hooks/useStorageOrms";
import CvPreview from "./CvPreview";
import useToggle from "hooks/useToggle";
import OpeningLoaderBox from "components/OpeningLoaderBox";
import AnimatedFixBox from "components/AnimatedFixBox";
import NavigationMenu from "views/components/NavigationMenu";
import { useTranslation } from "react-i18next";
import useAds from "hooks/useAds";
import ads from "utils/ads";
import useAnalytics from "hooks/useAnalytics";
import { useAuth } from "context/AuthProvider";

// ========== propsTypes ========== //
export type propsTypes = {
  navigation: StackNavigationProp<RootStackParamList, "Result">;
};

/** MainFunction */
let Result: React.FC<propsTypes> = (props) => {
  /** @kind: Props */
  let { Cv } = useCv();
  let { findValue, whereAllValues } = useStorageOrms();
  let { t } = useTranslation();
  let { Auth } = useAuth();
  let { showInterstitial } = useAds();
  let [show, toggleShow] = useToggle();
  let [sideBar, toggleSideBar] = useToggle(false);
  let [loaded, toggleLoad] = useToggle();
  /** @kind: Hooks */
  let [showBottomSheet, setShowBottomSheet] = React.useState(false);

  let [personalDetails, setPersonalDetails] = React.useState<string[][]>([]);
  let [personalDetailsData, setPersonalDetailsData] =
    React.useState<PersonalDetailsType>({
      fullName: "",
      jobTitle: "",
      phone: "",
      cv_id: "",
      ID: "",
      CreatedAt: new Date(),
    });
  let [educations, setEducations] = React.useState<string[][]>([]);
  let [educationsData, setEducationsData] = React.useState<Educations[]>([]);
  let [works, setWorks] = React.useState<string[][]>([]);
  let [worksData, setWorksData] = React.useState<Works[]>([]);
  let [skills, setSkills] = React.useState<string[][]>([]);
  let [skillsData, setSkillsData] = React.useState<Skills[]>([]);
  let [courses, setCourses] = React.useState<string[][]>([]);
  let [coursesData, setCoursesData] = React.useState<Courses[]>([]);

  let { createAnalyticsEvent } = useAnalytics();

  let builder = async () => {
    let _personalDetails = await findValue<PersonalDetailsType>(
      "PersonalDetails",
      {
        key: "cv_id",
        value: Cv.cv.ID,
      }
    );
    if (_personalDetails) {
      setPersonalDetailsData(_personalDetails);
      let list: string[][] = [
        [t`personalDetails.form.fullName.label`, _personalDetails.fullName],
        [t`personalDetails.form.phone.label`, _personalDetails.phone],
        [
          t`personalDetails.form.jobTitle.label`,
          _personalDetails.jobTitle ? _personalDetails.jobTitle : "",
        ],
        [
          t`personalDetails.form.country.label`,
          _personalDetails.country ? _personalDetails.country : "",
        ],
        [
          t`personalDetails.form.city.label`,
          _personalDetails.city ? _personalDetails.city : "",
        ],
        [
          t`personalDetails.form.bio.label`,
          _personalDetails.bio ? _personalDetails.bio : "",
        ],
      ];
      setPersonalDetails(list);
    }

    let _education = await whereAllValues<Educations>("Educations", {
      key: "cv_id",
      value: Cv.cv.ID,
    });
    if (_education) {
      setEducationsData(_education);
      let list: string[][] = _education.map((_list) => {
        let _collage = `${_list.collage} 
${_list.start} / ${_list.end}`;
        return [_list.title, `${_collage}`];
      });
      setEducations(list);
    }

    let _works = await whereAllValues<Works>("Works", {
      key: "cv_id",
      value: Cv.cv.ID,
    });
    if (_works) {
      setWorksData(_works);
      let list: string[][] = _works.map((_list) => {
        let _company = `${_list.company} 
${_list.start} / ${_list.end}`;
        return [_list.title, `${_company}`];
      });
      setWorks(list);
    }

    let _skills = await whereAllValues<Skills>("Skills", {
      key: "cv_id",
      value: Cv.cv.ID,
    });
    if (_skills) {
      setSkillsData(_skills);
      let list: string[][] = _skills.map((_list) => {
        return [_list.title, `${_list.description}`];
      });
      setSkills(list);
    }

    let _courses = await whereAllValues<Courses>("Courses", {
      key: "cv_id",
      value: Cv.cv.ID,
    });
    if (_courses) {
      setCoursesData(_courses);
      let list: string[][] = _courses.map((_list) => {
        let _company = `${_list.company} 
${_list.start} / ${_list.end}`;
        return [_list.title, `${_company}`];
      });
      setCourses(list);
    }

    toggleShow(true);
    toggleLoad(true);
  };

  useEffect(() => {
    builder();
  }, []);

  /** @kind: Methods */

  /** @kind: Views */

  // ==== RETURN METHOD ==== //
  return (
    <Box flex={1}>
      <MainHeader
        title={t`result.title`}
        back={t`result.back`}
        menu="right"
        onPressMenu={() => {
          toggleSideBar(true);
        }}
        titleStyle={{ fontSize: "md" }}
        menuColor="pink.500"
        onPressBack={() => {
          props.navigation.goBack();
        }}
      />
      <Box flex={1}>
        <OpeningLoaderBox show={loaded}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {personalDetails.length !== 0 && (
              <DetailsList
                containerStyles={{ p: 1, mt: 3 }}
                title={t`personalDetails.back`}
                list={personalDetails}
              />
            )}

            {educations.length !== 0 && (
              <DetailsList
                containerStyles={{ p: 1, mt: 3 }}
                title={t`educations.back`}
                list={educations}
              />
            )}

            {works.length !== 0 && (
              <DetailsList
                containerStyles={{ p: 1, mt: 3 }}
                title={t`works.back`}
                list={works}
              />
            )}

            {skills.length !== 0 && (
              <DetailsList
                containerStyles={{ p: 1, mt: 3 }}
                title={t`skills.back`}
                list={skills}
              />
            )}

            {courses.length !== 0 && (
              <DetailsList
                containerStyles={{ p: 1, mt: 3 }}
                title={t`courses.back`}
                list={courses}
              />
            )}

            <Box height={128}></Box>
          </ScrollView>
        </OpeningLoaderBox>
      </Box>

      <BottomButton
        title={t`result.create`}
        arrowIcon="chevron"
        color="pink.500"
        onPress={async () => {
          setShowBottomSheet(true);
          await showInterstitial(
            ads.generateCV ? ads.generateCV : "",
            Auth.userAds
          );
          await createAnalyticsEvent("CreateCV", "Result");
        }}
      />
      {showBottomSheet && (
        <BottomSheet
          absoluteStyles={{ bgColor: "rgba(0,0,0,0.5)" }}
          onClose={() => {
            setShowBottomSheet(false);
          }}
          headerTitle={t`result.preview`}
        >
          {show && (
            <CvPreview
              personalDetails={personalDetailsData}
              educations={educationsData}
              skills={skillsData}
              courses={coursesData}
              works={worksData}
            />
          )}
        </BottomSheet>
      )}
      {sideBar && (
        <AnimatedFixBox
          onClose={() => {
            toggleSideBar(false);
          }}
        >
          <NavigationMenu />
        </AnimatedFixBox>
      )}
    </Box>
  );
};

export default Result;
