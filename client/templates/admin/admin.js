Meteor.subscribe('users')

Template.admin.helpers({
  users: function () {
    return Meteor.users.find();
  }
});