import { Platform } from "react-native";

export const isDev = true;
let dev = {
  server: "http://192.168.1.108:8082",
  ads: {
    title: Platform.select({ ios: "io", android: "an" }),
  },
};

let release = {
  server: "http://plus-softjo.info:3000",
  ads: {
    title: Platform.select({ ios: "", android: "" }),
  },
};

let env = isDev ? dev : release;
export default env;
