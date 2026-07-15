import { Schema } from "mongoose";

export const ContentBlockSchema =
    new Schema(
        {
            type: {
                type: String,
                required: true
            },

            text: {
                type: String,
                default: ""
            },

            page: {
                type: Number,
                default: 0
            },

            bbox: {

                left: Number,

                top: Number,

                right: Number,

                bottom: Number

            },

            metadata: {
                type: Schema.Types.Mixed,
                default: {}
            }
        },
        {
            _id: false
        }
    );