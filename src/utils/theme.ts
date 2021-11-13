/**
 * Theme
 * @description: Extend theme => native-base;
 * @var: theme => extendTheme({});
 */
import { extendTheme } from "native-base";

// ===== Custom Themes Objects ===== //
let fontConfig = {
  uberMove: {
    300: {
      normal: "uberMove",
    },
    400: {
      normal: "uberMove",
    },
    500: {
      normal: "uberMove",
    },
    600: {
      normal: "uberMove",
    },
    700: {
      normal: "uberMoveBold",
    },
  },
};
let fonts = {
  heading: "uberMove",
  body: "uberMove",
  mono: "uberMove",
};

//theme
const theme = extendTheme({ fontConfig, fonts });

export default theme;
