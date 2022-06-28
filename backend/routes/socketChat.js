const { Message } = require('../models/message.model');
const { MessageGroup } = require('../models/messageGroup.model');

module.exports = function (io) {
    io.on('connection', (socket) => {
        const params = socket.handshake.query;

        if (params.userId && params.groupId) {
            socket.join(params.groupId);
            console.log(params.userId, ' has joined ', params.groupId);
            socket.on('message', async (message) => {
                const messageObject = {
                    user: params.userId,
                    message,
                };

                io.to(params.groupId).emit('message', messageObject);
                const newMsg = await Message.create(messageObject);
                const updatedMsgGroup = await MessageGroup.findOneAndUpdate(
                    params,
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
