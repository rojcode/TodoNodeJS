import express from "express";
import __controllerCategory from "../controllers/category.mjs";

const __routerCategory = express.Router();

__routerCategory.get("/", __controllerCategory.showCategory);

__routerCategory.post("/add", __controllerCategory.createCategory);

__routerCategory.get("/delete/:id", __controllerCategory.deleteCategory);
__routerCategory.get("/update/:id", __controllerCategory.updateCategory);
__routerCategory.post("/update/done", __controllerCategory.doneUpdate);
__routerCategory.get("/go/:id/show", __controllerCategory.categoryHome);
__routerCategory.post("/items/save", __controllerCategory.createItem);
__routerCategory.get(
  "/items/delete/:id",
  __controllerCategory.deleteItemCategory
);


__routerCategory.get('/items/change/status/:id',__controllerCategory.changeStatus);
__routerCategory.get('/items/update/go/:id',__controllerCategory.updateItemCategory);
__routerCategory.post('/items/update/done',__controllerCategory.doneChangeItemCategories);

export default __routerCategory;
