import { Meteor } from 'meteor/meteor';
import './myVideoList.html';

Template.myVideoList.onCreated(function() {
	let self = this;
	self.autorun(function() {
		let id = Meteor.userId();
		self.subscribe('files.all', id);
	});
});

Template.myVideoList.helpers({
	file: function() {
		let id = Meteor.userId();
		return files.find({userId: id}) || {};
	}
});