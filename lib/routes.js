Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function() {
  this.render('index');
});

Router.route('/driver', function() {
  this.render('driver');
});

Router.route('/pickup/:_id', function () {
  var pickupID = this.params._id;
  var pickupLocation = Pickup.findOne({_id: pickupID});
  this.render('map2', {data: pickupLocation});
});

Router.route('/map', function() {
  this.render('map');
});

