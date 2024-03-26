const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();






var corsOptions = {
    origin: "*"
};
  
app.use(cors(corsOptions));



  
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to veterinaria application." });
});

require("./app/routes/cursos.routes")(app);
require("./app/routes/usuarios.routes")(app);
require("./app/routes/ordenCompra.routes")(app);

require("./app/routes/cupon.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});