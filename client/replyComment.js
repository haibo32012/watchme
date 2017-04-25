import {Meteor} from 'meteor/meteor';
import './replyComment.html';

Template.replyComment.helpers({

});

Template.replyComment.events({
	'submit form': function() {
		e.preventDefault();
		let commentId = FlowRouter.getParam('_id');
		let body = document.getElementById("replycommenttext").value;
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