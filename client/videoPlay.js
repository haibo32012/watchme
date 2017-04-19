import { Meteor } from 'meteor/meteor';
import './videoPlay.html';
import './comment.js';
import './toggleButton.js';
import './subscribe.js';
import './relatedList.js';

Template.videoPlay.onCreated(function() {
	let self = this;
	self.autorun(function() {
		let id = FlowRouter.getParam('_id');
		self.subscribe('files.all', id);
	});
});

Template.videoPlay.helpers({
	file: function() {
		let id = FlowRouter.getParam('_id');
		let file = files.findOne({_id: id}) || {};
		return file;
	}
});

Template.videoPlay.events({
	
});