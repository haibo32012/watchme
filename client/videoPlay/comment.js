import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
//import Comments from '../../lib/collections/commentCollection.js';
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
	'submit #commentform': function(e, template) {
		e.preventDefault();
		let user = Meteor.user();
		let userId = user._id;
		let username = user.username;

		if (userId === null) {
			FlowRouter.go('/login');
		}
		let userpicture = user.profile.picture;
		let videoId = FlowRouter.getParam('_id');
		let cursor = files.findOne({_id: videoId});
		let videoOfUserId = cursor.userId;
		let videoOfUsername = cursor.meta.username;
		let body = document.getElementById("commentText").value;
		check(body, String);
		console.log(body);
		// comment object
		let commentObject = {
			videoId: videoId,
			userId: userId,
			username: username,
			userPicture: userpicture,
			body: body,
			submitted: new Date()
		};
		Meteor.call('commentInsert', commentObject, (err) => {
			if (err) {
				alert(err);
			} else {
				console.log("comment success");
			}
		});
		
		e.target.commentBody.value = "";
		let notificationObject = {
			notificationUserId: videoOfUserId,
			userId: userId,
			username: username,
			userpicture: userpicture,
			videoId: videoId,
			commentId: comment._id,
			message: " comment on your video: " + body,
			submitted: new Date(),
			read: false
		};
		Meteor.call('notificationInsert', notificationObject, (err) => {
			if (err) {
				alert(err);
			} else {
				console.log('notification success');
			}
		});
	}
});