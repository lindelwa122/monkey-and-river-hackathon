const moongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlertSchema = new Scchema({
    title:{ type: String, required: true, minLenght:3, maxLenght: 200 },
    status: { type: String, enum:['unread', 'read'], default: 'unread' },
    timestamp: { type: Date, default: Date.now },
    user_id: {type: Schema.Types.ObjectID, ref: 'User', required:true}

});

module.exports = mongoose.model('Blog', BlogSchema);