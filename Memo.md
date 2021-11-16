# Memo :fa-sticky-note:

## Change Language.

```javascript
let changeLanguage = async (language: "en" | "ar") => {
  await AsyncStorage.setItem("language", language);
  i18n.changeLanguage(language);
  I18nManager.forceRTL(t("dir") == "rtl" ? true : false);
  await Updates.reloadAsync();
};
```

## navigation.

```javascript
import { StackNavigationProp } from "@react-navigation/stack";
export type propsTypes = {
  navigation: StackNavigationProp<RootStackParamList, "Home">,
};
```

## Fetcher.

```javascript
let { data, error } = await fetcher.get<Categories[]>("/main/indexx");
    if (error) {
      console.log(error.response);
      return;
    }
    console.log(data);
```

## Set Orm page

```javascript
/**
 * useCv => To Get cv_id;
 * complete,toggleComplete => to set its complete to make fields its have complete or not
 * showError => to view error
 * show => To load data then preview the show
 * data => to set the data {personalDetails}
 */
let { Cv } = useCv();
let [complete, toggleComplete] = useToggle(false);
let { showError } = useAlerts();
let { findValue, update } = useStorageOrms();
let [show, toggleShow] = useToggle(false);
let [data, setData] =
  React.useState <
  PersonalDetailsType >
  {
    fullName: "",
    phone: "",
    jobTitle: "",
    ID: 0,
    CreatedAt: new Date(),
    cv_id: Cv.cv.ID,
  };

let checker = async () => {
  // get value and check its not undefined
  let value =
    (await findValue) <
    PersonalDetailsType >
    ("PersonalDetails",
    {
      key: "cv_id",
      value: Cv.cv.ID,
    });
  if (value) {
    // set data if have values
    setData(value);
    // toggleComplete
    toggleComplete(true);
  }
  // toggle show
  toggleShow(true);
};

// store
let store = async (values: PersonalDetailsType) => {
  // get values and add cv_id to it and ID to it and check with cv_id
  let newValue =
    (await update) <
    PersonalDetailsType >
    ("PersonalDetails",
    { key: "cv_id", value: Cv.cv.ID },
    { ...values, cv_id: Cv.cv.ID, ID: data.ID });
  // if success
  if (newValue) {
    //store the new data
    setData(newValue);
  }
};

useEffect(() => {
  checker();
}, []);
```
