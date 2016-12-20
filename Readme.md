# Description
It is an angular boilerplate designed as a micro-services architecture.

The main purpose of this boilerplate is to allow developers to start with a basic website integrating some independent components without any big effort.

The components available for this boilerplate are all component you can find on my github with the name AngularXXXXComponent where XXXX is the name of the component such as login.

# Installation
To install this boilerplate, you need to follow the following steps:

Clone or download the project
Run npm install && bower install to install bower/npm dependencies
Run npm default to build and run the project
There are 3 ways to build and run the project:

npm default: build the project without minifying. Use it for development version.
npm default --production: build the project with minifying. Use it for production version.
npm default --debug: build the project with debugging. Use it when you want to check which files are used during each step of the build process.

To add a component to this boilerplate, you can read its README ("Installation inside AngularMicroServicesBoilerplate" paragraph).

# How it works?
This boilerplate and all angular components are built and started by using the same gulp tasks.

The sequencing of these tasks are described in the build.js file. It contains 4 methods:
- **buildClient**: contains the tasks to build correctly the client part of the boilerplate and components.

- **buildServer**: contains the tasks to build correctly the server part of the boilerplate and components.

- **startClient**: contains the tasks to run correctly the client part of the boilerplate and components.

- **startServer**: contains the tasks to run correctly the server part of the boilerplate and components.

The build.js of the boilerplate is more complex than the component one, because the configuration retrieved for all buildconfig.js need to be merged in order to be used correctly by the tasks.

All these tasks used some configuration described in buildconfig.js file by respecting the following template:
```
"clean": {                            // step name
  "taskName": "clean",                // name of gulp task
  "config": {                         // contains all the config used by the gulp task
    ...
  }
}
```

You don't need to touch any of these files except if you want to introduce some specific needs.

Finally, in angular, you need to define the routes for your website which can be the same or not with the components ones. To fix the build/integration of the routes, you need to create a file for each route you want to declare in the routes directory. Once you run the build process, all these routes will be injected at the right place in the app.js file. So please follow this way and don't update it if you want to have something working.

# Gulp tasks
To build an run correctly the boilerplate and the components, several tasks have been designed:
- **build-views**: copy all the html files in dist/client/views directory except for the master page which will be copied in dist/client/. These views are sorted in a way that if two files have the same name, the boilerplate one is kept to the detriment of the component one.

- **build-fonts**: copy all the fonts in dist/client/fonts directory. All duplicates are removed.

- **build-images**: minify (production mode) and copy all the images in dist/client/images. All duplicates are removed.

- **build-internal-scripts**: concat and minify (production mode) all your javascript files in ./dist/client/scripts/internal.js. These files are sorted in a way that if two files have the same name, the boilerplate one is kept to the detriment of the component one.

- **build-internal-styles**: copy and minify (production mode) all the css in dist/client/css.

- **build-external-scripts**: concat and minify (production mode) all the external javascript in dist/client/scripts/vendor.js in a working order. All duplicates are removed.  

- **build-external-styles**: copy and minify (production mode) all the css in dist/client/css.

- **clean**: remove all the directories/files.

- **build-server**: copy package.json in dist/server directory and install the dependencies (not the dev ones).

- **inject-routes**: take all the routes defined in client/routes directory and inject them in client/app.js file.

- **inject**: inject all javascript files existing in dist/client/scripts and all css files existing in dist/client/css in dist/client/index.html.

- **lint**: run javascript code analysis on all your javascript files.

- **tart-client**: start the client with the live reload (production mode).

- **start-server**: start the server.

- **watch-client**: watch all client file(s) and call the appropriate gulp task(s).

- **watch-server**: watch all server file(s) and call the appropriate gulp task(s).
