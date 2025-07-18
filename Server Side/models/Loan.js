import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: false,
        default: "Pending"
    },
    date: {
        type: String,
        required: false,
    },
    userId: {
        type: String,
        required: false,
    },
    userName: {
        type: String,
        required: true
    }
})

const Loan = mongoose.model("Loan", LoanSchema)

export default Loan