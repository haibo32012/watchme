import './userVideoList.html';

Template.userVideoList.onCreated(function() {
	let self = this;
	self.autorun(function() {
		let id = FlowRouter.getParam('userId');
		self.subscribe('files.all', id);
	});
});

Template.userVideoList.helpers({
	file: function() {
		let id = FlowRouter.getParam('userId');
		return files.find({userId: id}) || {};
	}
});