module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',  // Points to your .env file
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
      }]
    ],
  };
};
