import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobile?: string;
  targetExam: string;
  passwordHash: string;
  role: "user" | "admin";
  profileCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  theme: "light" | "dark" | "system";
  preferredLanguage: string;
  dailyStudyGoal: number;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      default: "",
      required: false,
    },

    targetExam: {
      type: String,
      required: true,
      enum: [
        "SAT",
        "TOEFL",
        "GRE",
        "GMAT",
        "ACT",
        "IELTS",
        "OTHER",
      ],
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    profileCompleted: {
      type: Boolean,
      default: true,
    },

    theme: {
        type: String,
        enum: ["light", "dark", "system"],
        default: "system",
    },

    preferredLanguage: {
        type: String,
        default: "English",
    },

    dailyStudyGoal: {
        type: Number,
        default: 60,
    },

    emailNotifications: {
        type: Boolean,
        default: true,
    },

    pushNotifications: {
        type: Boolean,
        default: true,
    },
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model<IUser>("User", userSchema);