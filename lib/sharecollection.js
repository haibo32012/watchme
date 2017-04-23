import {Mongo} from 'meteor/mongo';

shareCollection = new Mongo.Collection('sharecollection');

let schema = {
	userId: {
		type: String
	},
	videoId: {
		type: String
	}
}