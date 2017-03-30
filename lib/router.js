


FlowRouter.route('/', {
	action: function(params) {
		this.render("main");
	}
});

FlowRouter.route('/user/:userId', {
    action: function(params, queryParams) {
    	BlazeLayout.render("mainLayout", {content: "user"});
    }
});