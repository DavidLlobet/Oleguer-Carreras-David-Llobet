require("dotenv").config();
const {connectDB} = require("./database");
const { initializeServer } = require("./server");


const port = 6666;
(async () => {
    try {
        await connectDB(process.env.MONGODB_STRING);
        initializeServer(port);

    } catch (error) {
        process.exit(1);
    }
})();