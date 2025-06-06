import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, 
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String
    },
  },
  { timestamps: true }
);

//Gắn để xài populate
UserSchema.virtual('todos', {
  ref: 'Todo',
  localField: '_id',
  foreignField: 'userId',
});

// Để virtual xuất hiện khi dùng res.json(user) hoặc user.toObject()
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

const User = mongoose.model('User', UserSchema);

export default User;
