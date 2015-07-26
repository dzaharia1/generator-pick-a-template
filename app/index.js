var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

module.exports = generators.Base.extend({
	prompting: function () {
		var done = this.async();
		this.log(yosay('Welcome to the ' + chalk.red('Node Prototype') + ' generator!'));
		var prompts = [
			{
				name: 'appName',
				message: 'What\s the name of your project?',
				default: this.destinationRoot().split('/')[this.destinationRoot().split('/').length - 1]
			},
			{
				name: 'serverFileName',
				message: 'What do you want to call your server file? (app.js)',
				default: 'app.js'
			},
			{
				name: 'authorName',
				message: 'What is your name?'
			},
			{
				type: 'list',
				name: 'templateOption',
				message: 'Which templating language do you want to use?',
				// choices: ['handlebars', 'dust', 'ejs'],
				choices: ['handlebars', 'dust'],
				default: 'handlebars'
			},
			{
				name: 'autoInstall',
				message: 'Automatically install dependencies after scaffolding?',
				default: 'y'
			}
		];
		this.prompt(
			prompts,
			function (answers) {
			this.appName = answers.appName;
			this.serverFileName = answers.serverFileName;
			this.templateOption = answers.templateOption;
			this.authorName = answers.authorName;
			this.autoInstall = answers.autoInstall === 'y';
			this.templateOptionList = {
				'handlebars': 'express-handlebars',
				'dust': 'dustjs-linkedin'
			}
			done();
		}.bind(this));	},
	configuring: function () {},
	writing: function () {
		var templateExtensions = {
			"handlebars": "hbs",
			"dust": "dust"
		}

		var templates = [
			{ "src": "_app.js", "dest": "app.js" },
			{ "src": "_package.json", "dest": "package.json" },
			{ "src": "_nodemon.json", "dest": "nodemon.json" },
			{ "src": "_gulpfile.js", "dest": "gulpfile.js" },
			{ "src": "_readme.md", "dest": "README.md"},
			{ "src": "_main.scss", "dest": "scss/main.scss" },
			{ "src": "_colors.scss", "dest": "scss/scaffolding/colors.scss" },
			{ "src": "_type.scss", "dest": "scss/scaffolding/type.scss" },
			{ "src": "_grids.scss", "dest": "scss/scaffolding/grids.scss" },
			{ "src": "_ui.js", "dest": "public/scripts/ui.js" },
			{ "src": "_gitignore", "dest": ".gitignore" }
		];

		var directories = [
			'public/img',
			'public/css',
			'views/partials'
		];

		var templateData = {
			appName: this.appName,
			authorName: this.authorName,
			serverFileName: this.serverFileName,
			templateOption: this.templateOption,
			templateOptionList: this.templateOptionList,
			templateExtensions: templateExtensions
		};

		var i = 0;

		this.log(yosay('Alright, let\'s lay down the files!'));

		for (i = 0; i < templates.length; i ++) {
			var thisTemplate = templates[i];
			this.fs.copyTpl(
				this.templatePath(thisTemplate.src),
				this.destinationPath(thisTemplate.dest),
				templateData
			);
		}
		if (this.templateOption === 'handlebars') {
			this.fs.copyTpl(
				this.templatePath('_layout'),
				this.destinationPath('views/layouts/layout.' + templateExtensions[this.templateOption]),
				templateData
			);
		}
		else if (this.templateOption === 'dust') {
			this.fs.copyTpl(
				this.templatePath('_layout'),
				this.destinationPath('views/layout.' + templateExtensions[this.templateOption]),
				templateData
			);
		}

		this.fs.copyTpl(
			this.templatePath('_index'),
			this.destinationPath('views/index.' + templateExtensions[this.templateOption]),
			templateData
		);

		for (i = 0; i < directories.length; i ++) {
			this.mkdir(directories[i])
		}
	},
	install: function() {
		// this.spawnCommand('mkdir', [this.appname]);
		if (this.autoInstall) {
			this.log(yosay('You said you wanted to install dependencies automatically. Let\'s do that.'));
			this.npmInstall(['gulp', 'gulp-sass', 'gulp-autoprefixer', 'gulp-plumber', 'gulp-scss-lint', 'browser-sync'], { 'saveDev': true });
			this.npmInstall(['express', this.templateOptionList[this.templateOption]], { 'save': true });

			if (this.templateOption === 'dust') {
				this.npmInstall(['consolidate'], { 'save': true });
			}
		}
	},
	end: function () {
		if (this.autoInstall) {
			this.log(yosay('All set.' + '\nHappy coding!'));
			this.spawnCommand('npm', ['run', 'dev']);
		}
		else {
			this.log(yosay('All set! To run your app, just execute\n' + chalk.red('$ npm install') + '\n' + chalk.red('$ npm run dev')));
		}
	}
});
