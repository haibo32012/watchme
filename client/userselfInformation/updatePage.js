import { Meteor } from 'meteor/meteor';
import {check} from 'meteor/check';
import './updatePage.html';

Template.updatePage.helpers({
	file: function() {
		let id = FlowRouter.getParam('_id');
		return files.findOne({_id: id}) || {};
	},
	canShow: function() {
		let id = FlowRouter.getParam('_id');
		let video = files.findOne({_id: id}) || {};
		if (video.userId === Meteor.userId()) {
			return true;
		} else {
			return false;
		}
	}
});

Template.updatePage.events({
	'submit #videoUpdate': function(e) {
		e.preventDefault();
		let id = FlowRouter.getParam('_id');
		// view type of the video
		let viewType = document.querySelector('input[name="viewTypeOfVideo"]:checked').value;
		Meteor.call('videoViewTypeUpdate', id, viewType, (err) => {
			if (err) {
				alert(err);
			} else {
				console.log('video view type update success!');
			}
		});

		// type of the video price
		let videoIntroduction = e.target.videoIntro.value;
		console.log(videoIntroduction);
		let priceType = document.querySelector('input[name="priceTypeOfVideo"]:checked').value;
		console.log(priceType);
		let priceValue = e.target.videoPrice.value;
		check(priceValue, String);
		console.log(priceValue);
		
		Meteor.call('videoIntroductionUpdate', id, videoIntroduction, (err) => {
			if (err) {
				alert(err);
			} else {
				console.log('video introduction update success!');
			}
		});
		switch(priceType) {
			case 'freeVideo':
				Meteor.call('videoPriceTypeUpdate', id, 'freeVideo', (err) => {
					if (err) {
						alert(err);
					} else {
						console.log('video price type update success!');
					}
				});
				break;
			case 'donateVideo':
				Meteor.call('videoPriceTypeUpdate', id, 'donateVideo', (err) => {
					if (err) {
						alert(err);
					} else {
						console.log('video price type update success!');
					}
				});
				break;
			case 'bargainVideo':
				Meteor.call('videoPriceTypeUpdate', id, 'bargainVideo', (err) => {
					if (err) {
						alert(err);
					} else {
						console.log('video price type update success!');
					}
				});
				break;
		}
		$('#videoReviewModal').modal('show');
		e.target.videoPrice = '0';
	}
});