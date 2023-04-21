import express, { json } from "express";
import morgan from "morgan";

const app = express();


app.use(json())
app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.json({
        message: "ok"
    })
})


app.listen(3000, () => {
    console.log(`Application listen on port ${3000}`);
})