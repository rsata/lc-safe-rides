Meteor.subscribe("pickup");
Meteor.subscribe("current-location");

Template.index.onCreated(function () {
  var loc = Geolocation.latLng();

  Session.set('loc', false);

  Tracker.autorun(function(updateLoc) {
    var loc = Geolocation.latLng();
    if (! loc)
      return;    

    console.log('location loaded');
    Session.set('loc', true);

    if(Session.get('loc') === true) {
      $('.spinner-container').removeClass('show');
      $('.spinner-container').addClass('hide');

      $('.isLoaded').removeClass('hide');
      $('.isLoaded').addClass('show');
    } else {
      $('.spinner-container').removeClass('hide');
      $('.spinner-container').addClass('show');

      $('.isLoaded').removeClass('show');
      $('.isLoaded').addClass('hide');
    }

      // need to do this in other parts that use location

    // });
  });
});


// MAP //

var MAP_ZOOM = 15;

Template.index.onCreated(function() {  
  GoogleMaps.ready('map', function(map) {
    var latLng = Geolocation.latLng();

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(latLng.lat, latLng.lng),
      map: map.instance
    });
  });
});

Template.index.onCreated(function() {  
  var self = this;

  GoogleMaps.ready('map', function(map) {
    var marker;

    // Create and move the marker when latLng changes.
 
    self.autorun(function() {

      var latLng = Geolocation.latLng();
      if (! latLng)
        return;

      // If the marker doesn't yet exist, create it.
      if (! marker) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(latLng.lat, latLng.lng),
          map: map.instance
        });
      }
      // The marker already exists, so we'll just change its position.
      else {
        marker.setPosition(latLng);
      }

      // Center and zoom the map view onto the current position.
      map.instance.setCenter(marker.getPosition());
      map.instance.setZoom(MAP_ZOOM);
    });
  });
});

Template.index.onRendered(function(){
  var nav = $('#navigation');
  nav.removeClass('show');
  nav.addClass('hide');
  $('#menuX').removeClass('show');     
  $('#menuX').addClass('hide'); 
  $('#menuLines').removeClass('hide');
  $('#menuLines').addClass('show');
});


Template.index.helpers({

  loggedInUser: function () {
    return Meteor.user().username || Meteor.user().profile.name || Meteor.userId().services.google.given_name;
  },

  driverEnRoute: function () {
    return Pickup.findOne({owner: Meteor.userId(), alert:1, driver: 1});
  },

  driverAlerted: function () {
    return Pickup.findOne({owner: Meteor.userId(), alert:1});
  },

  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions: function() {
    var latLng = Geolocation.latLng();
    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: MAP_ZOOM,
        disableDefaultUI: true,
      };
    }
  }

});


Template.index.events({
  'click #alert-button': function (e) {
    e.preventDefault();
    var lat = Geolocation.latLng().lat;
    var lng = Geolocation.latLng().lng;

    Meteor.call('alert', lat, lng);
    console.log(lat);
    console.log(lng);
    //$('.alert-button-wrapper').animate({ bottom: '20vh' }, {duration: 1000, easing:'easeInOutCubic'});
    
    $('#alert-button').addClass('flash');
  },

  'click #cancel-ride': function (e) {
    e.preventDefault();

    Meteor.call('cancel');
    $('#alert-button').removeClass('flash');
  },

  'click #call-ride': function (e) {

  },
});


