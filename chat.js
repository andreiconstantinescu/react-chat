var userNames = require('./user-names');
var messageStore = require('./message-store');

module.exports = function (socket) {
  var name = userNames.guestName();
  console.log('Connected:', socket.id, name);

  socket.emit('init', {
    users: userNames.getNames(),
    messages: messageStore.getMessages(),
    user: name,
  });

  socket.broadcast.emit('user:join', {user: name});

  socket.on('send:message', function (message) {
    messageStore.addMessage(message);
    console.log(socket.id, 'Sent message:', message.text);
    socket.broadcast.emit('send:message', {
      text: message.text,
      user: name
    });
  });

  socket.on('change:name', function (data, cb) {
    if (userNames.setName(data.name)) {
      var oldName = name;
      userNames.unsetName(oldName);
      name = data.name;
      console.log(socket.id, 'changed name:', oldName,'>', name);
      socket.broadcast.emit('change:name', {
        oldName: oldName,
        newName: name
      });
      cb(true);
    } else {
      cb(false);
    }
  });

  socket.on('disconnect', function () {
    socket.broadcast.emit('user:leave', {user:name});
    userNames.unsetName(name);
  });
};
