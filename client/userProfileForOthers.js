import './userProfileForOthers.html';

Template.userProfileForOthers.helpers({
	userId: function() {
		console.log(FlowRouter.getParam('userId'));
		return FlowRouter.getParam('userId');
	}
});