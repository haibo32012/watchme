import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

import "./user.html";

Template.userProfile.helpers({
	userName: function() {
		return Meteor.user().username;
	},

	userId: function() {
		return Meteor.user()._id;
	}
});