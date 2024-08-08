import { parsePomFile } from './dependencyParser';
import { checkVulnerabilities } from './vulnerabilityScanner';

async function test() {
    const dependencies = await parsePomFile('C:\\D盘备份文件\\D盘备份文件\\决策引擎\\decision-engine-release-1.0.0\\decision-engine-release-1.0.0\\de-depend\\pom.xml');
    console.log('Dependencies:', dependencies);
  
    const vulnerabilities = await checkVulnerabilities(dependencies);
    console.log('Vulnerabilities:', vulnerabilities);
  }
  
  test().catch(console.error);


