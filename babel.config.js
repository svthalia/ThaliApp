module.exports = function (api) {
  api.cache(true);
  const presets = ['react-native'];
  const plugins = ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-regenerator'];
  return { presets, plugins };
};
