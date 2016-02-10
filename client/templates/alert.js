

Template.alert.events({
  'click .alert-item': function (e, t) {
    // need to make reactive - go through db
    // $(".alert-item").removeClass("red")
    
    // console.log(this._id); // this fucking works yeeeaaa
    // This needs to go to DB. Session will only work with 1...

    // this is not reactive
    // if (t.$('.alert-item').hasClass('red')) {
    //   t.$('.alert-item').removeClass('red');
    // } else {
    //   t.$('.alert-item').addClass('red');
    // }

  },

  'click .en-route': function () {
    id = this._id;
    Meteor.call('signalDriving', id);
  },

  'click .done': function () {
    id = this._id;
    Meteor.call('pickupDone', id);
  },

  'click a#seeOnMap': function () {
    Session.set('pickupLatLng', this.location);
  }

});