const { initializeServer } = require("./server");


const port = 6666;
(async () => {
    try {
        await connectDB();
        initializeServer(port);

    } catch (error) {
        process.exit(1);
    }
})();