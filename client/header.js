import {Meteor} from 'meteor/meteor';
import './header.html';

Template.header.onCreated(function() {
	let self = this;
	self.autorun(function() {
		let id = Meteor.userId();
		self.subscribe('users.all', id);
	});
});

Template.header.helpers({
	user: function() {
		return Meteor.user();
	}
});