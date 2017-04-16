FlowRouter.route('/', {
	action: function() {
		BlazeLayout.render("_layout", {content: "main"});
	}
});

FlowRouter.route('/subscribePage', {
	action: function() {
		BlazeLayout.render("_layout", {content: "subscribePage"});
	}
});

FlowRouter.route('/hotTopics', {
	action: function() {
		BlazeLayout.render("_layout", {content: "hotTopics"});
	}
});

FlowRouter.route('/user', {
	action: function() {
		BlazeLayout.render("_layout", {content: "user"});
	}
});


FlowRouter.route('/post/:_id', {
	action: function() {
		BlazeLayout.render("_layout", {content: "videoPlay"});
	}
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('_layout', '_404');
  },
  title: '404: Page not found'
};

