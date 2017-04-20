//import {Meteor} from 'meteor/meteor';
import './mySubscribeUser.html';

Template.mySubscribeUser.onCreated(function() {
	let self = this;
	self.autorun(function() {
		let id = FlowRouter.getParam('userId');
		self.subscribe('subscribeuser.all', id);
	});
});

Template.mySubscribeUser.helpers({
	subscribeUser: function() {
		let userId = FlowRouter.getParam('userId');
		return subscribeCollection.find({userId: userId}) || {};
	}
});