// ------------------------------------
// TODO: Handle local login and sign up
// ------------------------------------
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
  if (req.user) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
      id: req.user._id,
      name: req.user.name.full,
      displayName: req.user.displayName
    });
  } else {
    res.sendStatus(404);
  }
});

// Handle facebook login
router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Callback function for facebook login
router.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

// Handle logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
