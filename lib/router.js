FlowRouter.route('/', {
	action: function() {
		BlazeLayout.render("_layout", {content: "main"});
	}
});

FlowRouter.route('/subscribe', {
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


FlowRouter.route('/user/:userId', {
	action: function() {
		BlazeLayout.render("_layout", {content: "userProfileForOthers"});
	}
});

FlowRouter.route('/user/about/:userId', {
	action: function() {
		BlazeLayout.render("_layout", {content: "about"});
	}
});

FlowRouter.route('/user/review/:userId', {
	action: function() {
		BlazeLayout.render("_layout", {content: "userReview"});
	}
});

FlowRouter.route('/post/:_id', {
	action: function() {
		BlazeLayout.render("_layout", {content: "videoPlay"});
	}
});

FlowRouter.route('/upload', {
	action: function() {
		BlazeLayout.render("_layout", {content: "uploadForm"});
	}
});

FlowRouter.route('/videos/:userId', {
	action: function() {
		BlazeLayout.render("_layout", {content: "userVideoList"});
	}
});

FlowRouter.route('/subscribe/:userId', {
	action: function() {
		BlazeLayout.render("_layout", {content: "mySubscribeUser"});
	}
});

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render("_layout", {content: "_404"});
  }
};

