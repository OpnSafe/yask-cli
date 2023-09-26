#!/usr/bin/env node
import yargs from 'yargs';
import path from 'path';
import fs from 'fs';
import parsePath from './parsePath';

const options = yargs
    .command("install <folder>", "create cache folder and file", () => {}, async (argv: any) => {
        const _path = path.join(...parsePath(argv.folder));
        if (!fs.existsSync(_path))
            throw new Error("No existe el path");

        await fs.promises.mkdir(path.join(_path, 'cache/'), { recursive: true })
            .catch((err) => {throw new Error(err)});

        const cacheCode = `import { Cache } from 'yask';\n\nexport default new Cache();
        `

        await fs.promises.writeFile(path.join(_path, 'cache/', 'Cache_Example.ts'), cacheCode, { encoding: 'utf8' })
            .catch((err) => {
                throw new Error(err);
            });
        
        console.log("Proyecto creado!");
    })
    .help()
    .argv;