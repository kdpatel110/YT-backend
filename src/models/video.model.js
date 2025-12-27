import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const videoSchema = new Schema(
    {
        //Video url
        videoFile: {
            type: String,
            required: true,
        },

        thumbnail: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 120,
            index: "text",
        },

        description: {
            type: String,
            required: true,
            maxlength: 5000,
        },

        duration: {
            type: Number,
            required: true,
        },

        views: {
            type: Number,
            default: 0,
        },

        isPublished: {
            type: Boolean,
            default: true,
        },

        visibility: {
            type: String,
            enum: ["public", "private", "unlisted"],
            default: "public",
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        views: {
            type: Number,
            default: 0,
        },

        likesCount: {
            type: Number,
            default: 0,
        },

        dislikesCount: {
            type: Number,
            default: 0,
        },

        commentsCount: {
            type: Number,
            default: 0,
        },
    }, { timestamps: true }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model('Video', videoSchema)