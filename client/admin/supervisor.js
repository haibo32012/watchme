import './supervisor.html';

Template.supervisor.helpers({
	canshow: function() {
		let user = Meteor.user();
		if (user.profile.role === 'admin') {
			return true;
		} else {
			return false;
		}
	}
});