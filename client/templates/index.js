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
  }
});













Accounts.ui.config({
  requestPermissions: {},
  extraSignupFields: [{
    fieldName: 'first_name',
    fieldLabel: 'First name',
    inputType: 'text',
    visible: true,
    validate: function(value, errorFunction) {
      if (!value) {
        errorFunction("Please write your first name");
        return false;
      } else {
        return true;
      }
    }
  }, {
    fieldName: 'last_name',
    fieldLabel: 'Last name',
    inputType: 'text',
    visible: true,
    validate: function(value, errorFunction) {
      if (!value) {
        errorFunction("Please write your first name");
        return false;
      } else {
        return true;
      }
    }
  }, {
    fieldName: 'phone_number',
    fieldLabel: 'Phone number',
    inputType: 'tel',
    visible: true,
    validate: function(value, errorFunction) {
      if (!value) {
        errorFunction("Please write your first name");
        return false;
      } else {
        return true;
      }
    }
  }, {
    fieldName: 'car',
      showFieldLabel: true,      // If true, fieldLabel will be shown before radio group
      fieldLabel: 'Do you have a car?',
      inputType: 'radio',
      radioLayout: 'inline',    // It can be 'inline' or 'vertical'
      data: [{                    // Array of radio options, all properties are required
          id: 1,                  // id suffix of the radio element
          label: 'Yes',          // label for the radio element
          value: 1,              // value of the radio element, this will be saved.
        }, {
          id: 2,
          label: 'No',
          value: 0,
          checked: 'checked'
        }],
        visible: true
      }]
    });