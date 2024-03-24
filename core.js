// Internal
import __message from "./utils/messageHandler.mjs";
import { __static, __pug } from "./utils/expressLite.mjs";

// 3rd Party
import express from "express";
import sequelize from "./utils/db.mjs";
import session from "express-session";

// ROUTES
import __routerLogin from "./routes/login.mjs";
import __routerTodo from "./routes/todo.mjs";
import __routerLogout from "./routes/logout.mjs";
import __routerCategory from "./routes/category.mjs";
import __dashboardRouter from "./routes/dashboard.mjs";
import __routerSearch from "./routes/search.mjs";

const __ex = express();
// URL ENCODED
__ex.use(express.urlencoded({ extended: false }));
// SET STATIC FILES
__ex.use(__static("../public"));
__ex.use(__static("../uploads"));

// SET COOKIE
__ex.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

// SET PUG ENGIN
__pug(__ex, "../views");

/// SETUP ROUTER
__ex.use("/", __routerLogin);
__ex.use("/todo", __routerTodo);
__ex.use("/", __routerLogout);
__ex.use("/category", __routerCategory);
__ex.use("/dashboard", __dashboardRouter);
__ex.use("/search", __routerSearch);

__ex.get("/", async (req, res) => {
  if (req.session.user) {
    const userName = req.session.user;
    const firstName = req.session.name;
    res.render("home", { userName, firstName });
  } else {
    res.redirect("/login");
  }
});

__ex.get("/update", (req, res) => {
  res.render("todo/update", {});
});

__ex.use((req, res) => {
  res.render("404", {});
});

const createDatabaseTables = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database tables created sucessfully");
  } catch (error) {
    console.log("Error creating database");
  }
};

createDatabaseTables().then(() => {
  const PORT = 3000;
  __ex.listen(PORT, () => {
    __message.showNotification("Server Start", ".....");
    __message.showNotification("See Website=>", `http://localhost:${PORT}`);
  });
});
