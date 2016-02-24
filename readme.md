# Pick-A-Template Yeoman Generator

The Pick-A-Template Yeoman Generator will scaffold out a basic node application which includes built-in Sass and Browsersync Gulp tasks as well as the ability to scaffold out Ejs, Jade, Handlebars or Dust templated apps within one generator. Just make your selection when you run the generator!

More templating languages to come. To make a request just write an issue or even make a pull request.

## Feedback

Help me make this better! If something in generator-pick-a-template could be better, or just doesn't work, tell me about it in an [issue](https://github.com/dzaharia1/generator-pick-a-template/issues), or even take a stab at fixing it yourself in a fork and [making a pull request](https://guides.github.com/introduction/flow/). You can do it!

## Getting Started
Before you begin, it will be extremely beneficial to familiarize yourself with [Node.js](http://nodejs.org). You might also want to familiarize yourself with a few templating languages so you know which to choose.

- Jade: http://jade-lang.com/
- Embedded Javascript: http://www.embeddedjs.com/
- Handlebars: http://handlebarsjs.com/
- Dust: https://akdubya.github.io/dustjs/

This generator currently creates a harp project using EJS, vanilla Javascript and Sass, but you can also use Markdown, Jade, LESS, Stylus and Coffeescript for preprocessing your project.

You will need to have NPM installed. Get it at http://nodejs.org.

## Installing Prerequisites: Node, Gulp and Harp

Once you have node installed, use npm to install all prerequisites

`$ npm install -g yo gulp harp`

if you get an EACCESS error, run this command with sudo

## Install this generator

`$ npm install -g generator-pick-a-template`

if you get an EACCESS error, run this command with sudo

## Create your project!

`$ mkdir project-name`
`$ cd project-name`
`$ yo pick-a-template`

## Run the application

To run the site locally for development, just use the command `$ npm run dev`.

If you deploy your site to a platform like Heroku or Bluemix, specify a start command of `npm run start`
