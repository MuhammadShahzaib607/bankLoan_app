import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    confirmPassword: {
        type: String,
        required: false,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model("User", UserSchema)

export default User