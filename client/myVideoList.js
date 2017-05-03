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

Template.myVideoList.events({
	'click #deleteVideo': function() {
		Comments.remove({videoId: this._id});
		shareCollection.remove({videoId: this._id});
		UserLikeCollection.remove({videoId: this._id});
		likeComment.remove({videoId: this._id});
		files.remove(this._id);
	}
});