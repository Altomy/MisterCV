module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@context": "./src/context",
            "@routes": "./src/routes",
            "@translations": "./src/translations",
            "@utils": "./src/utils",
            "@views": "./src/views",
          },
        },
      ],
      ["react-native-reanimated/plugin"],
    ],
  };
};
