// navbar router

FlowRouter.route('/', {
	action: function() {
		BlazeLayout.render("_layout", {content: "hotTopic"});
	}
});

FlowRouter.route('/subscribe', {
	action: function() {
		BlazeLayout.render("_layout", {content: "subscribePage"});
	}
});

FlowRouter.route('/subscribedShare', {
	action: function() {
		BlazeLayout.render("_layout", {content: "subsusershare"});
	}
});

FlowRouter.route('/upload', {
	action: function() {
		BlazeLayout.render("_layout", {content: "uploadForm"});
	}
});


FlowRouter.route('/user', {
	action: function() {
		BlazeLayout.render("_layout", {content: "user"});
	}
});

FlowRouter.route('/searchPage', {
	action: function() {
		BlazeLayout.render("_layout", {content: "searchBox"});
	}
});



// user page router

FlowRouter.route('/myvideolist', {
	action: function() {
		BlazeLayout.render("_layout", {content: "myVideoList"});
	}
});

FlowRouter.route('/mysubscribe', {
	action: function() {
		BlazeLayout.render("_layout", {content: "mySubscribeUser"});
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

// User Review Page

FlowRouter.route('/user/review/:userId', {
	action: function() {
		BlazeLayout.render("_layout", {content: "userReview"});
	}
});

// Video Play Page

FlowRouter.route('/post/:_id', {
	action: function() {
		BlazeLayout.render("_layout", {content: "videoPlay"});
	}
});

// Video Update Page

FlowRouter.route('/update/:_id', {
	action: function() {
		BlazeLayout.render("_layout", {content: "updatePage"});
	}
});



// User Information for others

FlowRouter.route('/user/:_id', {
	action: function() {
		BlazeLayout.render("_layout", {content: "userProfileForOthers"});
	}
});


FlowRouter.route('/userShare/:_id', {
	action: function() {
		BlazeLayout.render("_layout", {content: "userShare"});
	}
});

FlowRouter.route('/userLike/:_id', {
	action: function() {
		BlazeLayout.render("_layout", {content: "userLike"});
	}
});

FlowRouter.route('/userAbout/:_id', {
	action: function() {
		BlazeLayout.render("_layout", {content: "userabout"});
	}
});






// Adminstrator Page Router

FlowRouter.route('/supervisor', {
	action: function() {
		BlazeLayout.render("_layout", {content: "supervisor"});
	}
});

FlowRouter.route('/supervisor/users', {
	action: function() {
		BlazeLayout.render("_layout", {content: "userList"});
	}
});

FlowRouter.route('/supervisor/videos', {
	action: function() {
		BlazeLayout.render("_layout", {content: "videoList"});
	}
});


// 404 Page

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render("_layout", {content: "_404"});
  }
};

// User Login Page

FlowRouter.route('/login', {
	action: function() {
		BlazeLayout.render("login");
	}
});
