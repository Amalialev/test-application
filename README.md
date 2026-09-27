# Test application

## Requirements

NodeJS 16+

## Installing dependencies

To install dependencies run `npm install`

## Running application

By default application is listening on 3000 port, but it can be changed to different via environment variable `PORT`

To run application, execute `npm run start` or `node src/app.js`

## Analytics

Every HTML page automatically gets Google Analytics 4 (gtag.js) injected before `</head>`.
Set the environment variable `GA_MEASUREMENT_ID` to your GA4 measurement ID (e.g. `G-XXXXXXXXXX`) to enable it:

`GA_MEASUREMENT_ID=G-XXXXXXXXXX npm run start`

If the variable is not set, no analytics code is added.
