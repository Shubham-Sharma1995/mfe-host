const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "hostApp",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          remoteApp:
            "remoteApp@http://localhost:3000/_next/static/chunks/remoteEntry.js", // Expose your SSR page
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
      })
    );

    return config;
  },
};
