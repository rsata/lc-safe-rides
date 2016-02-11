Meteor.subscribe("pickup");
Meteor.subscribe("current-location");

Template.index.onCreated(function () {
  var loc = Geolocation.latLng();
  var self = this;

  Session.set('loc', false);

  Tracker.autorun(function(updateLoc) {
      var loc = Geolocation.latLng();
      if (! loc)
        return;    
      
      console.log('location loaded');
      Session.set('loc', true);

      if(Session.get('loc') === true) {
        $('.spinner').removeClass('show');
        $('.spinner').addClass('hide');
        
        $('.isLoaded').removeClass('hide');
        $('.isLoaded').addClass('show');
      } else {
        $('.spinner').removeClass('hide');
        $('.spinner').addClass('show');
        
        $('.isLoaded').removeClass('show');
        $('.isLoaded').addClass('hide');
      }

      // need to do this in other parts that use location

    // });
  });
});




Template.index.helpers({

  loggedInUser: function () {
    return Meteor.user().username || Meteor.user().profile.name || Meteor.userId().services.google.given_name;
  },

  driverEnRoute: function () {
    return Pickup.findOne({owner: Meteor.userId(), alert:1, driver: 1});
  },

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


