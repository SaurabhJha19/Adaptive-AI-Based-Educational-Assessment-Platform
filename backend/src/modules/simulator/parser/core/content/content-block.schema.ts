import { Schema } from "mongoose";

export const ContentBlockSchema =
new Schema(

    {

        type: {

            type: String,

            required: true,

        },

        data: {

            type: Schema.Types.Mixed,

            default: {},

        },

    },

    {

        _id: false,

    }

);