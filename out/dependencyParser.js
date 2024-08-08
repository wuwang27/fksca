"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePomFile = parsePomFile;
const fs = __importStar(require("fs"));
const xml2js = __importStar(require("xml2js"));
async function parsePomFile(filePath) {
    const pomData = fs.readFileSync(filePath, 'utf-8');
    const parser = new xml2js.Parser({ explicitArray: true, tagNameProcessors: [xml2js.processors.stripPrefix] });
    try {
        const result = await parser.parseStringPromise(pomData);
        console.log('Parsed POM:', result); // 调试信息，查看解析后的对象结构
        const properties = result.project.properties ? result.project.properties[0] : {};
        const dependencies = [];
        // 解析 dependencyManagement 中的依赖项
        if (result.project.dependencyManagement && result.project.dependencyManagement[0].dependencies) {
            const deps = result.project.dependencyManagement[0].dependencies[0].dependency;
            for (const dep of deps) {
                const version = dep.version ? dep.version[0] : 'N/A';
                const resolvedVersion = resolveVersion(version, properties);
                dependencies.push({
                    groupId: dep.groupId ? dep.groupId[0] : 'N/A',
                    artifactId: dep.artifactId ? dep.artifactId[0] : 'N/A',
                    version: resolvedVersion,
                });
            }
        }
        // 解析直接依赖项
        if (result.project.dependencies && result.project.dependencies[0].dependency) {
            const deps = result.project.dependencies[0].dependency;
            for (const dep of deps) {
                const version = dep.version ? dep.version[0] : 'N/A';
                const resolvedVersion = resolveVersion(version, properties);
                dependencies.push({
                    groupId: dep.groupId ? dep.groupId[0] : 'N/A',
                    artifactId: dep.artifactId ? dep.artifactId[0] : 'N/A',
                    version: resolvedVersion,
                });
            }
        }
        return dependencies;
    }
    catch (err) {
        console.error('Error parsing POM file:', err);
        throw err;
    }
}
function resolveVersion(version, properties) {
    if (version.startsWith('${') && version.endsWith('}')) {
        const propName = version.slice(2, -1);
        return properties[propName] ? properties[propName][0] : 'N/A';
    }
    return version;
}
//# sourceMappingURL=dependencyParser.js.map