import {Mongo} from 'meteor/mongo';

subscribeCollection = new Mongo.Collection('subscribecollection');

let schema = {
	userId: {
		type: String,
		label: "userId"
	},
	subscribedUserId: {
		type: String,
		label: "subscribedUserId"
	}
};