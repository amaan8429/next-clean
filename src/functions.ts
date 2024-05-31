//functions.ts
import fs from "fs";
import path from "path";

/**
 * Checks if a file exists at the given file path.
 * @param filePath - The path to the file.
 * @returns A Promise that resolves to a boolean indicating whether the file exists or not.
 */
export async function fileExists(filePath: string): Promise<boolean> {
  return new Promise((resolve) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      resolve(!err);
    });
  });
}

/**
 * Deletes all files within the given folder path.
 * @param folderPath - The path to the folder.
 * @returns A Promise that resolves when all files are deleted, or rejects with an error.
 */
export async function deleteAllFilesInFolder(
  folderPath: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        for (const file of files) {
          fs.unlink(path.join(folderPath, file), (err) => {
            if (err) {
              reject(err);
            }
          });
        }
        resolve();
      }
    });
  });
}

/**
 * Updates the content of a file at the given file path.
 * @param filePath - The path to the file.
 * @param content - The new content to be written to the file.
 * @returns A Promise that resolves when the file is updated, or rejects with an error.
 */
export async function fileUpdation(
  filePath: string,
  content: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Deletes a single file at the given file path.
 * @param filePath - The path to the file.
 * @returns A Promise that resolves when the file is deleted, or rejects with an error.
 */
export async function singleFileDeletion(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
