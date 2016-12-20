# Description
It is a token-based authentication component for AngularJS with built-in support for Google and Facebook OAuth providers, as well as Email and Password sign-in.

Obviously, you can add others OAuth providers such as Twitter, Github, etc or add any OAuth 1.0 or OAuth 2.0 provider like Sahat Yalkabov  mentioned in the Satellizer's README.

# Installation
To install this component, you need to follow the following steps:
- Clone or download the project
- Run ```npm install && bower install``` to install bower/npm dependencies
- Run ```npm default``` to build and run the project

There are 3 ways to build and run the project:
- ```gulp default```: build the project without minifying. Use it for development version.
- ```gulp default --production```: build the project with minifying. Use it for production version.
- ```gulp default --debug```: build the project with debugging. Use it when you want to check which files are used during each step of the build process.

# Installation inside AngularMicroServicesBoilerplate
This component can be integrated in the angular boilerplate called AngularMicroServicesBoilerplate. For that, you need to follow the following steps:
- Create a subdirectory in the /source/components/ directory. It is recommended to choose the name of the component you want to use for a better understanding.

For example, you can create the directory source/components/login if you want to use the login component.

- Copy the client/server directory, package.json, bower.json and buildconfig.json in the /source/components/xxxx directory. Create a subdirectoy

From there, you need to follow the 3 steps mentioned in the Installation paragraph at the root of the boilerplate.

# Credits
[Sahat Yalkabov](https://github.com/sahat/) for [Satellizer](https://github.com/sahat/satellizer)

# Comments
Don't hesitate to send me any recommendations, suggestions about this component. I really want to have some returns about does it work well, does it match user expectation, etc.

You can send me any issues you want or contact me to my github email and put the repository name in the subject.
