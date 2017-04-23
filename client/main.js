import {Meteor} from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../lib/collection.js';
import '../imports/accounts-config.js';

import './main.html';


Template.main.onCreated(function () {
  
});

Template.main.onRendered(function() {

});

Template.main.helpers({
  file: function () {
  	console.log(files.findOne());
  	return files.find({}, {sort: {'meta.created_at': -1}});
  }
});


