const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes");


let app = express();

app.use(cors());
app.use(express.urlencoded({extended: false})) //if you are sending form data you have to include this
app.use(express.json()) //same as body parser just built into express

app.use(express.static("client"));
app.use("/api", apiRoutes);

app.listen(3000);