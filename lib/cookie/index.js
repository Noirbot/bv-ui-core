/**
 * @fileOverview
 * Provides cookie utilities.
 */

// Imports.
var global = require('../global');

module.exports = {

  /**
   * Create a cookie.
   *
   * @param {String} name The cookie name.
   * @param {String} value The cookie value.
   * @param {Number} days The cookie lifespan in days.
   * @param {String} [domain] The domain for the cookie.
   * @param {Boolean} [secure] Whether this is a secure cookie.
   */
  create: function (name, value, days, domain, secure) {
    var date = new Date();

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = days ? ';expires=' + date.toGMTString() : '';

    var c = encodeURIComponent(name) + '=' +
      encodeURIComponent(value) +
      expires +
      ';path=/' +
      (domain ? (';domain=' + domain) : '') +
      (secure ? (';secure') : '');

    global.document.cookie = c;
  },

  /**
   * Obtain the value of a cookie.
   *
   * @param {String} name The cookie name.
   * @return {String} The cookie value or null if no such cookie.
   */
  read: function (name) {
    var nameEQ = encodeURIComponent(name) + '=';
    var ca = global.document.cookie.split(';');
    var i;

    for (i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }

      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  },

  /**
   * Remove a cookie.
   *
   * @param {String} name The cookie name.
   */
  remove: function (name) {
    this.create(name, '', -1);
  }
};
