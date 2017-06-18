import { ReactiveVar } from 'meteor/reactive-var';
import {Meteor} from 'meteor/meteor';
import files from '/lib/collections/collection.js';
import subscribeCollection from '/lib/collections/subscribeCollection.js';
import './subscribePage.html';

Template.subscribePage.onCreated(function() {
	// 1.Initialization
	var instance = this;
	let userId = Meteor.userId();
	
	
	// initialize the reactive variables
	instance.loaded = new ReactiveVar(0);
	instance.limit = new ReactiveVar(5);
	// will re-run when the "limit" reactive variables changes
	instance.autorun(function() {
		instance.subscribe('subscribeuser.all');
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
	let subscribeObject = subscribeCollection.find({userId: userId});
	const subscribedUserIdList = subscribeObject.map(doc => doc.subscribedUserId);
	console.log(subscribedUserIdList);
	// cursor
	instance.posts = function() {
		return files.find({userId: {$in: subscribedUserIdList}}, {sort: {"meta.created_at": -1}, limit: instance.loaded.get()});
	}
});

Template.subscribePage.helpers({
	file: function() {
		return Template.instance().posts();
		//let userId = Meteor.userId();
		//let subscribeObject = subscribeCollection.find({userId: userId});
		//const subscribedUserIdList = subscribeObject.map(doc => doc.subscribedUserId);
		//return files.find({userId: {$in: subscribedUserIdList}}, {sort: {'meta.created_at': -1}});
	},
	hasMorePosts: function() {
		return Template.instance().posts().count() >= Template.instance().limit.get();
	}
});



Template.subscribePage.events({
	'click .load-more': function(event, instance) {
		event.preventDefault();
		// get current value for limit, i.e. how many posts are currently displayed
		var limit = instance.limit.get();

		// increase limit by 5 and update it
		limit += 5;
		instance.limit.set(limit);
	}
});