'use strict';

var names = {};

module.exports = {
  setName:  function (name) {
    if (!name || names[name]) return false;
    names[name] = true;
    return true;
  },
  // Deletes username from names object
  unsetName:  function (name) {
    if (names[name]) delete names[name];
  },
  // Sets an initial guest name
  guestName:  function () {
    var num = 1;
    var name;
    do {
      name = 'UndefinedUser' + num;
      num++;
    } while (!this.setName(name));
    return name;
  },
  // Pushes all usernames to array and returns
  getNames:  function () {
    var all = [];
    for (var n in names) {
      all.push(n);
    }
    return all;
  }
};
