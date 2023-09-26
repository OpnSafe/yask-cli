"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _parsePath(path) {
    if (path.includes("\\"))
        path = path.replace("\\", "/");
    if (path.startsWith("/"))
        path = path.slice(1);
    if (path.endsWith("/"))
        path = path.slice(0, path.length - 1);
    if (path.startsWith("./") && !path.startsWith(".."))
        path = path.slice(2);
    return path.split("/");
}
exports.default = _parsePath;
//# sourceMappingURL=parsePath.js.map