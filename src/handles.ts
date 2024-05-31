//handles.ts
import path from "path";
import { pageFileContent } from "./samples/page";
import { layoutFileContent } from "./samples/layout";
import { globalscssFileContent } from "./samples/globalscss";
import {
  fileExists,
  deleteAllFilesInFolder,
  fileUpdation,
  singleFileDeletion,
} from "./functions";

/**
 * Handles the public folder by deleting all files within it if it exists.
 * @param publicPath - The path to the public folder.
 */
export async function handlePublicFolder(publicPath: string) {
  if (await fileExists(publicPath)) {
    try {
      await deleteAllFilesInFolder(publicPath);
      console.log("public folder cleaned successfully");
    } catch (err) {
      console.error(`Error cleaning public folder: ${err}`);
    }
  } else {
    console.log("public folder does not exist , please check again");
  }
}

/**
 * Handles the README.md file by emptying its content if it exists.
 * @param readmePath - The path to the README.md file.
 */
export async function handleReadmeFile(readmePath: string) {
  if (await fileExists(readmePath)) {
    try {
      await fileUpdation(readmePath, "");
      console.log("README.md updated successfully");
    } catch (err) {
      console.error(`Error updating README.md: ${err}`);
    }
  } else {
    console.log("README.md does not exist, please check again");
  }
}

/**
 * Handles the favicon.ico file by deleting it if it exists.
 * @param appPath - The path to the app folder.
 */
export async function handleFavicon(appPath: string) {
  const faviconPath: string = path.join(appPath, "favicon.ico");
  const faviconExists: boolean = await fileExists(faviconPath);
  if (faviconExists) {
    try {
      await singleFileDeletion(faviconPath);
      console.log("favicon.ico deleted successfully");
    } catch (err) {
      console.error(`Error deleting favicon.ico: ${err}`);
    }
  } else {
    console.log("favicon.ico does not exist");
  }
}

/**
 * Handles the layout.tsx file by updating its content with the provided content.
 * @param appPath - The path to the app folder.
 */
export async function handleLayoutFile(appPath: string) {
  const layoutPath: string = path.join(appPath, "layout.tsx");
  if (await fileExists(layoutPath)) {
    try {
      await fileUpdation(layoutPath, layoutFileContent);
      console.log("layout.tsx file updated successfully");
    } catch (err) {
      console.error(`Error updating layout file: ${err}`);
    }
  } else {
    console.log("layout.tsx file does not exist");
  }
}

/**
 * Handles the page.tsx file by updating its content with the provided content.
 * @param appPath - The path to the app folder.
 */
export async function handlePageFile(appPath: string) {
  const pagePath: string = path.join(appPath, "page.tsx");
  if (await fileExists(pagePath)) {
    try {
      await fileUpdation(pagePath, pageFileContent);
      console.log("page.tsx file updated successfully");
    } catch (err) {
      console.error(`Error updating page.tsx file: ${err}`);
    }
  } else {
    console.log("page.tsx does not exist in app folder");
  }
}

/**
 * Handles the globals.css file by updating its content with the provided content.
 * @param appPath - The path to the app folder.
 */
export async function handleGlobalsFile(appPath: string) {
  const globalsPath: string = path.join(appPath, "globals.css");
  if (await fileExists(globalsPath)) {
    try {
      await fileUpdation(globalsPath, globalscssFileContent);
      console.log("globals.css file updated successfully");
    } catch (err) {
      console.error(`Error updating globals.css file: ${err}`);
    }
  } else {
    console.log("globals.css does not exist");
  }
}
