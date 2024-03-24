import express from "express";
import path from "path";

/**
 * Returns middleware to serve static files from a specified directory.
 * @param {string} dirname - The name of the directory containing static files.
 * @returns {function} Middleware function.
 */
export const __static = (dirname) => {
  // Get the current file path and directory path
  const currentFilePath = new URL(import.meta.url).pathname;
  const currentDirname = path.dirname(currentFilePath);
  // Combine current directory path with the specified directory name
  const publicDirPath = path.join(currentDirname, dirname);

  // Return middleware to serve static files from the specified directory
  return express.static(publicDirPath);
};

/**
 * Resolves the absolute path of a file based on the provided filename.
 * @param {string} filename - The name of the file.
 * @returns {string} The absolute path of the file.
 */
export const __getFile = (filename) => {
  // Resolve the file path using the provided filename and current file path
  const filePath = new URL(filename, import.meta.url);
  return path.resolve(filePath.pathname);
};

/**
 * Setup the Pug template engine for the Express app.
 * @param {object} app - The Express application instance.
 * @param {string} dir - The directory name containing Pug templates.
 * @returns {object} - The modified Express application instance.
 */
export const __pug = (app, dir) => {
  // Find the current file path
  const currentFilePath = new URL(import.meta.url).pathname;
  // Convert the URL to the absolute file path
  const currentDirname = path.dirname(currentFilePath);

  // Set the directory containing Pug templates
  app.set("views", path.join(currentDirname, dir));
  // Set the Pug template engine
  app.set("view engine", "pug");

  return app;
};
