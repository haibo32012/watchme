

Meteor.users.allow({ update: () => true});

if (Meteor.isClient) {
  Meteor.subscribe('users.all');
}

if (Meteor.isServer) {
  

  Meteor.publish('users.all', function() {
    return Meteor.users.find();
  });
}