import {Meteor} from 'meteor/meteor';
import './comment.html';
import './commentPost.js';

Template.comment.onCreated(function() {
	
});


Template.comment.helpers({
	
	commentsCount: function() {
		let id = FlowRouter.getParam('_id');
		return Comments.find({videoId: id}).count();
	},
});

Template.comment.events({
	'submit form': function(e, template) {
		e.preventDefault();
		let user = Meteor.user();
		let userId = user._id;
		let username = user.username;
		if (userId === null) {
			FlowRouter.go('/login');
		}
		let videoId = FlowRouter.getParam('_id');
		let cursor = files.findOne({_id: videoId});
		let videoOfUserId = cursor.userId;
		let videoOfUsername = cursor.meta.username;
		let body = document.getElementById("commentText").value;
		console.log(body);

		
		
		let comment = Comments.insert({
			videoId: videoId,
			userId: userId,
			username: username,
			body: body,
			submitted: new Date()
		});
		console.log("comment success");
		body = '';
		Notifications.insert({
			notificationUserId: videoOfUserId,
			userId: userId,
			username: username,
			videoId: videoId,
			commentId: comment._id,
			message: "comment on your video",
			read: false
		});
	}
});