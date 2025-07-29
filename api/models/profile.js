const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

  bio: { type: String, maxLength: 300, default: '' },
  location: { type: String, maxLength: 100 },
  interests: [{ type: String }],
  socialLinks: {
    instagram: { type: String },
    tiktok: { type: String },
    other: { type: String }
  },
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', ProfileSchema);
