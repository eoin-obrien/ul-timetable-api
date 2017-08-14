import * as mongoose from 'mongoose';

export type UserModel = mongoose.Document & {
  email: string,
  password: string,
  passwordResetToken: string,
  passwordResetExpires: Date,

  tokens: AuthToken[],

  profile: {
    name: string,
    gender: string,
    location: string,
    website: string,
    picture: string,
  },
};

export type AuthToken = {
  accessToken: string,
  kind: string,
};

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  twitter: String,
  google: String,
  tokens: Array,

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String,
  },
},                                     { timestamps: true });


// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const User = mongoose.model('User', userSchema);
export default User;
