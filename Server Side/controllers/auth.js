import User from "../models/Auth.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

const { sign } = jwt
const { hash, compare } = bcrypt
dotenv.config()

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, password } = req.body
        const existingUsers = await User.find()
        const isEmailAlreadyExist = existingUsers.find((userData) => {
            return userData.email === email
        })

        const isUserNameAlreadyExist = existingUsers.find((userData) => {
            return userData.userName === userName
        })

        if (isUserNameAlreadyExist) {
            return res.status(400).json({
                "status": false,
                "message": "UserName already Exist please try a new one",
            })
        }

        if (isEmailAlreadyExist) {
            return res.status(400).json({
                "status": false,
                "message": "email already Exist please try a new one",
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                "status": false,
                "message": "password should be 8 character long",
            })
        }

        const hashPassword = await hash(password, 10)
        const userData = new User({
            userName,
            email,
            password: hashPassword,
            firstName,
            lastName,
            isAdmin: false
        })
        const saveData = await userData.save()
        res.status(200).json({
            "status": true,
            "message": "user Registered successfully",
            "userData": saveData
        })
    } catch (error) {
        res.status(400).json({
            "status": false,
            "message": "something went wrong",
            "error": error.message
        })
    }
}

export const login = async (req, res) => {
try {
    const { email, password } = req.body

    if (password.length < 8) {
        res.status(404).json({
            "status": false,
            "message": "password should be 8 characters long"
        })
    }

    const users = await User.find()
    const isUserExist = users.find((user) => {
        return user.email === email
    })

    if (!isUserExist) {
        return res.status(404).json({
            "status": false,
            "message": "invalid credential"
        })
    }

const isPasswordMatch = await bcrypt.compare(password, isUserExist.password)

    if (!isPasswordMatch) {
        return res.status(404).json({
            "status": false,
            "message": "invalid credential"
        })
    }

    const { _id, userName } = isUserExist

    const token = sign({ _id, email, userName },
        process.env.SECRET_KEY,
        { expiresIn: "2d" }
    )

    res.status(200).json({
        "status": true,
        "message": "user logged in successfully",
        "user": isUserExist,
        "token": token
    })
} catch (error) {
    res.status(400).json({
        "status": false,
        "message": "something went wrong",
        "error": error.message
    })
}
    
}

export const getUserProfile = async (req, res) => {
  const userId = req.user._id; // ID extracted from verified token

  try {
    const user = await User.findById(userId).select("-password"); // Hide password

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user profile",
      error: error.message,
    });
  }
};