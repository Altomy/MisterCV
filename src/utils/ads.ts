import { Platform } from "react-native";
import { isDev } from "./env";

let basic = {
  production: Platform.select({
    ios: "ca-app-pub-8749426160957410/3536522774",
    android: "ca-app-pub-8749426160957410/3317030921",
  }),
  dev: "ca-app-pub-3940256099942544/1033173712",
};

let skills = {
  production: Platform.select({
    ios: "ca-app-pub-8749426160957410/2578664328",
    android: "ca-app-pub-8749426160957410/2167600786",
  }),
  dev: "ca-app-pub-3940256099942544/1033173712",
};

let generateCV = {
  production: Platform.select({
    ios: "ca-app-pub-8749426160957410/8952500985",
    android: "ca-app-pub-8749426160957410/1522757048",
  }),
  dev: "ca-app-pub-3940256099942544/1033173712",
};

let ads = {
  basic: isDev ? basic.dev : basic.production,
  skills: isDev ? skills.dev : skills.production,
  generateCV: isDev ? generateCV.dev : generateCV.production,
};

export default ads;
