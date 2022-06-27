const { Message } = require('../models/message.model');
const { MessageGroup } = require('../models/messageGroup.model');

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('connected', socket.handshake.query);
        const query = socket.handshake.query;

        if (query.userId && query.groupId) {
            socket.join(query.groupId);

            socket.on('message', async (message) => {
                const messageObject = {
                    user: query.userId,
                    message,
                };

                io.to(query.groupId).emit('message', messageObject);
                const newMsg = await Message.create(messageObject);
                const updatedMsgGroup = await MessageGroup.findOneAndUpdate(
                    query,
                    { $push: { messages: newMsg._id } },
                    {
                        new: true,
                    }
                );
            });
        } else {
            socket.emit('message', 'Invalid information');
            socket.disconnect(true);
        }
    });
};
