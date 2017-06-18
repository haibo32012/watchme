import {Meteor} from 'meteor/meteor';
import subscribeCollection from '/lib/collections/subscribeCollection.js';
import './mySubscribeUser.html';

Template.mySubscribeUser.onCreated(function() {
	let self = this;
	self.autorun(function() {
		let id = Meteor.userId();
		self.subscribe('subscribeuser.all', id);
	});
});

Template.mySubscribeUser.helpers({
	subscribeUser: function() {
		let userId = Meteor.userId();
		return subscribeCollection.find({userId: userId}) || {};
	}
});