import {Meteor} from 'meteor/meteor';
import './comment.html';

Template.comment.onCreated(function() {
	let self = this;
	self.autorun(function() {
		let id = FlowRouter.getParam('_id');
		self.subscribe('Comments.all', id);
	});
});


Template.comment.helpers({
	comment: function() {
		let id = FlowRouter.getParam('_id');
		console.log(id);
		return Comments.findOne({videoId: id}) || {};
	}
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
			body: body
		});
		console.log("comment success");
		body = "";
	}
});