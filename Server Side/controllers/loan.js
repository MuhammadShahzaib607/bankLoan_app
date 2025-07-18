import Loan from "../models/Loan.js";

export const applyLoan = async (req, res) => {
  const { amount, duration, type } = req.body;
  const userId = req.user._id;
  const userName = req.user.userName

  console.log(userName)

  const date = new Date();
  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });

  try {
    const newLoan = new Loan({
      amount,
      duration,
      type,
      status: "Pending", // optional, schema default already set
      date: formattedDate,
      userId,
      userName,
    });

    await newLoan.save();

    res.status(201).json({
      success: true,
      message: "Loan application submitted successfully.",
      loan: newLoan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while applying for loan.",
      error: error.message,
    });
  }
};

export const getUserLoans = async (req, res) => {
  const userId = req.user._id; // from verifyToken

  try {
    const loans = await Loan.find({ userId, status: "Approved" }); // filter added

    res.status(200).json({
      success: true,
      count: loans.length,
      loans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching paid loans",
      error: error.message,
    });
  }
};

export const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ status: "Pending" }).sort({ createdAt: -1 }); // Only pending loans
    res.status(200).json({
      success: true,
      count: loans.length,
      loans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching pending loans",
      error: error.message,
    });
  }
};

export const updateLoanStatus = async (req, res) => {
  const { loanId, status } = req.body;

  if (!["Approved", "Rejected"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status value. Use 'Approved' or 'Rejected'.",
    });
  }

  try {
    const updatedLoan = await Loan.findByIdAndUpdate(
      loanId,
      { status },
      { new: true }
    );

    if (!updatedLoan) {
      return res.status(404).json({
        success: false,
        message: "Loan not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: `Loan ${status} successfully.`,
      loan: updatedLoan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating loan status.",
      error: error.message,
    });
  }
};

export const getAllLoans_admin = async (req, res) => {
  try {
    const loans = await Loan.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: loans.length,
      loans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching all loans",
      error: error.message,
    });
  }
};

export const getLoanStatus = async (req, res) => {
  const userId = req.user._id;

  try {
    const allLoans = await Loan.find({ userId });

    const total = allLoans.length;
    const approved = allLoans.filter(loan => loan.status === "Approved").length;
    const rejected = allLoans.filter(loan => loan.status === "Rejected").length;

    res.status(200).json({
      success: true,
      totalLoans: total,
      approvedLoans: approved,
      rejectedLoans: rejected,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch loan stats",
      error: error.message,
    });
  }
};
