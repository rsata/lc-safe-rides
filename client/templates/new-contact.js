Template.newContact.events({
    "submit .newEntry": function (event) {

      var firstname = event.target.firstname.value;
      var lastname = event.target.lastname.value;
      var email = event.target.email.value;
      var number = event.target.number.value;
      var city = event.target.city.value;

      event.preventDefault();

      Meteor.call('newContact', firstname, lastname, email, number, city);

      event.target.firstname.value = "";
      event.target.lastname.value = "";
      event.target.email.value = "";
      event.target.number.value = "";
      event.target.city.value = "";

      Router.go('/');

      // Prevent default form submit
      // return false;

    }
  });
