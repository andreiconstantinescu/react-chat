'use strict';

var messages = [];

module.exports = {
  // Message store array
  // Adds message to message store, if messages > 50 removes the first message
  addMessage: function (message) {
    if (messages.length >= 50) messages.shift();
    messages.push(message);
  },
  // Returns all messages
  getMessages: function () {
    return messages;
  },
};
