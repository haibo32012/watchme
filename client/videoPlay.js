import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import './videoPlay.html';
import './comment.js';

import './subscribe.js';


Template.videoPlay.onCreated(function() {
	let instance = this;
	let id;

	instance.loaded = new ReactiveVar(0);
	instance.limit = new ReactiveVar(5);
	instance.autorun(function() {
		id = FlowRouter.getParam('_id');
		instance.subscribe('userWatchedCollection.all');
		instance.subscribe('shareCollection.all');
		// get the limit
		var limit = instance.limit.get();
		console.log("Asking for " + limit + " post...");
		//subscribe to the posts publication
		var subscription = instance.subscribe('files.all', limit);
		// if subscription is ready, set limit to newLimit
		if (subscription.ready()) {
			console.log("> Received " + limit + " posts. \n\n");
			instance.loaded.set(limit);
		} else {
			console.log("> subscription is not ready yet. \n\n");
		}
	});

	// cursor
	instance.posts = function() {
		return files.findOne({_id: id},{limit: instance.loaded.get()});
	}
});

Template.videoPlay.onRendered(function() {
	let userId = Meteor.userId();
	let id = FlowRouter.getParam('_id');
	// Insert viewCount into the files collection
	files.update(id,
		{$inc: {
			'meta.view_count': 1
		}},
	);

	// If watched, insert into the userwatchedcollection
	let userWatchedObject = userWatchedCollection.findOne({
		userId: userId,
		videoId: id
	});
	console.log(userWatchedObject);
	if (userWatchedObject !== undefined) {
		return;
	} else {
		userWatchedCollection.insert({
			userId: userId,
			videoId: id,
		});
	}
	
});

Template.videoPlay.helpers({
	file: function() {
		return Template.instance().posts();
	}
});

Template.videoPlay.events({
	'click #goodToggleButton': function() {
		let user = Meteor.user();
		let userId = user._id;
		let username = user.username;
		if (userId === null) {
			alert("Please login");
			return;
		}
		let id = FlowRouter.getParam('_id');
		let file = files.findOne({_id: id}) || {};
		let subscribed = file.userId;

		let userLikeObject = UserLikeCollection.findOne({
			userId: userId,
			videoId: id
		});
		console.log(userLikeObject);
		if (userLikeObject !== undefined) {
			if (userLikeObject.isDislike === true) {
				return;
			} else {
				UserLikeCollection.remove(userLikeObject._id);
			
				files.update(id,
					{$inc: {
						'meta.like_count': -1
					}},
					//{validate: false},
					{validate: false, filter: false}
				);
			}
			
		} else {
			UserLikeCollection.insert({
				userId: userId,
				videoId: id,
				isLike: true
			});
			
			files.update(id,
				{$inc: {
					'meta.like_count': 1
				}},
				//{validate: false},
				{validate: false, filter: false}
			);

			Notifications.insert({
					notificationUserId: subscribed,
					userId: userId,
					username: username,
					videoId: id,
					message: " like you video, congratulations!",
					read: false
			});
		}
	},
	'click #badToggleButton': function() {
		let user = Meteor.user();
		let userId = user._id;
		let username = user.username;
		if (userId === null) {
			alert("Please login");
			return ;
		}
		let id = FlowRouter.getParam('_id');
		let file = files.findOne({_id: id}) || {};
		let subscribed = file.userId;
		let userLikeObject = UserLikeCollection.findOne({
			userId: userId,
			videoId: id
		});
		console.log(userLikeObject);
		if (userLikeObject !== undefined) {
			if (userLikeObject.isLike === true) {
				return;
			} else {
				UserLikeCollection.remove(userLikeObject._id);
			
				files.update(id,
					{$inc: {
						'meta.dislike_count': -1
					}},
				//{validate: false},
				{validate: false, filter: false}
				);
			}
		} else {
			UserLikeCollection.insert({
				userId: userId,
				videoId: id,
				isDislike: true
			});
			
			files.update(id,
				{$inc: {
					'meta.dislike_count': 1
				}},
				//{validate: false},
				{validate: false, filter: false}
			);

			Notifications.insert({
					notificationUserId: subscribed,
					userId: userId,
					username: username,
					videoId: id,
					message: " dislike you video, sorry!",
					read: false
			});
		}
	},
	'click #share': function() {
		let user = Meteor.user();
		let userId = user._id;
		let username = user.username;
		if (userId === null) {
			alert("Please login");
			return ;
		}
		let id = FlowRouter.getParam('_id');
		let file = files.findOne({_id: id}) || {};
		let subscribed = file.userId;
		console.log(userId);
		console.log(id);
		let userShareObject = shareCollection.findOne({
			userId: userId,
			videoId: id
		});
		console.log(userShareObject);
		if (userShareObject !== undefined) {
			shareCollection.remove(userShareObject._id);
			files.update(id,
				{$inc: {
					'meta.share_count': -1
				}},
				//{validate: false},
				{validate: false, filter: false}
			);
		} else {
			shareCollection.insert({
				userId: userId,
				videoId: id
			});
			files.update(id,
				{$inc: {
					'meta.share_count': 1
				}},
				//{validate: false},
				{validate: false, filter: false}
			);
			Notifications.insert({
					notificationUserId: subscribed,
					userId: userId,
					username: username,
					videoId: id,
					message: " share you video, congratulations!",
					read: false
			});
		}
	}
});