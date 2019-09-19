# Razor VueJs Project Boilerplate

## Skeleton Project Setup

1. In your favourite editor, globally find and replace CLIENT_NAME with the full name of the project's client
1. Globally find and replace CLIENT_SHORT_NAME with an abridged version of the project's client name
1. Ensure to update brand colours in both the `<head>` of `./index.html` and `./static/manifest.json`
1. Update app artwork, icons and launch screens in `./static/img`
1. Delete this block from your `README.md`

## Razor VueJs Boilerplate Project Framework

This basic boilerplate repository should give you a base VueJ app for you to begin modifying and developing on. Features include:

1. Recommended folder structure and setup
1. Icons and Launch Screen templates with correct resolutions in `./static/img`
1. All meta data in `./index.html` required to kick-start a VueJs PWA
1. A base `robots.txt` file in `./public`
1. `manifest.json` and `sw.js` files in `./static` and `./src/registerServiceWorker.js` respectively
1. Basic routing ready to build out in `./src/router`
1. Basic VueX state & storage management in `./src/store`
1. Cookie and Auth services in `./src/services`
1. Basic SCSS setup in `./src/scss`
1. Basic VueJs components in `./src/components`

## Build Setup

Firstly, update your environment credentials in the `./config` folder

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
