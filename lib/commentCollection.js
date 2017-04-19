import {Mongo} from 'meteor/mongo';

Comments = new Mongo.Collection('comments');

if (Meteor.isClient) {
  Meteor.subscribe('comments.all');
}

if (Meteor.isServer) {
  

  Meteor.publish('comments.all', function() {
    return Comments.find();
  });
}