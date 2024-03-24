import chalk from "chalk";
import TodoCategory from "../model/todoCategory.mjs";
import itemCategory from "../model/itemsCateogry.mjs";

// CREATE CATEGORY
const __createCategory = async (id, title, description) => {
  try {
    const __new = TodoCategory.create({
      title: title,
      description: description,
      time: new Date(),
      UserId: id,
    });

    if (!__new) {
      return { success: false, message: `Can't create Category` };
    }
    return { success: true, message: "Category Add Sucessfully" };
  } catch (error) {
    console.log(error);
  }
};

const createCategory = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const user = req.session.userId;
  __createCategory(user, title, description)
    .then((result) => {
      if (result.success) {
        res.redirect("/category");
        console.log(result.message);
      } else {
        console.log(result.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

/// SHOW CATEGORY
const __showCategory = async (UserId) => {
  try {
    const __find = await TodoCategory.findAll({
      where: {
        UserId,
      },
    });

    if (!__find) {
      return { success: false, message: `We can't find Todo` };
    }
    return { success: true, message: "Category Finds", categories: __find };
  } catch (error) {
    console.log(error);
  }
};

const showCategory = (req, res) => {
  if (req.session.user) {
    __showCategory(req.session.userId).then((result) => {
      if (result.success) {
        res.render("todo/category", { categories: result.categories });
      } else {
        console.log(result.message);
      }
    });
  } else {
    res.redirect("/login");
  }
};

/// Delete Category

const __deleteCategory = async (id) => {
  try {
    const __find = await TodoCategory.findByPk(id);
    if (!__find) {
      return { success: false, message: `Can't Find Category` };
    }
    await __find.destroy();
    return { success: true, message: `Category Deleted` };
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = (req, res) => {
  __deleteCategory(req.params.id).then((result) => {
    if (result.success) {
      res.redirect("/category");
    } else {
      console.log(chalk.red(result.message));
    }
  });
};

/// Update

const __updateCategory = async (id) => {
  try {
    const __find = await TodoCategory.findByPk(id);
    if (!__find) {
      return {
        success: false,
        message: `We can't Find Categroy`,
      };
    }

    return { success: true, message: "Category Finded", category: __find };
  } catch (error) {
    console.log(error);
  }
};

const updateCategory = (req, res) => {
  if (req.session.user) {
    __updateCategory(req.params.id).then((result) => {
      console.log(chalk.bgBlue(result.message));
      if (result.success) {
        req.session.categoryId = req.params.id;
        res.render("todo/categoryUpdate", {
          title: result.category.title,
          description: result.category.description,
        });
      }
    });
  } else {
    res.redirect("/login");
  }
};

/// Update Category in Database

const __doneUpdateCategory = async (id, newData) => {
  try {
    const __find = await TodoCategory.findByPk(id);
    if (!__find) {
      return { success: false, message: `Can't Find Category with Id: ${id}` };
    }

    await __find.update(newData);
    console.log(`Category Updated`);
    return { success: true, message: `Category Updated` };
  } catch (error) {
    console.log(chalk.red(error));
  }
};

const doneUpdate = (req, res) => {
  const __data = {
    title: req.body.title,
    description: req.body.description,
    time: new Date(),
  };
  __doneUpdateCategory(req.session.categoryId, __data).then((result) => {
    if (result.success) {
      console.log(result.message);
      delete req.session.categoryId;
      res.redirect("/category");
    } else {
      console.log(result.message);
    }
  });
};

/// Home Category

const __showItemsCategory = async (TodoCategoryId) => {
  try {
    const __find = await itemCategory.findAll({
      where: {
        TodoCategoryId,
      },
    });
    if (!__find) {
      console.log(chalk.bgRed(`Can't Find item`));
      return { success: false, message: `Can't Find item` };
    }
    const __category = await TodoCategory.findByPk(TodoCategoryId);
    if (!__category) {
      return { success: false, message: `Can't Find Category` };
    }
    return { success: true, items: __find, category: __category };
  } catch (error) {
    console.log(chalk.bgRed(error));
  }
};

const categoryHome = (req, res) => {
  if (req.session.user) {
    req.session.categoryId = req.params.id;
    __showItemsCategory(req.params.id).then((result) => {
      if (result.success) {
        res.render("todo/homeCategory", {
          todos: result.items,
          category: result.category,
        });
      }
    });
  } else {
    res.redirect("/login");
  }
};

/// Create Items for Category

const __createItem = async (title, description, tags, time, id,UserId) => {
  try {
    const __create = await itemCategory.create({
      title,
      description,
      tags,
      time,
      completed: false,
      TodoCategoryId: id,
      UserId
    });
    if (!__create) {
      console.log(chalk.bgRed(`We Can't Create Item`));
      return { success: false, message: `We can't Create Item` };
    }

    return { success: true, message: `The item Created Sucessfully` };
  } catch (error) {
    console.log(chalk.bgRed(error));
  }
};

const createItem = (req, res) => {
  const __http = req.body;
  const __time = new Date();
  __createItem(
    __http.title,
    __http.description,
    __http.tags,
    __time,
    req.session.categoryId,
    req.session.userId
  )
    .then((result) => {
      if (result.success) {
        res.redirect(`/category/go/${req.session.categoryId}/show`);
      } else {
        console.log(chalk.bgRed(result.message));
      }
    })
    .catch((err) => {
      console.log(chalk.bgRed(err));
    });
};

/// Delete Item category

const __deleteItemCategory = async (id) => {
  try {
    const __find = await itemCategory.findByPk(id);
    if (!__find) {
      return { success: false, message: `We can't Find Item Category` };
    }
    await __find.destroy();
    return { success: true, message: `Item Delete` };
  } catch (error) {
    console.log(chalk.bgRed(error));
  }
};

const deleteItemCategory = (req, res) => {
  const __id = req.params.id;
  __deleteItemCategory(__id)
    .then((result) => {
      if (result.success) {
        if(req.session.categoryId){
          res.redirect(`/category/go/${req.session.categoryId}/show`);
        }else{
          res.redirect('/category')
        }
        
      }
    })
    .catch((error) => {
      console.log(chalk.bgRed(error));
    });
};

// Change Status item Category

const __changeStatus = async (id) => {
  try {
    const __find = await itemCategory.findByPk(id);
    if (!__find) {
      return { success: false, message: `We can't Find Item Category` };
    }
    __find.completed = true;

    await __find.save();
    return { success: true, message: `Item Category Updated` };
  } catch (error) {
    console.log(error);
  }
};

const changeStatus = (req, res) => {
  __changeStatus(req.params.id).then((result) => {
    if (result.success) {
      if(req.session.categoryId){
        res.redirect(`/category/go/${req.session.categoryId}/show`);
      }else{
        res.redirect('/category');
      }
    }
  });
};

/// Go to update Page Items

const __updateItemCategory = async (id) => {
  try {
    const __find = await itemCategory.findByPk(id);
    if (!__find) {
      console.log(chalk.bgRed(`Can't Find Item with id ${id}`));
      return { success: false, message: `Can't Find Item` };
    }
    return { success: true, message: "Get data ....", data: __find };
  } catch (error) {
    console.log(chalk.bgRed(error));
  }
};

const updateItemCategory = (req, res) => {
  if (req.session.user) {
    req.session.itemId = req.params.id;
    __updateItemCategory(req.params.id)
      .then((result) => {
        if (result.success) {
          res.render("todo/itemsUpdate", {
            title: result.data.title,
            description: result.data.description,
            tags: result.data.tags,
          });
        } else {
          console.log(chalk.bgCyan(result.message));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.redirect("/login");
  }
};

/// Done Change Item Categories

const __doneChangeItemCategories = async (id, title, description, tags) => {
  try {
    const __find = await itemCategory.findByPk(id);
    if (!__find) {
      return { success: false, message: `Can't Find Item` };
    }
    __find.title = title;
    __find.description = description;
    __find.tags = tags;
    await __find.save();
    return { success: true, message: "Data Updated" };
  } catch (error) {
    console.log(chalk.bgRed(error));
  }
};

const doneChangeItemCategories = (req, res) => {
  if (req.session.user) {
    __doneChangeItemCategories(
      req.session.itemId,
      req.body.title,
      req.body.description,
      req.body.tags
    )
      .then((result) => {
        if (result.success) {
          if(req.session.categoryId){
            res.redirect(`/category/go/${req.session.categoryId}/show`);
          }else{
            res.redirect('/category')
          }
        } else {
          console.log(chalk.bgRed(result.message));
        }
      })
      .catch((error) => {
        console.log(chalk.bgRed(error));
      });
  } else {
    res.redirect("/login");
  }
};

export default {
  createCategory,
  showCategory,
  deleteCategory,
  updateCategory,
  doneUpdate,
  categoryHome,
  createItem,
  deleteItemCategory,
  changeStatus,
  updateItemCategory,
  doneChangeItemCategories,
};
