import './commentPost.html';


Template.commentPost.onCreated(function() {
	let self = this;
	self.autorun(function() {
		let id = FlowRouter.getParam('_id');
		self.subscribe('comments.all', id);
	});
});



Template.videoPlay.helpers({
	file: function() {
		let id = FlowRouter.getParam('_id');
		let file = files.findOne({_id: id}) || {};
		return file;
	}
});


Template.commentPost.helpers({
	comments: function() {
		let id = FlowRouter.getParam('_id');
		console.log(Comments.find({videoId: id}));
		return Comments.find({videoId: id});
	}
});