import { Schema, model } from "mongoose";

const PasswordResetSchema
 = Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        OTP: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);
PasswordResetSchema
.index({ createdAt: 1 }, { expireAfterSeconds: 65 });
const PasswordResetToken
 = model("PasswordResetToken", PasswordResetSchema
);
export { PasswordResetToken };

