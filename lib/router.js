Router.route('/', function() {
	this.render('showVideo');
});

Router.route('/upload', function() {
	this.render('uploadForm');
});

Router.route('/user', function() {
	this.render('userProfile');
});