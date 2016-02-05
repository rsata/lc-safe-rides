var MAP_ZOOM = 15;

var pickupLat, pickupLng;


Meteor.startup(function() {  
  GoogleMaps.load();
});

Template.map2.rendered = function() {
  console.log(this.data);
  pickupLat = this.data.location.lat;
  pickupLng = this.data.location.lng;
};


Template.map2.helpers({  
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  
  mapOptions: function() {

    //console.log(this.data);

    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(pickupLat, pickupLng),
        zoom: MAP_ZOOM
      };
    }
  }
});


Template.map2.onCreated(function() {  
  GoogleMaps.ready('map', function(map) {

    var driverIcon = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569")
    var pickupIcon = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00FFFF")
    var latLng = Geolocation.latLng();

    var pickup = new google.maps.Marker({
      position: new google.maps.LatLng(pickupLat, pickupLng),
      map: map.instance,
      icon: pickupIcon,
    });

    var driver = new google.maps.Marker({
      position: new google.maps.LatLng(latLng.lat, latLng.lng),
      map: map.instance,
      icon: driverIcon,
    });
  });
});

Template.map.onCreated(function() {  
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