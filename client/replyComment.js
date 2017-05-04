import {Meteor} from 'meteor/meteor';
import './replyComment.html';

Template.replyComment.onCreated(function() {
	let self = this;
	self.autorun(function() {
		let id = FlowRouter.getParam('_id');
		//console.log(id);
		self.subscribe('comments.all', id);
	});
});

Template.replyComment.helpers({
	comment: function() {
		let Id = FlowRouter.getParam('_id');
		//console.log(Id);
		return Comments.findOne({_id: Id});
	}
});

Template.replyComment.events({
	'click .reply-comment': function() {
		//e.stopPropagation();
		e.preventDefault();
		let commentId = FlowRouter.getParam('_id');
		console.log(commentId);
		let body = document.getElementById("replycommenttext").value;
		console.log(body);
		let userId = Meteor.userId();
		let submitTime = new Date();
		let comment = Comments.update(commentId,
			{$set: {
				replyComment: {
					userId: userId,
					body: body,
					submitTime: submitTime
				}
			}}
		);
		body = '';

	}
});