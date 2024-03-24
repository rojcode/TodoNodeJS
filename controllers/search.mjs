import itemCategory from "../model/itemsCateogry.mjs";
import simpleTodo from "../model/todoSimple.mjs";
import { Op } from "sequelize";
import chalk from "chalk";



const __search = async (UserId, tags) => {
  try {
    const __find = await itemCategory.findAll({
      where: {
        UserId,
        tags: {
          [Op.like]: `%${tags}%`,
        },
      },
    });

    const __findSimple = await simpleTodo.findAll({
      where: {
        UserId,
        tags: {
          [Op.like]: `%${tags}%`,
        },
      },
    });

    return { success: true, category: __find,simples:__findSimple };
  } catch (error) {
    console.log(error);
  }
};

const searchTags = (req, res) => {
  const tag = req.params.tag;
  const user = req.session.userId;
  __search(user, tag)
    .then((result) => {
      console.log(result.category);
      res.render(`search/index`, { category: result.category,simples:result.simples });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default {
  searchTags,
};
