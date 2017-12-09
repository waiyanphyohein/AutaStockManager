const express = require('express');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.post('/logout', this.logout);

    return router;
  },
  logout(req, res) {
    req.logout();
    res.redirect('/');
  },
};
