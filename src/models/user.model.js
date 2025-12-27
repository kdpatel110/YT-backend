import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"



const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            trim: true,
            index: true,
            lowercase: true,
            minlength: [3, 'Username must be at least 3 characters'],
            maxlength: [30, 'Username cannot exceed 30 characters'],
            match: [/^[a-zA-Z0-9_.-]+$/, 'Username can only contain letters, numbers, dots, underscores and hyphens']
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
        },

        fullname: {
            type: String,
            required: [true, 'Channel name is required'],
            trim: true,
            index: true,
            maxlength: [60, 'Channel name cannot exceed 60 characters']

        },
        // // Profile Information
        // channelName: {
        //     type: String,
        //     required: [true, 'Channel name is required'],
        //     trim: true,
        //     maxlength: [60, 'Channel name cannot exceed 60 characters']
        // },

        avatar: {
            type: String, // image URL
            default: "",
            required: true
        },

        coverImage: {
            type: String,
            default: ""
        },

        watchHistory: {
            type: Schema.Types.ObjectId,
            ref: "Video"
        },

        password: {
            type: String,
            required: [true, 'Password is Required'],
            minlength: 6,
            // select: false, // hide password by default
        },

        refreshToken: {
            type: String
        }
    }, { timestamps: true }
)

userSchema.pre('save', async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema)

























