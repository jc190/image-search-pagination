const test = require('tape');
const mongoose = require('mongoose');
const User = require('../../models/searchRecord');

// Define mongoose promise library
mongoose.Promise = global.Promise;

test('Create new user.', (t) => {
  // t.plan must account for all assertations in scope
  t.plan(3);
  // Connect to database
  mongoose.connect('mongodb://localhost:27017/imageSearch')
    .then(() => {
      // Check to see if connection is ready
      t.equal(mongoose.connection.readyState, 1, 'Connected to database');
    })
    .then(() => {
      // Create new user with Schema defined in ../models/users
      return User.createUser(newUser)
        .then((user) => {
          // Check that the new user was saved to database
          t.equal(user.displayName, newUser.displayName, 'User has been created');
        });
      })
      .then(() => {
        // Find user by email address
        return User.findUserByEmail(newUser.email)
          .then((user) => {
            // Check that correct user has been found
            t.equal(user.email, newUser.email, 'User has been found by email address');
          })
      })
      .then(() => {
        // Clean up
        mongoose.connection.db.dropCollection('users')
          .then(() => {
            mongoose.connection.close();
          });
      })
});
