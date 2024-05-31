#! /usr/bin/env node
"use strict";

// src/index.ts
var import_commander = require("commander");
var currentDir = process.cwd();
var program = new import_commander.Command();
program.name("next-clean").description("Clean and reset the boilerplate code in a Next.js project").version("1.0.0").helpOption("-h, --help", "Display help for command").addHelpText(
  "after",
  `
  GitHub: https://github.com/amaan8429/next-clean
  
  next-clean is a command-line tool designed to clean and reset the boilerplate code in a Next.js project. It aims to provide a fresh starting point for developers who want to work on a clean Next.js codebase without any unnecessary files or configurations.
  `
);
program.parse(process.argv);
//# sourceMappingURL=index.js.map