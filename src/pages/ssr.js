const path = require("path");
const fs = require("fs");
const { render } = require("./path/to/your/ssr/renderFunction");

exports.handler = async (event, context) => {
  const { path: requestPath } = event;

  try {
    // Render the appropriate page
    const html = await render(requestPath);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: html,
    };
  } catch (error) {
    if (error.statusCode === 404) {
      // Serve custom 404 page
      const errorPagePath = path.resolve(__dirname, "../build/404.html");
      const errorHtml = fs.readFileSync(errorPagePath, "utf8");

      return {
        statusCode: 404,
        headers: {
          "Content-Type": "text/html",
        },
        body: errorHtml,
      };
    } else {
      // Serve custom error page for other errors
      const errorPagePath = path.resolve(__dirname, "../build/_error.html");
      const errorHtml = fs.readFileSync(errorPagePath, "utf8");

      return {
        statusCode: 500,
        headers: {
          "Content-Type": "text/html",
        },
        body: errorHtml,
      };
    }
  }
};
