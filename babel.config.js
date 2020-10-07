module.exports = (api) => {
  api.cache(false);
  return {
    presets: [
      'module:react-native-dotenv',
      'module:metro-react-native-babel-preset',
    ],
    plugins: [
      '@babel/plugin-transform-flow-strip-types',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-regenerator',
      '@babel/plugin-transform-runtime',
    ],
  };
};
