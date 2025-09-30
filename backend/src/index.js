import connectDB from "./db/index.js"
import { app } from "./app.js"


connectDB()
.then(() => {
    
    app.on("error", (err) => {
        console.log("App connection error ", err)
            throw err;
        })
        const PORTT = process.env.PORT || 4000
        app.listen(PORTT, () => {
            console.log(`Server running on port ${PORTT}`);
        })
    })
    .catch((err) => {
        console.log("Error in connecting to app", err);
    })