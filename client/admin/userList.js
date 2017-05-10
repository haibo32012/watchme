import './userList.html';

Template.userList.helpers({
	file: function() {
		return Meteor.users.find({});
	},
	userCount: function() {
		return Meteor.users.find().count();
	},
	canshow: function() {
		let user = Meteor.user();
		if (user.profile.role === 'admin') {
			return true;
		} else {
			return false;
		}
	}
});