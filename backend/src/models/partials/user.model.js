const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        minlength: 5,
        maxlength: 15,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        maxlength: 40,
        required: true,
        match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    },
    password: { type: String, required: true, minlength: 8, maxlength: 60 },
    dateAt: { type: Date, default: Date.now(), required: false },
    publicPictures: [
        { type: [Schema.Types.ObjectId], ref: "Picture", required: false }
    ],
    privatePictures: [
        { type: [Schema.Types.ObjectId], ref: "Picture", required: false }
    ]
});

model("User", UserSchema);
