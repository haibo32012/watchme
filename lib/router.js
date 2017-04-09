Router.configure({
	layoutTemplate: 'mainLayout'
});

Router.route('/', function() {
	this.render('showVideo');
});

Router.route('/play', function() {
	this.render('playPage');
});

Router.route('/upload', function() {
	this.render('uploadForm');
});

Router.route('/user', function() {
	this.render('userProfile');
});