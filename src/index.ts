#! /usr/bin/env node

import path from "path";
import { Command } from "commander";
import { fileExists } from "./functions";
import {
  handlePublicFolder,
  handleReadmeFile,
  handleFavicon,
  handleLayoutFile,
  handlePageFile,
  handleGlobalsFile,
} from "./handles";

const currentDir: string = process.cwd();

const program = new Command();

program
  .name("next-clean")
  .description("Clean and reset the boilerplate code in a Next.js project")
  .version("1.0.0")
  .helpOption("-h, --help", "Display help for command")
  .addHelpText(
    "after",
    `
  GitHub: https://github.com/amaan8429/next-clean
  
  next-clean is a command-line tool designed to clean and reset the boilerplate code in a Next.js project. It aims to provide a fresh starting point for developers who want to work on a clean Next.js codebase without any unnecessary files or configurations.
  `
  );

program.parse(process.argv);

async function main() {
  const publicPath: string = path.join(currentDir, "public");
  const readmePath: string = path.join(currentDir, "README.md");

  await handlePublicFolder(publicPath);
  await handleReadmeFile(readmePath);

  const srcPath: string = path.join(currentDir, "src");
  if (await fileExists(srcPath)) {
    const appPath: string = path.join(srcPath, "app");
    if (await fileExists(appPath)) {
      console.log("You are using app directory, smart choice!");
      await handleFavicon(appPath);
      await handleLayoutFile(appPath);
      await handlePageFile(appPath);
      await handleGlobalsFile(appPath);
    }
  } else if (await fileExists(currentDir)) {
    const appPath: string = path.join(currentDir, "app");
    if (await fileExists(appPath)) {
      console.log("You are using app directory, smart choice!");
      await handleFavicon(appPath);
      await handleLayoutFile(appPath);
      await handlePageFile(appPath);
    } else {
      console.log("app folder does not exist , please check again");
    }
  } else {
    console.log(
      "no src folder found. Please run the command in the root of your next.js project."
    );
  }
}
