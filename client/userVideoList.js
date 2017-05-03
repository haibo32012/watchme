import { ReactiveVar } from 'meteor/reactive-var';
import './userVideoList.html';

Template.userVideoList.onCreated(function() {
	// 1.Initialization
	var instance = this;
	let id = FlowRouter.getParam('userId');
	// initialize the reactive variables
	instance.loaded = new ReactiveVar(0);
	instance.limit = new ReactiveVar(2);
	// will re-run when the "limit" reactive variables changes
	instance.autorun(function() {
		// get the limit
		var limit = instance.limit.get();
		console.log("Asking for " + limit +" posts...");
		//subscribe to the posts publication
		var subscription = instance.subscribe("files.all", limit);

		// if subscription is ready, set limit to newLimit
		if (subscription.ready()) {
			console.log("> Received " + limit + " posts. \n\n");
			instance.loaded.set(limit);
		} else {
			console.log("> Subscription is not ready yet. \n\n");
		}
	});

	// cursor
	instance.posts = function() {
		return files.find({userId: id}, {sort: {"meta.created_at": -1}, limit: instance.loaded.get()});
	}

	//let self = this;
	//self.autorun(function() {
	//	let id = FlowRouter.getParam('userId');
	//	self.subscribe('files.all',id);
	//});
});

Template.userVideoList.helpers({
	file: function() {
		return Template.instance().posts();
	},
	// are there more posts to show?
	hasMorePosts: function() {
		return Template.instance().posts().count() >= Template.instance().limit.get();
	}
});


Template.userVideoList.events({
	'click .load-more': function(event, instance) {
		event.preventDefault();
		// get current value for limit, i.e. how many posts are currently displayed
		var limit = instance.limit.get();

		// increase limit by 5 and update it
		limit += 5;
		instance.limit.set(limit);
	}
});