#! /usr/bin/env node
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
import path3 from "path";

// src/functions.ts
import fs from "fs";
import path from "path";
function fileExists(filePath) {
  return __async(this, null, function* () {
    return new Promise((resolve) => {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        resolve(!err);
      });
    });
  });
}
function deleteAllFilesInFolder(folderPath) {
  return __async(this, null, function* () {
    return new Promise((resolve, reject) => {
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          reject(err);
        } else {
          for (const file of files) {
            fs.unlink(path.join(folderPath, file), (err2) => {
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
      fs.writeFile(filePath, content, (err) => {
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
      fs.unlink(filePath, (err) => {
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
import path2 from "path";

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
    const faviconPath = path2.join(appPath, "favicon.ico");
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
    const layoutPath = path2.join(appPath, "layout.tsx");
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
    const pagePath = path2.join(appPath, "page.tsx");
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
    const globalsPath = path2.join(appPath, "globals.css");
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
    const publicPath = path3.join(currentDir, "public");
    const readmePath = path3.join(currentDir, "README.md");
    yield handlePublicFolder(publicPath);
    yield handleReadmeFile(readmePath);
    const srcPath = path3.join(currentDir, "src");
    if (yield fileExists(srcPath)) {
      const appPath = path3.join(srcPath, "app");
      if (yield fileExists(appPath)) {
        console.log("You are using app directory, smart choice!");
        yield handleFavicon(appPath);
        yield handleLayoutFile(appPath);
        yield handlePageFile(appPath);
        yield handleGlobalsFile(appPath);
      }
    } else if (yield fileExists(currentDir)) {
      const appPath = path3.join(currentDir, "app");
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
//# sourceMappingURL=index.mjs.map