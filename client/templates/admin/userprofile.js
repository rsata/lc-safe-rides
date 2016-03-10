Meteor.subscribe('users')

var user;

Template.userprofile.onRendered(function() {
  user = this.data;
  console.log(user)
  return user
})

Template.userprofile.helpers({
  user: function () {
    return Meteor.users.findOne({_id: user})
  }
});