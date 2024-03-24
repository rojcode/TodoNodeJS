import express from "express";
import __controller from "../controllers/todo.mjs";

const __routerTodo = express.Router();

__routerTodo.get("/simple", __controller.showTodos);

__routerTodo.post("/simple/add", __controller.addTodoSimple);
__routerTodo.get("/simple/delete/:id/:title", __controller.deleteTodo);
__routerTodo.get("/simple/changeStatus/:id/", __controller.chagneTodoStatus);
__routerTodo.get("/simple/update/:id/", __controller.updateTodo);
__routerTodo.post("/simple/update/done/", __controller.updateDone);

export default __routerTodo;
