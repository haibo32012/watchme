import {Mongo} from 'meteor/mongo';

const Pay = new Mongo.Collection('pay');

export default Pay;

if (Meteor.isClient) {
  Meteor.subscribe('Pay.all');
}

if (Meteor.isServer) {
  Meteor.publish('Pay.all', function() {
    return Pay.find();
  });
}