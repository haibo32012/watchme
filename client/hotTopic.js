import { ReactiveVar } from 'meteor/reactive-var';
import './hotTopic.html';

Template.hotTopic.onCreated(function() {

	// 1.Initialization
	var instance = this;

	// initialize the reactive variables
	instance.loaded = new ReactiveVar(0);
	instance.limit = new ReactiveVar(5);
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
		return files.find({"meta.view_count": {"$gte": 20}}, {sort: {"meta.created_at": -1}, limit: instance.loaded.get()});
	}

	//let self = this;
	//self.autorun(function() {
		
	//	self.subscribe('files.all');
	//});
});

Template.hotTopic.helpers({
	file: function() {
		return Template.instance().posts();
		//return files.find({"meta.view_count": {"$gte": 30}}, {sort: {"meta.created_at": -1}});
	},
	// are there more posts to show?
	hasMorePosts: function() {
		return Template.instance().posts().count() >= Template.instance().limit.get();
	}
});

Template.hotTopic.events({
	'click .load-more': function(event, instance) {
		event.preventDefault();
		// get current value for limit, i.e. how many posts are currently displayed
		var limit = instance.limit.get();

		// increase limit by 5 and update it
		limit += 5;
		instance.limit.set(limit);
	}
});