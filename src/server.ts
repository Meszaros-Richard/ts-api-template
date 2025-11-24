import express from "express";
import config from "./config/config"
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", require("./Routes/index"));
app.use(require("./middlewares/error.handler"));

app.listen(config.port, () => {
    console.log(`Server is listening on port: ${config.port}`);
});