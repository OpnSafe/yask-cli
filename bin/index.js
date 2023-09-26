#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const parsePath_1 = __importDefault(require("./parsePath"));
const options = yargs_1.default
    .command("install <folder>", "create cache folder and file", () => { }, async (argv) => {
    const _path = path_1.default.join(...(0, parsePath_1.default)(argv.folder));
    if (!fs_1.default.existsSync(_path))
        throw new Error("No existe el path");
    await fs_1.default.promises.mkdir(path_1.default.join(_path, 'cache/'), { recursive: true })
        .catch((err) => { throw new Error(err); });
    const cacheCode = `import { Cache } from 'yask';\n\nexport default new Cache();
        `;
    await fs_1.default.promises.writeFile(path_1.default.join(_path, 'cache/', 'Cache_Example.ts'), cacheCode, { encoding: 'utf8' })
        .catch((err) => {
        throw new Error(err);
    });
    console.log("Proyecto creado!");
})
    .help()
    .argv;
//# sourceMappingURL=index.js.map