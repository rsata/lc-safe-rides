Template.nav.events({
  'click #logout': function (e) {
    e.preventDefault();
    Meteor.logout();
  },

  'click button.menu-icon': function(e) {
    e.preventDefault();

    var nav = $('#navigation');
    if (nav.hasClass('hide')) {
      nav.removeClass('hide');
      nav.addClass('show');
    } else {
      nav.removeClass('show');
      nav.addClass('hide');
    }

  }
});  
