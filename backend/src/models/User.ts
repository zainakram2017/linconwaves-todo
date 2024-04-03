import mongoose, { Schema, Document } from 'mongoose';

enum UserRole {
    Admin = 'admin',
    User = 'user',
}

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.User },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
