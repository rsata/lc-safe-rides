Accounts.onCreateUser(function(options, user) {
   // Use provided profile in options, or create an empty object
   user.profile = options.profile || {};
   // Assigns first and last names to the newly created user object
   user.profile.first_name = options.first_name;
   user.profile.last_name = options.last_name;
   user.profile.phone_number = options.phone_number;
   user.profile.car = options.car;
   // Returns the user object
   return user;
});