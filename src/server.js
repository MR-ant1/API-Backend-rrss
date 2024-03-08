import express from "express"
import "dotenv/config";
import { dbconnection } from "./database/db.js";

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 4001

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