FlowRouter.route('/', {
	action: function() {
		BlazeLayout.render("_layout", {content: "main"});
	}
});

FlowRouter.route('/share', {
	action: function() {
		BlazeLayout.render("_layout", {content: "share"});
	}
});

FlowRouter.route('/notification', {
	action: function() {
		BlazeLayout.render("_layout", {content: "notification"});
	}
});

FlowRouter.route('/subscribe', {
	action: function() {
		BlazeLayout.render("_layout", {content: "subscribePage"});
	}
});

FlowRouter.route('/hotTopic', {
	action: function() {
		BlazeLayout.render("_layout", {content: "hotTopic"});
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

FlowRouter.route('/userabout/:userId', {
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

FlowRouter.route('/replycomment/:_id', {
	action: function() {
		BlazeLayout.render("_layout", {content: "replyComment"});
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

FlowRouter.route('/searchPage', {
	action: function() {
		BlazeLayout.render("_layout", {content: "searchBox"});
	}
});

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render("_layout", {content: "_404"});
  }
};

