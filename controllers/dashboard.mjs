import multer from "multer";
import userSetting from "../model/userSettings.mjs";
import chalk from "chalk";
import path from "path";

const __userUpdate = async (UserId, phone, telegramId, avatar) => {
  try {
    const __create = await userSetting.create({
      phone: phone,
      telegramId,
      profileImage: avatar ? avatar.path : 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
      UserId,
    });
    if (!__create) {
      return { success: false, message: `We can't Create Settings` };
    }
    return { success: true, message: `Added Sucessfully` };
  } catch (error) {
    console.log(chalk.bgRed(error));
  }
};

const userUpdate = async (req, res) => {
  const phone = req.body.phone;
  const telegram = req.body.telegram;
  const UserId = req.session.userId;
  const avatar = req.file;

  if (req.session.userId) {
    __userUpdate(UserId, phone, telegram, avatar)
      .then((result) => {
        if (result.success) {
          res.redirect("/dashboard");
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

/// Get User Settings

const __checkUser = async (UserId) => {
  try {
    const __find = await userSetting.findOne({
      where: {
        UserId,
      },
    });
    if (!__find) {
      return {
        status: "create",
        message: "User Setting Dont find,create a new user settings",
      };
    }
    return {
      status: "update",
      message: "User Settings Find We Should Updated user settings",
      user: __find,
    };
  } catch (error) {
    console.log(chalk.bgRed(error));
  }
};

const checkUser = (req, res) => {
  const UserId = req.session.userId;
  if (req.session.user) {
    __checkUser(UserId)
      .then((result) => {
        if (result.status == "create") {
          res.render("dashboard/user", { status: "create" });
        }
        res.render("dashboard/user", {
          status: "update",
          user: result.user,
        });
      })
      .catch((error) => {
        console.log(chalk.bgRed(error));
      });
  }
};

/// update Settings

const __changeSetting = async (UserId, phone, telegramId, profileImage) => {
  try {
    const __find = await userSetting.findOne({
      where: {
        UserId,
      },
    });
    if (!__find) {
      return { success: false, message: `We can't Find The User` };
    }
    __find.phone = phone;
    __find.telegramId = telegramId;
    __find.profileImage = profileImage
      ? profileImage.path
      : 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg';
    await __find.save();
    return { success: true, message: `Updated SucessFully` };
  } catch (error) {
    console.log(chalk.bgRed(error));
  }
};


const changeSettings = async (req, res) => {
  // Add Login Check
  if (req.session.user) {
    const phone = req.body.phone;
    const telegram = req.body.telegram;
    const UserId = req.session.userId;
    let avatar = req.file;
    


    __changeSetting(UserId, phone, telegram, avatar)
      .then((result) => {
        if (result.success) {
          res.redirect("/dashboard");
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
  userUpdate,
  checkUser,
  changeSettings,
};
