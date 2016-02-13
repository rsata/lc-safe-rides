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
      $('#menuX').removeClass('hide');
      $('#menuX').addClass('show');
      $('#menuLines').removeClass('show');
      $('#menuLines').addClass('hide');
    } else {
      nav.removeClass('show');
      nav.addClass('hide');
      $('#menuX').removeClass('show');     
      $('#menuX').addClass('hide'); 
      $('#menuLines').removeClass('hide');
      $('#menuLines').addClass('show');
    }

  }
});  
