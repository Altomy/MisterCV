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
