const { model, Schema } = require("mongoose");


const platformSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

const Platform = model("Platform", platformSchema);

module.exports = Platform;
