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
	});
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
			
			files.update(
				{_id: id},
				{$inc: {
					likecount: -1
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
			
			files.update(
				{_id: id},
				{$inc: {
					likecount: 1
				}},
				//{validate: false},
				{validate: false, filter: false}
			);
		}
	},
	'click #badToggleButton': function() {

	}
});