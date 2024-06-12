#! /usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var import_path3 = __toESM(require("path"));

// src/functions.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
function fileExists(filePath) {
  return __async(this, null, function* () {
    return new Promise((resolve) => {
      import_fs.default.access(filePath, import_fs.default.constants.F_OK, (err) => {
        resolve(!err);
      });
    });
  });
}
function deleteAllFilesInFolder(folderPath) {
  return __async(this, null, function* () {
    return new Promise((resolve, reject) => {
      import_fs.default.readdir(folderPath, (err, files) => {
        if (err) {
          reject(err);
        } else {
          for (const file of files) {
            import_fs.default.unlink(import_path.default.join(folderPath, file), (err2) => {
              if (err2) {
                reject(err2);
              }
            });
          }
          resolve();
        }
      });
    });
  });
}
function fileUpdation(filePath, content) {
  return __async(this, null, function* () {
    return new Promise((resolve, reject) => {
      import_fs.default.writeFile(filePath, content, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}
function singleFileDeletion(filePath) {
  return __async(this, null, function* () {
    return new Promise((resolve, reject) => {
      import_fs.default.unlink(filePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

// src/handles.ts
var import_path2 = __toESM(require("path"));

// src/samples/page.ts
var pageFileContent = `import React from "react";

const page = () => {
  return <div>hello world</div>;
};

export default page;`;

// src/samples/layout.ts
var layoutFileContent = `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
`;

// src/samples/globalscss.ts
var globalscssFileContent = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

// src/handles.ts
function handlePublicFolder(publicPath) {
  return __async(this, null, function* () {
    if (yield fileExists(publicPath)) {
      try {
        yield deleteAllFilesInFolder(publicPath);
        console.log("public folder cleaned successfully");
      } catch (err) {
        console.error(`Error cleaning public folder: ${err}`);
      }
    } else {
      console.log("public folder does not exist , please check again");
    }
  });
}
function handleReadmeFile(readmePath) {
  return __async(this, null, function* () {
    if (yield fileExists(readmePath)) {
      try {
        yield fileUpdation(readmePath, "");
        console.log("README.md updated successfully");
      } catch (err) {
        console.error(`Error updating README.md: ${err}`);
      }
    } else {
      console.log("README.md does not exist, please check again");
    }
  });
}
function handleFavicon(appPath) {
  return __async(this, null, function* () {
    const faviconPath = import_path2.default.join(appPath, "favicon.ico");
    const faviconExists = yield fileExists(faviconPath);
    if (faviconExists) {
      try {
        yield singleFileDeletion(faviconPath);
        console.log("favicon.ico deleted successfully");
      } catch (err) {
        console.error(`Error deleting favicon.ico: ${err}`);
      }
    } else {
      console.log("favicon.ico does not exist");
    }
  });
}
function handleLayoutFile(appPath) {
  return __async(this, null, function* () {
    const layoutPath = import_path2.default.join(appPath, "layout.tsx");
    if (yield fileExists(layoutPath)) {
      try {
        yield fileUpdation(layoutPath, layoutFileContent);
        console.log("layout.tsx file updated successfully");
      } catch (err) {
        console.error(`Error updating layout file: ${err}`);
      }
    } else {
      console.log("layout.tsx file does not exist");
    }
  });
}
function handlePageFile(appPath) {
  return __async(this, null, function* () {
    const pagePath = import_path2.default.join(appPath, "page.tsx");
    if (yield fileExists(pagePath)) {
      try {
        yield fileUpdation(pagePath, pageFileContent);
        console.log("page.tsx file updated successfully");
      } catch (err) {
        console.error(`Error updating page.tsx file: ${err}`);
      }
    } else {
      console.log("page.tsx does not exist in app folder");
    }
  });
}
function handleGlobalsFile(appPath) {
  return __async(this, null, function* () {
    const globalsPath = import_path2.default.join(appPath, "globals.css");
    if (yield fileExists(globalsPath)) {
      try {
        yield fileUpdation(globalsPath, globalscssFileContent);
        console.log("globals.css file updated successfully");
      } catch (err) {
        console.error(`Error updating globals.css file: ${err}`);
      }
    } else {
      console.log("globals.css does not exist");
    }
  });
}

// src/index.ts
var currentDir = process.cwd();
function main() {
  return __async(this, null, function* () {
    const publicPath = import_path3.default.join(currentDir, "public");
    const readmePath = import_path3.default.join(currentDir, "README.md");
    yield handlePublicFolder(publicPath);
    yield handleReadmeFile(readmePath);
    const srcPath = import_path3.default.join(currentDir, "src");
    if (yield fileExists(srcPath)) {
      const appPath = import_path3.default.join(srcPath, "app");
      if (yield fileExists(appPath)) {
        console.log("You are using app directory, smart choice!");
        yield handleFavicon(appPath);
        yield handleLayoutFile(appPath);
        yield handlePageFile(appPath);
        yield handleGlobalsFile(appPath);
      }
    } else if (yield fileExists(currentDir)) {
      const appPath = import_path3.default.join(currentDir, "app");
      if (yield fileExists(appPath)) {
        console.log("You are using app directory, smart choice!");
        yield handleFavicon(appPath);
        yield handleLayoutFile(appPath);
        yield handlePageFile(appPath);
      } else {
        console.log("app folder does not exist , please check again");
      }
    } else {
      console.log(
        "no src folder found. Please run the command in the root of your next.js project."
      );
    }
  });
}
main();
//# sourceMappingURL=index.js.map