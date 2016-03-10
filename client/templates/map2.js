var MAP_ZOOM = 15;

var id;

Meteor.startup(function() {  
  GoogleMaps.load();
});

Template.map2.onRendered(function() {
  id = this.data;
  return id;
});

Template.map2.helpers({  
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions: function() {
    //this is driver's location
    var driverLatLng = Geolocation.latLng();

    //pickup location
    var pickupLatLng = Session.get('pickupLatLng');
    console.log(pickupLatLng);

    if (!pickupLatLng) {
      Router.go('/driver');
    }

    //var latLng = Pickup.findOne({_id:this.data});
    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded() && driverLatLng) {
      return {
        center: new google.maps.LatLng(driverLatLng.lat, driverLatLng.lng),
        zoom: MAP_ZOOM
      };
    }
  }
});

Template.map2.onCreated(function() {  
  GoogleMaps.ready('map', function(map) {

    // Driver location
    var driverLatLng = Geolocation.latLng();    
    var driverIcon = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569");


    // Driver marker
    var driverMarker = new google.maps.Marker({
      position: new google.maps.LatLng(driverLatLng.lat, driverLatLng.lng),
      map: map.instance,
      icon: driverIcon,
    });

    // Pickup location 
    var pickupLatLng = Session.get('pickupLatLng');
    

    var pickupIcon = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00FFFF");

    // Pickup marker
    var pickupMarker = new google.maps.Marker({
      position: new google.maps.LatLng(pickupLatLng.lat, pickupLatLng.lng),
      map: map.instance,
      icon: pickupIcon,
    });
  });
});

Template.map2.onCreated(function() {  
  var self = this;

  GoogleMaps.ready('map', function(map) {
    var driverMarker;
    var pickupMarker;

    // Create and move the marker when latLng changes.

    self.autorun(function() {

      // driver location
      var driverLatLng = Geolocation.latLng();
      var driverIcon = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569");
      
      if (! driverLatLng)
        return;

      // If the driver marker doesn't yet exist, create it.
      if (! driverMarker) {
        driverMarker = new google.maps.Marker({
          position: new google.maps.LatLng(driverLatLng.lat, driverLatLng.lng),
          map: map.instance,
          icon: driverIcon,
        });
      }
      // The driver marker already exists, so we'll just change its position.
      else {
        driverMarker.setPosition(driverLatLng);
      }

      // pickup
      // var pickupLatLng = id.location;
      // console.log(pickupLatLng);
      var pickupLatLng = Session.get('pickupLatLng');

      var pickupIcon = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00FFFF");

      if (! pickupLatLng)
        return;

      // If the pickup marker doesn't yet exist, create it.
      if (! pickupLatLng) {
        pickupMarker = new google.maps.Marker({
          position: new google.maps.LatLng(pickupLatLng.lat, pickupLatLng.lng),
          map: map.instance,
          icon: pickupIcon,
        });
      }
      // The pickup marker already exists, so we'll just change its position.
      else {
        //pickupMarker.setPosition(pickupLatLng);
      }


      // Center and zoom the map view onto the current position.
      map.instance.setCenter(driverMarker.getPosition());
      // map.instance.setZoom(MAP_ZOOM);
    });
});
});