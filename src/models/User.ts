import { MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from "../resources/values";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: MIN_USERNAME_LENGTH,
        maxlength: MAX_USERNAME_LENGTH,
    },
    password: {
        type: String,
        required: true,
        minlength: MIN_PASSWORD_LENGTH,
        maxlength: MAX_PASSWORD_LENGTH,
    },
    admin: {
        type: Boolean,
        required: true,
    }
});

const User = mongoose.model("User", UserSchema);

export default User;