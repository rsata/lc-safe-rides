Meteor.methods({

  alert: function (lat, lng) {
    // var location = Geolocation.currentLocation();

    var userAlreadyAlerted = Pickup.find({owner: Meteor.userId()}).count()>0;

    if (userAlreadyAlerted === true) {
      Pickup.update(
        {owner: Meteor.userId()},
        {$set:
          {
            alert: 1,
            location: {
              lat: lat,
              lng: lng,
            }
          }
        }
        );
    } else {
      Pickup.insert({
        owner: Meteor.userId(),
        FN: Meteor.user().profile.first_name,
        LN: Meteor.user().profile.last_name,
        alert: 1,
        driver: 0,
        time: new moment().format('MMM Do, YYYY'),
        location: {
          lat: lat,
          lng: lng,
        }
      });
      console.log('alerted');
    }
  },

  signalDriving: function (id) {
    Pickup.update(
      {_id: id},
      {$set:
        {
          driver: 1,
          driver_id: Meteor.userId(),
          driver_FN: Meteor.user().profile.first_name,
          driver_LN: Meteor.user().profile.last_name,
        }
      }
      );
  },

  pickupDone: function (id) {
    Pickup.remove({_id: id});
  },



});

