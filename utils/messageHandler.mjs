import chalk from "chalk";

// Arrow function for displaying notifications using chalk
 const showNotification = (title,message) => {
  console.log(chalk.green.bold(`${title} `) + chalk.green(message));
};

// Arrow function for displaying errors using chalk
const showError = (title,message) => {
  console.error(chalk.red.bold(`${title} `) + chalk.red(message));
};

// Arrow function for displaying warnings using chalk
const showWarning = (title,message) => {
  console.warn(chalk.yellow.bold(`${title} `) + chalk.yellow(message));
};


export default {
    showNotification,
    showError,
    showWarning,
}