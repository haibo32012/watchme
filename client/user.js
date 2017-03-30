import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

import "./user.html";

Template.userProfile.helpers({
	user: function() {
		return Meteor.userId();
	}
});