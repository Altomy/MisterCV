/** CvPreview.tsx */

// ========== Imports ========== //
import React from "react";
import { useWindowDimensions, Platform } from "react-native";
import { Box, Button, Icon } from "native-base";
import { WebView } from "react-native-webview";
import useWebViews from "hooks/UseWebView/useWebViews";
import basic, { courses, educations, skills, works } from "assets/html/basic";
import { Ionicons } from "@expo/vector-icons";
import useAlerts from "hooks/useAlerts";
import { useTranslation } from "react-i18next";
import { useCv } from "context/CvProvider";
import { ar, de, en, es, fr, hi, nl, pt, tr } from "./cvLanguage";
// ========== propsTypes ========== //
export type propsTypes = {
  personalDetails: PersonalDetailsType;
  educations: Educations[];
  works: Works[];
  skills: Skills[];
  courses: Courses[];
};

/** MainFunction */
let CvPreview: React.FC<propsTypes> = (props) => {
  /** @kind: Props */
  let { height } = useWindowDimensions();
  let { replaceHtmlValues, generatePDF } = useWebViews();
  let { Cv } = useCv();
  let { t, i18n } = useTranslation("translation", { keyPrefix: "result" });

  let { showSuccess } = useAlerts();
  let setSkills: () => string = () => {
    let template = "";

    props.skills.forEach((_s) => {
      let _skill = skills.replace("{title}", _s.title);
      _skill = _skill.replace("{description}", _s.description);
      template = template + _skill;
    });

    return template;
  };

  let setWorks: () => string = () => {
    let template = "";
    props.works.forEach((_w) => {
      let _works = works.replace("{title}", _w.title);
      _works = _works.replace("{company}", _w.company);
      _works = _works.replace("{start}", _w.start);
      _works = _works.replace("{end}", _w.end);
      _works = _works.replace("{description}", _w.description);

      template = template + _works;
    });

    return template;
  };

  let getElement = React.useMemo(() => {
    return () => {
      if (Cv.cv.cvLanguage === "en") {
        return en;
      } else if (Cv.cv.cvLanguage === "ar") {
        return ar;
      } else if (Cv.cv.cvLanguage === "es") {
        return es;
      } else if (Cv.cv.cvLanguage === "hi") {
        return hi;
      } else if (Cv.cv.cvLanguage === "de") {
        return de;
      } else if (Cv.cv.cvLanguage === "fr") {
        return fr;
      } else if (Cv.cv.cvLanguage === "nl") {
        return nl;
      } else if (Cv.cv.cvLanguage === "pt") {
        return pt;
      } else if (Cv.cv.cvLanguage === "tr") {
        return tr;
      } else {
        return en;
      }
    };
  }, []);

  let elements = getElement();

  let setEducations: () => string = () => {
    let template = "";
    props.educations.forEach((_e) => {
      let _education = educations.replace("{title}", _e.title);
      _education = _education.replace("{collage}", _e.collage);
      _education = _education.replace("{start}", _e.start);
      _education = _education.replace("{end}", _e.end);

      template = template + _education;
    });

    return template;
  };
  let setCourses: () => string = () => {
    let template = "";
    props.courses.forEach((_c) => {
      let _course = courses.replace("{title}", _c.title);
      _course = _course.replace("{company}", _c.company);
      _course = _course.replace("{start}", _c.start);
      _course = _course.replace("{end}", _c.end);
      template = template + _course;
    });

    return template;
  };

  let showCountry: () => string = () => {
    let _country = "";
    if (props.personalDetails.country && props.personalDetails.country !== "") {
      _country = props.personalDetails.country;
      if (props.personalDetails.city && props.personalDetails.city !== "") {
        _country = _country + "," + props.personalDetails.city;
      }
    } else {
      if (props.personalDetails.city && props.personalDetails.city !== "") {
        _country = props.personalDetails.city;
      }
    }

    return _country;
  };

  let newValues: valueToChangeType[] = [
    { key: "{fullName}", value: props.personalDetails.fullName },
    { key: "{bio}", value: props.personalDetails.bio },
    {
      key: "{jobTitle}",
      value: props.personalDetails.jobTitle
        ? props.personalDetails.jobTitle
        : "",
    },
    {
      key: "{phone}",
      value: props.personalDetails.phone ? props.personalDetails.phone : "",
    },

    {
      key: "{email}",
      value: props.personalDetails.email ? props.personalDetails.email : "",
    },
    {
      key: "{emailHolder}",
      value: props.personalDetails.email ? props.personalDetails.email : "",
    },
    { key: "{location}", value: showCountry() },
    { key: "{skills}", value: setSkills() },
    { key: "{works}", value: setWorks() },
    { key: "{educations}", value: setEducations() },
    { key: "{courses}", value: setCourses() },
    { key: "{bioHolder}", value: elements.bio },
    { key: "{skillsHolder}", value: elements.skills },
    { key: "{experienceHolder}", value: elements.works },
    { key: "{educationHolder}", value: elements.education },
    { key: "{coursesHolder}", value: elements.courses },
  ];

  let [state, setState] = replaceHtmlValues(basic, newValues);

  /** @kind: Hooks */

  /** @kind: Methods */

  /** @kind: Views */

  // ==== RETURN METHOD ==== //

  return (
    <>
      <Box height={height / 1.3} bgColor="muted.100">
        <WebView
          style={{ width: "100%", height: "100%" }}
          source={{ html: state }}
        />
      </Box>
      <Box py={2} borderTopColor={"black"} borderTopWidth={0.5}>
        <Box flexDir={"row"} alignItems={"center"}>
          <Box flex={1}>
            <Button
              variant={"ghost"}
              colorScheme="success"
              onPress={() => {
                showSuccess("Save success");
              }}
              leftIcon={
                <Icon
                  as={<Ionicons name={"checkmark-done-outline"} />}
                  size={4}
                />
              }
            >
              {t`save`}
            </Button>
          </Box>
          <Box flex={1}>
            <Button
              variant={"ghost"}
              colorScheme="info"
              onPress={() => {
                generatePDF(state);
              }}
              leftIcon={
                <Icon
                  as={
                    <Ionicons
                      name={Platform.select({
                        ios: "ios-share-outline",
                        android: "md-share-outline",
                      })}
                    />
                  }
                  size={4}
                />
              }
            >
              {t`share`}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default React.memo(CvPreview);
