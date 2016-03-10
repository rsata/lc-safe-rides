// should only publish this to drivers
Meteor.publish("pickup", function () {
  return Pickup.find();
});

Meteor.publish("currentlocation", function () {
  return CurrentLocation.find();
});

// need this to publish ALL users
// need to only publish if admin
Meteor.publish("users", function() {
  return Meteor.users.find();
})

//example
// Meteor.publish( 'bankAccountInfo', function() {
//   if ( Roles.userIsInRole( this.userId, 'register', 'owners' ) ) {
//     return BankAccounts.find();
//   } else {
//     this.stop();
//     return
//   }
// });