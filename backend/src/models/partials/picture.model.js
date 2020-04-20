const { Schema, model } = require("mongoose");

const PictureSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: false,
        minLength: 24,
        maxLength: 24
    },
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 25,
        lowercase: true
    },
    description: {
        type: String,
        required: false,
        minlength: 25,
        maxlength: 100,
        lowercase: true
    },
    dateAt: { type: Date, default: Date.now, required: false },
    url: { type: String, required: true },
    private: { type: Boolean, required: true, default: false }
});

model("Picture", PictureSchema);
