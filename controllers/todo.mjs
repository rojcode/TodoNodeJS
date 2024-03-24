import chalk from "chalk";
import simpleTodo from "../model/todoSimple.mjs";

/// Create simple Todo
const __createTodoSimple = async (
  title,
  description,
  tags,
  time,
  completed,
  userId
) => {
  try {
    const __new = await simpleTodo.create({
      title,
      description,
      tags,
      time,
      completed: false,
      UserId: userId,
    });
    console.log("Todo added Successfully", __new);
    return { success: true, message: "TODO با موفقیت اضافە شد", todo: __new };
  } catch (error) {
    console.log(chalk.red(error));
    return { success: false, message: "مشکلی در اضافە کردن TODO پیش آمدە است" };
  }
};

/// GET TODOS for show
const __showSimpleTodo = async (UserId) => {
  try {
    const __todos = await simpleTodo.findAll({
      where: {
        UserId,
      },
      order: [
        ["createdAt", "DESC"],
      ],
    });
    return {
      success: true,
      message: " ارتباط با سرور با موفقیت انجام شد",
      __todos,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "ارتباط با سرور با مشکل مواجە شده است" };
  }
};

const addTodoSimple = (req, res) => {
  __createTodoSimple(
    req.body.title,
    req.body.description,
    req.body.tags,
    new Date(),
    false,
    req.session.userId
  )
    .then((result) => {
      console.log(result.success);
      if (result.success) {
        res.redirect("/todo/simple/");
      } else {
        res.render("todo/simple", {
          success: result.success,
          message: result.message,
        });
      }
    })
    .catch((err) => {
      console.log(err.success);
    });
};

const showTodos = (req, res) => {
  if (req.session.user) {
    __showSimpleTodo(req.session.userId).then((result) => {
      if (result.success) {
        res.render("todo/simple", {
          success: result.success,
          message: result.message,
          todos: result.__todos,
          status: result.__todos.completedm,
        });
      } else {
        res.render("todo/simple", {
          success: result.success,
          message: result.message,
        });
      }
    });
  } else {
    res.redirect("/login");
  }
};

const __deleteTodoSimple = async (todoId, UserId) => {
  try {
    const __find = await simpleTodo.findOne({
      where: {
        id: todoId,
        UserId,
      },
    });
    if (!__find) {
      throw new Error(`We can't find the user with id=> ${todoId}`);
    }

    await __find.destroy();

    console.log(`User delete=>Successfully`);
    return { success: true, message: "TODO با موفقیت حذف شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "مشکلی در حذف TODO پیش آمدە است " };
  }
};

const deleteTodo = (req, res) => {
  __deleteTodoSimple(req.params.id, req.session.userId)
    .then((result) => {
      if (result) {
        res.redirect("/todo/simple/");
        console.log(result.message);
      } else {
        console.log(result.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Change Status Complated

const __changeStatus = async (id, UserId) => {
  try {
    const __find = await simpleTodo.findOne({
      where: {
        id,
        UserId,
      },
    });

    if (!__find) {
      return { success: false, message: `We can't Find Todo` };
    }
    __find.completed = true;
    const __save = await __find.save();
    if (!__save) {
      return { success: false, message: `We can't Save the Todo` };
    }

    return { success: true, message: "Todo Updated" };
  } catch (error) {
    console.log(`Error Change Status =>`, error);
  }
};

const chagneTodoStatus = (req, res) => {
  console.log(`userid`, req.session.userId);
  const todoId = req.params.id;
  const userId = req.session.userId;

  __changeStatus(todoId, userId)
    .then((result) => {
      if (result.success) {
        res.redirect("/todo/simple");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

/// UPDATE
const __update = async (todoId) => {
  try {
    const __find = await simpleTodo.findByPk(todoId);
    if (!__find) {
      console.log(`We can't find Todo`);
      return { success: false, message: `We can't find todo` };
    }
    return { success: true, __find };
  } catch (error) {
    return { success: false, message: `We can't Find Todo` };
  }
};

const updateTodo = (req, res) => {
  const todoId = req.params.id;

  __update(todoId).then((result) => {
    if (result) {
      res.render("todo/update", {
        id: result.__find.id,
        title: result.__find.title,
        description: result.__find.description,
        tags: result.__find.tags,
      });
    } else {
      console.log(result.message);
    }
  });
};

const __updateDone = async (id, UserId, title, description, tags) => {
  try {
    const __find = await simpleTodo.findOne({
      where: {
        id,
        UserId,
      },
    });
    if (!__find) {
      return { success: false, message: `We can't find Todo` };
    }
    __find.title = title;
    __find.description = description;
    __find.tags = tags;
    __find.time = new Date();

    __find.save();
    return { success: true, message: `Todo Updated` };
  } catch (error) {
    console.log(error);
  }
};

const updateDone = (req, res) => {
  __updateDone(
    req.body.id,
    req.session.userId,
    req.body.title,
    req.body.description,
    req.body.tags
  )
    .then((result) => {
      if (result.success) {
        res.redirect("/todo/simple/");
      } else {
        console.log(result.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export default {
  addTodoSimple,
  showTodos,
  deleteTodo,
  chagneTodoStatus,
  updateTodo,
  updateDone,
};
