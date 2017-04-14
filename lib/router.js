Router.configure({
	layoutTemplate: 'mainLayout'
});

Router.route('/', function() {
	this.render('showVideo');
});

Router.route('/post/:_id', {
	name: 'playPage',
	action: function() {
		console.log(files.findOne({_id: this.params._id}));
		this.render('playPage', {
			file: function() {
				return files.findOne({_id: this.params._id})
			}
		});
	}
});

Router.route('/upload', function() {
	this.render('uploadForm');
});

Router.route('/subscribe', function() {
	this.render('subscribePage');
});

Router.route('/user', function() {
	this.render('userProfile');
});