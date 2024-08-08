"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependencyParser_1 = require("./dependencyParser");
const vulnerabilityScanner_1 = require("./vulnerabilityScanner");
async function test() {
    const dependencies = await (0, dependencyParser_1.parsePomFile)('C:\\D盘备份文件\\D盘备份文件\\决策引擎\\decision-engine-release-1.0.0\\decision-engine-release-1.0.0\\de-depend\\pom.xml');
    console.log('Dependencies:', dependencies);
    const vulnerabilities = await (0, vulnerabilityScanner_1.checkVulnerabilities)(dependencies);
    console.log('Vulnerabilities:', vulnerabilities);
}
test().catch(console.error);
//# sourceMappingURL=testParser.js.map