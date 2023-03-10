module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "babel-plugin-styled-components",
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
            "@assets": "./assets/",
          },
        },
      ],
    ],
  };
};
