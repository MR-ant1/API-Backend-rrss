import express from "express"
import "dotenv/config";
import { dbconnection } from "./database/db.js";
import router from "./routes/router.js";

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 4002

app.use("/api", router)

dbconnection()
.then(() => {
    console.log("Database connected")


app.listen(PORT, () => {
    console.log(`server is running in port ${PORT}`);
})
})
.catch(error => {
    console.log(error)
}
)