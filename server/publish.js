Meteor.publish("pickup", function () {
  return Pickup.find();
});

Meteor.publish("currentlocation", function () {
  return CurrentLocation.find();
})

Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true });
});