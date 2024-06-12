#! /usr/bin/env node

import path from "path";
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

main();
