import {Mongo} from 'meteor/mongo';

Comments = new Mongo.Collection('comments');

if (Meteor.isClient) {
  Meteor.subscribe('Comments.all');
}

if (Meteor.isServer) {
  

  Meteor.publish('Comments.all', function() {
    return Comments.find().cursor;
  });
}