$(document).ready(function(){

  var offset = 0;

  var navigationContainer = $('#cd-nav'),
  mainNavigation = navigationContainer.find('#cd-main-nav ul');
  

  checkMenu();


  function checkMenu() {

    if(!navigationContainer.hasClass('is-fixed')) {
    //add .is-fixed class to #cd-nav 
    //wait for the animation to end  
    //add the .has-transitions class to main navigation (used to bring back transitions)
  } else if ($(window).scrollTop() <= offset) {

    //check if the menu is open when scrolling up - for browser that supports transition
    if( mainNavigation.hasClass('is-visible')  && !$('html').hasClass('no-csstransitions') ) {
      //close the menu 
      //wait for the transition to end 
      //remove the .is-fixed class from the #cd-nav and the .has-transitions class from main navigation
    } 

    //check if the menu is open when scrolling up - fallback if transitions are not supported
    else if( mainNavigation.hasClass('is-visible')  && $('html').hasClass('no-csstransitions') ) {
      //no need to wait for the end of transition - close the menu and remove the .is-fixed class from the #cd-nav
    } 

    //scrolling up with menu closed
    else {
      //remove the .is-fixed class from the #cd-nav and the .has-transitions class from main navigation
    }
  } 
}

});