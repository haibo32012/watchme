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

Template.EasySearch.events({
	'submit form': function() {
		e.preventDefault();
		let body = document.getElementById("searchText").value;
		console.log(body);

		let cursor = FilesIndex.search(body);
		console.log(cursor.fetch());
		console.log(cursor.count());
		FlowRouter.go('/searchPage');
	}
});