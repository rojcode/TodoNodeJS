import express from "express";


const __routerLogout = express.Router();

__routerLogout.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(`Error Destorying session:`, err);
      res.status(500).send("Error Destorting");
    } else {
      res.redirect("/login");
    }
  });
});

export default __routerLogout;
