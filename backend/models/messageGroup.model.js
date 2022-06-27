const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let MessageGroupSchema = new Schema(
    {
        name: {
            type: String,
        },

        users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],

        messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
    },
    { timestamps: true }
);

MessageGroupSchema.post('save', function (next) {});

module.exports.MessageGroup = mongoose.model(
    'MessageGroup',
    MessageGroupSchema
);
