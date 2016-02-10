Meteor.subscribe("pickup");
Meteor.subscribe("current-location");


Template.index.helpers({

  loggedInUser: function () {
    return Meteor.user().username || Meteor.user().profile.name || Meteor.userId().services.google.given_name;
  },

  driverEnRoute: function () {
    return Pickup.findOne({owner: Meteor.userId(), alert:1, driver: 1});
  },

});


Template.index.onRendered(function() {  
  var self = this;

  // GoogleMaps.ready('map', function(map) {
  //   var marker;

    // Create and move the marker when latLng changes.
    Tracker.autorun(function(updateLoc) {
      var latLng = Geolocation.latLng();
      if (! latLng)
        return;

      var lat = latLng.lat;
      var lng = latLng.lng;      
      
      console.log('location loaded');
      Meteor.call('location', lat, lng);

      updateLoc.stop();

    // });
  });
});


Template.index.events({
  'click #alert-button': function (e) {
    e.preventDefault();
    var lat = Geolocation.latLng().lat;
    var lng = Geolocation.latLng().lng;
    Meteor.call('alert', lat, lng);
    console.log(lat)
    console.log(lng)
  },
});


