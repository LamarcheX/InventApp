// const bodyParser = require("body-parser");
const express = require("express");
// const session = require("express-session");
const path = require("path");
const hbs = require("hbs");
const productsRouter = require("./routes/products.routes");
const usermgmtRoutes = require("./routes/usermgmt.routes");

// const { router: authRoutes, authMiddleware } = require("./routes/auth.routes");

require("dotenv").config();
require("./db/dbconnection");
require("./models/product.model");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");

const partialsPath = path.join(__dirname, "../views/partials");
hbs.registerPartials(partialsPath);

hbs.registerHelper("float", function (int) {
  return parseFloat(int.toFixed(2));
});

app.use(productsRouter);

// ---------------------------------
// Middleware para manejar las sesiones
// app.use(
//   session({
//     secret: "123",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// Middleware settings
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// rutas de otros archivos
// app.use("/", authRoutes);
// app.use("/admin", authMiddleware);
app.use(usermgmtRoutes);

// ---------------------------------
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
