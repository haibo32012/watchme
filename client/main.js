import {Meteor} from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../lib/collection.js';
import '../imports/accounts-config.js';

import './main.html';

Template.showVideo.onCreated(function () {
  
});

Template.showVideo.onRendered(function() {

});

Template.showVideo.helpers({
  file: function () {
  	return files.findOne();
  }
});


