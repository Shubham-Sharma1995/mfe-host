const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

module.exports = {
  webpack(config, isServer) {
    config.output.publicPath = "auto";
    if (isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "hostApp",
          filename: "static/chunks/remoteEntry.js",
          remotes: {
            remoteApp:
              "remoteApp@https://aquamarine-rolypoly-b9d699.netlify.app/_next/static/chunks/remoteEntry.js", // Expose your SSR page
          },

          shared: {
            react: {
              singleton: true,

              requiredVersion: false, // Use the version installed in the host app
            },

            "react-dom": {
              singleton: true,

              requiredVersion: false, // Use the version installed in the host app
            },
          },
          extraOptions: {
            force: true,
          },
        })
      );
    }

    return config;
  },
};
