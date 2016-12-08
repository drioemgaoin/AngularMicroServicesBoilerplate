This boilerplate create an Angular v1.5 web site with MVC structure using Flexbox, Font Awesome and Sass.

## Installation
Clone the repository by using the following git command
```
git clone https://github.com/drioemgaoin/AngularMvcBoilerplate.git
```

Then you need to install Nodejs to be able to use npm

[NodeJs Installation](https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js/installer-node-js)

To check is node is installed, run this command
```
$ node -var

// Output
v4.4.2
```

Then, you need to install bower by executing this command
```
$ npm install -g bower
```

Then you need to install the dependencies
```
$ npm install && bower install
```

Finally, to build the solution, you have two choices
- dev mode: build without minify the javascript/css
```
$ gulp default
```

- production mode: build and minify the javascript/css  
```
$ gulp default --production
```

## Description
### Directory structure
This boilerplate is designed as a MVC project.

The project contains two root directories:
- **source**: contains all the files you will create for your project.
- **tasks**: contains all the gulp tasks to build and deploy your project in the dist directory. Normally you don't have to modify these tasks, but you can if you need.

The tree view of the source directory is the following:
- **controllers**: contains all the controllers of your project
- **views**: contains all the views of your project (extension .html)
- **models**: contains all the model of your application. In MVC it means the model used by the view, not directly your domain model.
- **services**: contains the logic to ensure the functionality expected
- **providers**: contains the logic to provide datas i.e you can use a provider to call an API or get datas from a database, etc.
- **images**: contains all the images of your project. The extensions authorized are jpg,jpeg,png,gif. If you want to add a new extensions, don't forget to config in gulpfile.js
- **styles**: contains all the scss of your project. The tree view uses the [7-1 architecture pattern](https://sass-guidelin.es/#architecture)

If you want to update the structure you need to update the gulp tasks as well.  

### Gulp
The project can be build in two modes:
- **development**: the project is built, not minified and the watch mode is activated that means you can add/remove/update any files and see your project updated in real time without stop/start it.
```
$ gulp default
```
- **production**: the project is built, minified and a client/server connection is activated that means any add/remove/update need a stop/start of the project to be seen.
```
$ gulp default --production
```

The build will create a new directory called dist with all files needed by your project to work.

To ensure correctly the build and deployment of your project, I created few gulp tasks to do the job:
- **build-internal-scripts**: build all the javascript you wrote for the project i.e all the javascript you have created in the ./source directory and concat them in ./dist/scripts/internal.js. If production mode is activated internal.js will be minified.
- **build-external-scripts**: build all the javascript coming from the libraries you installed with bower and concat them in ./dist/scripts/vendor.js. If production mode is activated vendor.js will be minified.
- **build-internal-styles**: build main.scss with all scss you wrote for the project i.e all the scss you have created in the source/styles directory and copy it in ./dist/css/main.css. If production mode is activated main.css will be minified.
- **build-external-styles**: build all the css coming from the libraries you installed with bower and copy them in ./dist/css directory. If production mode is activated css files will be minified.
- **build-fonts**: build all the fonts coming from the libraries you installed with bower and copy them in ./dist/fonts directory.
- **build-images**: build, minify all the images and copy them in ./dist/images directory.
- **build-views**: copy all the html files in ./dist/views directory except index.html which is copied in ./dist directory.
- **clean**: remove all files and directories in ./dist directory.
- **lint**: analyses the code of all the javascript you wrote for the project i.e all the javascript you have created in the ./source directory.
- **inject**: injects all the css and javascript files present respectively in ./dist/css and ./dist/scripts in the corresponding block ```<!-- inject:js -->``` or ```<!-- inject:css -->``` in ./dist/index.html.
- **start-client**: create/start node client opening the default root (only for production mode).
- **start-server**: create/start node server with dist directory as a root (only for production mode).
- **watch**: create a live-update website by listening every changes done in your source directory, launching the corresponding task and refresh the browser to see your changes without a stop/start of your project.

## Comments
Don't hesitate to send me any recommendations, suggestions about this boilerplate. I really want to have some returns about does it work well, does it match user expectation, etc.

You can send me any issues you want or contact me to my github email and put the repository name in the subject.
