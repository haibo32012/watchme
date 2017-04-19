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

		let videoId = FlowRouter.getParam('_id');
		let body = document.getElementById("commentText").value;
		console.log(body);

		let userId = Meteor.userId();
		Comments.insert({
			videoId: videoId,
			userId: userId,
			body: body,
			submitted: new Date()
		});
		console.log("comment success");
		body = '';
	}
});