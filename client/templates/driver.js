
Template.driver.onRendered(function(){
  var nav = $('#navigation');
  nav.removeClass('show');
  nav.addClass('hide');
  $('#menuX').removeClass('show');     
  $('#menuX').addClass('hide'); 
  $('#menuLines').removeClass('hide');
  $('#menuLines').addClass('show');
});

Template.driver.helpers({

  alerts: function () {
    return Pickup.find({alert:1});
  },

});


