Template.login.events({
  'submit form#login': function(event){
    event.preventDefault();
    var email = $('[name=loginemail]').val();
    var password = $('[name=loginpassword]').val();
    Meteor.loginWithPassword(email, password, function(error){
      if(error){
        alert(error.reason);
      } else {
        Router.go('/');
      }
    });
  },

  'submit form#newUser': function(event, error){
    event.preventDefault();
    var email = $('[name=email]').val(),
        firstName = $('[name=first_name]').val(),
        lastName = $('[name=last_name]').val(),
        password = $('[name=password]').val(),
        phoneNumber = $('[name=phone_number]').val();
        car = $('[name=car]').val(),
    Accounts.createUser({
      email: email,
      //username: firstName + '.' + lastName,
      first_name: firstName,
      last_name: lastName,
      password: password,
      phone_number: phoneNumber,
      car: car,
    }, function(error) {
       if(error){
        alert(error.reason);
      } else {
        Router.go('/');
      }
    });
  },

  'click #login-instead': function() {
    $('#registration-form').removeClass('show');
    $('#registration-form').addClass('hide');
    $('#login-form').addClass('show');
  },

    'click #register-instead': function() {
    $('#login-form').removeClass('show');
    $('#login-form').addClass('hide');
    $('#registration-form').addClass('show');
  }

});

// Accounts.ui.config({
//   requestPermissions: {},
//   extraSignupFields: [{
//     fieldName: 'first_name',
//     fieldLabel: 'First name',
//     inputType: 'text',
//     visible: true,
//     validate: function(value, errorFunction) {
//       if (!value) {
//         errorFunction("Please write your first name");
//         return false;
//       } else {
//         return true;
//       }
//     }
//   }, {
//     fieldName: 'last_name',
//     fieldLabel: 'Last name',
//     inputType: 'text',
//     visible: true,
//     validate: function(value, errorFunction) {
//       if (!value) {
//         errorFunction("Please write your first name");
//         return false;
//       } else {
//         return true;
//       }
//     }
//   }, {
//     fieldName: 'phone_number',
//     fieldLabel: 'Phone number',
//     inputType: 'tel',
//     visible: true,
//     validate: function(value, errorFunction) {
//       if (!value) {
//         errorFunction("Please write your first name");
//         return false;
//       } else {
//         return true;
//       }
//     }
//   }, {
//     fieldName: 'car',
//       showFieldLabel: true,      // If true, fieldLabel will be shown before radio group
//       fieldLabel: 'Do you have a car?',
//       inputType: 'radio',
//       radioLayout: 'inline',    // It can be 'inline' or 'vertical'
//       data: [{                    // Array of radio options, all properties are required
//           id: 1,                  // id suffix of the radio element
//           label: 'Yes',          // label for the radio element
//           value: 1,              // value of the radio element, this will be saved.
//         }, {
//           id: 2,
//           label: 'No',
//           value: 0,
//           checked: 'checked'
//         }],
//         visible: true
//       }]
//     });