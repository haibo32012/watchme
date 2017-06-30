import { Meteor } from 'meteor/meteor';
import files from '/lib/collections/collection.js';
import Comments from '/lib/collections/commentCollection.js';
import shareCollection from '/lib/collections/sharecollection.js';
import UserLikeCollection from '/lib/collections/userLikeCollection.js';
import likeComment from '/lib/collections/userLikeComment.js';
import userWatchedCollection from '/lib/collections/userWatchedCollection.js';
import './myVideoList.html';

Template.myVideoList.onCreated(function() {
	let self = this;
	self.autorun(function() {
		let id = Meteor.userId();
		self.subscribe('files', id);
	});
});

Template.myVideoList.helpers({
	file: function() {
		let id = Meteor.userId();
		return files.find({userId: id}, {sort: {'meta.created_at': -1}}) || {};
	}
});

Template.myVideoList.events({
	'click #deleteVideo': function() {
		//Comments.remove({videoId: this._id});
		Meteor.call('commentRemove', {videoId: this._id}, (err) => {
			if (err) {
				alert(err);
			} else {
				console.log('comment remove!');
			}
		});
		//shareCollection.remove({videoId: this._id});
		Meteor.call('videoShareRemove', {videoId: this._id}, (err) => {
			if (err) {
				alert(err);
			} else {
				console.log('share collection remove success!');
			}
		});
		//UserLikeCollection.remove({videoId: this._id});
		Meteor.call('videoLikeRemove', {videoId: this._id}, (err) => {
			if (err) {
				alert(err);
			} else {
				console.log('video like collection data remove !');
			}
		});
		//likeComment.remove({videoId: this._id});
		Meteor.call('likeCommentObjectRemove', {videoId: this._id}, (err) => {
			if (err) {
				alert(err);
			} else {
				console.log('like comment remove ');
			}
		});
		//userWatchedCollection.remove({videoId: this._id});
		Meteor.call('userWatchedVideoRemove', {videoId: this._id}, (err) => {
			if (err) {
				alert(err);
			} else {
				console.log('user watched list release!');
			}
		});
		//files.remove(this._id);
		Meteor.call('videoRemove', this._id, (err) => {
			if (err) {
				alert(err);
			} else {
				console.log('video success remove!');
			}
		});
	}
});