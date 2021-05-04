const mongoose = require("mongoose");
const createDummyData = require("./createDummyData");
const { create } = require("./models/post");

module.exports = (MONGO_URI) => {
    const connect = async (MONGO_URI) => {
        try {
            await mongoose.connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Connected to MongoDB");
        } catch (e) {
            console.error(e);
        }
    };
    // createDummyData();
    connect(MONGO_URI);
};
