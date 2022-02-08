module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/aitutor-web-interface/" : "/",

  transpileDependencies: [
    'vuetify',
  ],
};
