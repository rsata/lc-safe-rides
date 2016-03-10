Router.configure({
  layoutTemplate: 'layout',
});

Router.route('/', function() {
  this.render('index');
});

Router.route('/driver', function() {
  this.render('driver');
});

Router.route('/login', function() {
  //this.layout('login-template');
  this.render('login');
});

Router.route('/pickup/:_id', function () {
  var pickupID = this.params._id;
  var pickupLocation = Pickup.findOne({_id: pickupID});
  this.render('map2', {data: pickupLocation});
  // Don't need this anymore?
});

Router.route('/map', function() {
  this.render('map');
});

Router.route('/admin', function() {
  this.render('admin')
})

Router.route('admin/userprofile/:_id', function() {
  // var userId = this.params._id;
  // var user = Meteor.users.findOne({_id: userID})
  // this.render('userprofile', {data: user})

  this.render('userprofile', {data: function() {
    var user = this.params._id;
    return Meteor.users.findOne({_id: user})}}
  )
})


