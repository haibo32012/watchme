FlowRouter.route('/', {
	action: function() {
		BlazeLayout.render("_layout", {content: "hotTopic"});
	}
});

FlowRouter.route('/login', {
	action: function() {
		BlazeLayout.render("login");
	}
});

FlowRouter.route('/myshare', {
	action: function() {
		BlazeLayout.render("_layout", {content: "share"});
	}
});

FlowRouter.route('/myLikedVideos', {
	action: function() {
		BlazeLayout.render("_layout", {content: "userLikeVideos"});
	}
});

FlowRouter.route('/notification', {
	action: function() {
		BlazeLayout.render("_layout", {content: "notification"});
	}
});

FlowRouter.route('/myWatchedVideos', {
	action: function() {
		BlazeLayout.render("_layout", {content: "watchedVideos"});
	}
});

FlowRouter.route('/subscribe', {
	action: function() {
		BlazeLayout.render("_layout", {content: "subscribePage"});
	}
});

FlowRouter.route('/hotTopic', {
	action: function() {
		BlazeLayout.render("_layout", {content: "home"});
	}
});

FlowRouter.route('/user', {
	action: function() {
		BlazeLayout.render("_layout", {content: "user"});
	}
});


FlowRouter.route('/user/:_id', {
	action: function() {
		BlazeLayout.render("_layout", {content: "userProfileForOthers"});
	}
});

//	FlowRouter.route('/userabout/:userId', {
//		action: function() {
//			BlazeLayout.render("_layout", {content: "about"});
//		}
//	});

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

FlowRouter.route('/update/:_id', {
	action: function() {
		BlazeLayout.render("_layout", {content: "updatePage"});
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

//	FlowRouter.route('/videos/:userId', {
//		action: function() {
//			BlazeLayout.render("_layout", {content: "userVideoList"});
//		}
//	});

FlowRouter.route('/mysubscribe', {
	action: function() {
		BlazeLayout.render("_layout", {content: "mySubscribeUser"});
	}
});

FlowRouter.route('/myvideolist', {
	action: function() {
		BlazeLayout.render("_layout", {content: "myVideoList"});
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

