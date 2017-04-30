import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

import "./user.html";

Template.user.onCreated(function() {
	let self = this;
	self.autorun(function() {
		let id = Meteor.userId();
		self.subscribe('users.all', id);
	});
});

Template.user.helpers({
	user: function() {
		return Meteor.user();
	}
});

Template.user.events({
	'click button': function(e) {
		e.preventDefault();
		AccountsTemplates.logout();
	}
});