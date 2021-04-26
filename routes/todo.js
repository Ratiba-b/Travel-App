const express = require("express");
const router = express.Router();
const Todo = require("../models/todoModel");
const User = require("../models/userModel");
const { bienConnecte } = require("../config/auth");
const session = require("express-session");

router.post("/", function (req, res) {
  const newTodo = new Todo({
    item: req.body.item,
    userId: req.user._id,
  });

  newTodo.save((err, todo) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/todo");
    }
  });
});

router.get("/", bienConnecte, function (req, res) {
  // recup data de la BDD et la donnée à la vue
  Todo.find({ userId: req.user._id }, function (err, data) {
    if (err) throw err;

    res.render("todo", { todos: data });
  });
});

router.delete("/:id", function (req, res) {
  //effacer les données selectionnées de la BDD
  Todo.findOneAndRemove({ _id: req.params.id }, function (err, data) {
    if (err) throw err;
    res.render("todo", { todos: data });
  });
});

module.exports = router;
