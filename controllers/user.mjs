import chalk from "chalk";
import User from "../model/user.mjs";
import bcrypt from "bcrypt";

const slatRounds = 10;
const __create = async (username, firstName, lastName, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, slatRounds);
    const newUser = await User.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    console.log(chalk.green(`USER=> ${username} CREATED`), newUser);
    return { success: true, message: "کاربر با موفقیت ایجاد شد." };
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return {
        success: false,
        message: "نام کاربری یا ایمیل قبلاً استفاده شده است.",
      };
    } else {
      return {
        success: false,
        message: "مشکلی در ایجاد کاربر بوجود آمده است.",
      };
    }
  }
};

const createUser = async (req, res) => {
  const __http = req.body;
  const __new = await __create(
    __http.username,
    __http.firstName,
    __http.lastName,
    __http.email,
    __http.password
  );

  if (__new.success) {
    // res.redirect('/login');
    res.render("login", {
      message: "خوش آمدید👋! با نام کاربری و رمز خود وارد شوید ",
    });
  } else {
    res.render("signup", { error: __new.message });
  }
};

const __auth = async (username, password) => {
  try {
    const __find = await User.findOne({
      where: { username },
    });

    if (!__find) {
      return { success: false, message: "کاربری پیدا نشد" };
    }

    const matchPassword = await bcrypt.compare(password, __find.password);
    if (!matchPassword) {
      return { success: false, message: "رمز عبور اشتباه است " };
    }

    return { success: true, user: __find };
  } catch (error) {
    console.log("Auth=>Failed");
    console.log(__find);
    return { success: false, message: "مشکل در ورود کاربر" };
  }
};

const loginUser = (req, res) => {
  const __http = req.body;
  __auth(__http.username, __http.password)
    .then((result) => {
      if (result.success) {
        req.session.user = result.user.username;
        req.session.name = result.user.firstName;
        req.session.userId = result.user.id;
        res.redirect("/");
      } else {
        res.render("login", { error: result.message });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};





export default {
  createUser,
  loginUser,
};
