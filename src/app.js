const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const productsRouter = require("./routes/products.routes");
const usermgmtRoutes = require("./routes/usermgmt.routes");

require("dotenv").config();
require("./db/dbconnection");
require("./models/product.model");
require("./models/user.model");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");

const partialsPath = path.join(__dirname, "../views/partials");
hbs.registerPartials(partialsPath);

hbs.registerHelper("float", function (int) {
  return parseFloat(int.toFixed(2));
});

hbs.registerHelper("list", function (context) {
  let ret = ``;

  for (var i = 0; i < context.length; i++) {
    ret =
      ret +
      `<input type="text" placeholder="${i + 1}." name="caracteristicas${
        i + 1
      }" value="${context[i]}" />`;
  }

  return ret;
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(productsRouter);
app.use(usermgmtRoutes);

const serverPort = process.env.SERVER_PORT;
app.listen(serverPort, () => {
  console.log(`Servidor corriendo en puerto ${serverPort}`);
});
