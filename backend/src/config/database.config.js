const mongoose = require("mongoose");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};

mongoose.connect(process.env.MONGODB_URI, options);
mongoose.connection.on("connected", () => {
    console.log("Database connected");
});
