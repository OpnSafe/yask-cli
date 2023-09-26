#!/usr/bin/env node
import yargs from 'yargs';
import path from 'path';
import fs from 'fs';
import parsePath from './parsePath';
import colors from 'colors';
colors.enable();

const options = yargs
    .command("install <folder>", "create cache folder and file", () => {}, async (argv: any) => {
        const _path = path.join(...parsePath(argv.folder));
        if (!fs.existsSync(_path))
            throw new Error("Path not found.");
        if(fs.existsSync(path.join(_path, 'Cache/')))
            throw new Error("The Cache/ directory is already created.");

        await fs.promises.mkdir(path.join(_path, 'Cache/'), { recursive: true })
            .catch((err) => {throw new Error(err)});

        const cacheCode = `import { Cache } from 'yask';\n\nexport default new Cache();`

        await fs.promises.writeFile(path.join(_path, 'cache/', 'Cache_Example.ts'), cacheCode, { encoding: 'utf8' })
            .catch((err) => {
                throw new Error(err);
            });
            
        console.log(colors.green("Folder and file created, enjoy yask.\n https://github.com/OpnSafe/yask"));
    })
    .help()
    .argv;