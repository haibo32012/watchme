import { Meteor } from 'meteor/meteor';
import './videoPlay.html';
import './comment.js';
import './toggleButton.js';
import './subscribe.js';
import './relatedList.js';

Template.videoPlay.onCreated(function() {
	let self = this;
	self.autorun(function() {
		let id = FlowRouter.getParam('_id');
		self.subscribe('files.all', id);
		self.subscribe('userWatchedCollection.all');
	});
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
		let id = FlowRouter.getParam('_id');
		let file = files.findOne({_id: id}) || {};
		return file;
	}
});

Template.videoPlay.events({
	'click #goodToggleButton': function() {
		let userId = Meteor.userId();
		let id = FlowRouter.getParam('_id');
		let userLikeObject = UserLikeCollection.findOne({
			userId: userId,
			videoId: id
		});
		console.log(userLikeObject);
		if (userLikeObject !== undefined) {
			UserLikeCollection.remove(userLikeObject._id);
			
			files.update(id,
				{$inc: {
					'meta.like_count': -1
				}},
				//{validate: false},
				{validate: false, filter: false}
			);
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
		}
	},
	'click #badToggleButton': function() {
		let userId = Meteor.userId();
		let id = FlowRouter.getParam('_id');
		let userLikeObject = UserLikeCollection.findOne({
			userId: userId,
			videoId: id
		});
		console.log(userLikeObject);
		if (userLikeObject !== undefined) {
			UserLikeCollection.remove(userLikeObject._id);
			
			files.update(id,
				{$inc: {
					'meta.dislike_count': -1
				}},
				//{validate: false},
				{validate: false, filter: false}
			);
		} else {
			UserLikeCollection.insert({
				userId: userId,
				videoId: id,
				isLike: false
			});
			
			files.update(id,
				{$inc: {
					'meta.dislike_count': 1
				}},
				//{validate: false},
				{validate: false, filter: false}
			);
		}
	}
});