module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "babel-plugin-styled-components",
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@screens": "./src/screens/",
            "@components": "./src/components/",
            "@api": "./src/api/",
            "@interfaces": "./src/interfaces/",
            "@style": "./src/style/",
            "@hooks": "./src/hooks/",
            "@recoil": "./src/recoil/",
            "@utils": "./src/utils/",
            "@assets": "./assets/",
          },
        },
      ],
    ],
  };
};
