require('dotenv').config({ path: '.env_template' });
// const bodyParser = require("body-parser");
const express = require("express");
// const session = require("express-session");
const path = require("path");
const hbs = require("hbs");
const productsRouter = require("./routes/products.routes");
const usermgmtRoutes = require("./routes/usermgmt.routes");


// require("dotenv").config();
require("./db/dbconnection");
require("./models/product.model");

// Inicialización de 'app'
const app = express();

app.use(express.json());
app.use('/api/auth', loginRoutes);


const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");

const partialsPath = path.join(__dirname, "../views/partials");
hbs.registerPartials(partialsPath);

hbs.registerHelper("float", function (int) {
  return parseFloat(int.toFixed(2));
});

app.use(productsRouter);

app.use(usermgmtRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto http://localhost:${port}`);
});
