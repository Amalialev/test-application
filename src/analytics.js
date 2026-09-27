// Google Analytics 4 integration.
// Injects the gtag.js snippet into every HTML response, right before </head>.
// Set GA_MEASUREMENT_ID (e.g. "G-XXXXXXXXXX") to enable it; without it nothing is injected.

var MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;

function getSnippet(measurementId) {
  return (
    '<script async src="https://www.googletagmanager.com/gtag/js?id=' + measurementId + '"></script>\n' +
    "<script>\n" +
    "  window.dataLayer = window.dataLayer || [];\n" +
    "  function gtag(){dataLayer.push(arguments);}\n" +
    "  gtag('js', new Date());\n" +
    "  gtag('config', '" + measurementId + "');\n" +
    "</script>\n"
  );
}

function injectSnippet(html, snippet) {
  var headClose = html.search(/<\/head>/i);
  if (headClose === -1) {
    return html;
  }
  return html.slice(0, headClose) + snippet + html.slice(headClose);
}

function analytics(measurementId) {
  if (!measurementId) {
    return function (req, res, next) {
      next();
    };
  }
  if (!MEASUREMENT_ID_PATTERN.test(measurementId)) {
    throw new Error("Invalid GA_MEASUREMENT_ID: " + measurementId);
  }

  var snippet = getSnippet(measurementId);

  return function (req, res, next) {
    var send = res.send;
    res.send = function (body) {
      var contentType = res.get("Content-Type");
      var isHtml = contentType ? /text\/html/i.test(contentType) : typeof body === "string";
      if (typeof body === "string" && isHtml) {
        body = injectSnippet(body, snippet);
      }
      return send.call(this, body);
    };
    next();
  };
}

module.exports = analytics;
